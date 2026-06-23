import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Injectable()
export class InterviewsService {
  constructor(private prisma: PrismaService) {}

  async createInterview(dto: CreateInterviewDto, recruiterId: string) {
    return this.prisma.interview.create({
      data: {
        recruiterId: recruiterId,
        applicationId: dto.applicationId,
        candidateId: dto.candidateId,
        scheduledAt: dto.scheduledAt,
        duration: dto.duration,
        meetingLink: dto.meetingLink,
        notes: dto.notes,
      },
    });
  }

  async getMyInterviews(userId: string) {
    return this.prisma.interview.findMany({
      where: { candidateId: userId },
      include: {
        recruiter: {
          select: { username: true, email: true },
        },
        application: {
          include: {
            job: {
              select: {
                title: true,
                company: { select: { name: true } },
              },
            },
          },
        },
      },
    });
  }
}
