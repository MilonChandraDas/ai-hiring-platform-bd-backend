import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CodingTestStatus, TestResult } from '@prisma/client';
import {
  CreateCodingTestDto,
  SubmitMCQDto,
  SubmitCodeDto,
} from './dto/create-coding-test.dto';

@Injectable()
export class CodingTestsService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async createCodingTest(dto: CreateCodingTestDto, candidateId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
    });
    if (!job) throw new NotFoundException('Job not found');

    const mcqData = await this.aiService.generateMCQ(
      job.title,
      job.description,
    );

    return this.prisma.codingTest.create({
      data: {
        candidateId,
        jobId: dto.jobId,
        title: dto.title || `${job.title} - Coding Test`,
        language: dto.language || 'javascript',
        timeLimit: dto.timeLimit || 60,
        mcqQuestions: mcqData.questions, // ✅ fixed
        status: CodingTestStatus.PENDING, // ✅ fixed
      },
    });
  }

  async submitMCQ(dto: SubmitMCQDto, candidateId: string) {
    const test = await this.prisma.codingTest.findFirst({
      where: { id: dto.testId, candidateId },
      include: { job: true },
    });
    if (!test) throw new NotFoundException('Test not found');

    const mcqResult = await this.aiService.evaluateMCQ(
      test.mcqQuestions as any[], // ✅ fixed
      dto.mcqAnswers,
    );

    const codingData = await this.aiService.generateCodingProblems(
      test.job.title,
      test.job.description,
    );

    return this.prisma.codingTest.update({
      where: { id: dto.testId },
      data: {
        mcqSubmission: dto.mcqAnswers,
        mcqScore: mcqResult.score,
        codingProblems: codingData.problems,
      },
    });
  }

  async submitCode(dto: SubmitCodeDto, candidateId: string) {
    const test = await this.prisma.codingTest.findFirst({
      where: { id: dto.testId, candidateId },
    });
    if (!test) throw new NotFoundException('Test not found');

    const codeResult = await this.aiService.evaluateCode(
      test.codingProblems as any[],
      dto.codeSubmissions,
    );

    const mcqScore = test.mcqScore || 0;
    const codeScore = codeResult.totalScore || 0;
    const totalScore = mcqScore + codeScore;

    const result = totalScore >= 20 ? TestResult.PASS : TestResult.FAIL; // ✅ fixed

    return this.prisma.codingTest.update({
      where: { id: dto.testId },
      data: {
        codeSubmissions: dto.codeSubmissions,
        codeResult: codeResult.results,
        totalScore,
        aiFeedback: codeResult.overallFeedback,
        timeTaken: dto.timeTaken,
        result,
        status: CodingTestStatus.COMPLETED, // ✅ fixed
      },
    });
  }

  async getTestById(testId: string, candidateId: string) {
    const test = await this.prisma.codingTest.findFirst({
      where: { id: testId, candidateId },
      include: { job: true },
    });
    if (!test) throw new NotFoundException('Test not found');
    return test;
  }

  async getMyCodingTests(candidateId: string) {
    return this.prisma.codingTest.findMany({
      where: { candidateId },
      include: { job: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getJobCodingTests(jobId: string) {
    return this.prisma.codingTest.findMany({
      where: { jobId },
      include: { candidate: { select: { username: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
