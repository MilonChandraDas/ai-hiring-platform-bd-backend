import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCodingTestDto } from './dto/create-coding-test.dto';

@Injectable()
export class CodingTestsService {
    constructor(private prisma: PrismaService) { }

    async createCodingTest(dto: CreateCodingTestDto, candidateId: string) {
        return this.prisma.codingTest.create({
            data: {
                candidateId: candidateId,
                jobId: dto.jobId,
                title: dto.title,
                mcqQuestion: dto.mcqQuestion,
                problemQuestion: dto.problemQuestion,
                language: dto.language,
                code: dto.code,
                timeTaken: dto.timeTaken,
                timeLimit: dto.timeLimit
            }
        })
    }

    async getMyCodingTests(candidateId: string) {
        return this.prisma.codingTest.findMany({
            where: { candidateId: candidateId }
        })
    }
}
