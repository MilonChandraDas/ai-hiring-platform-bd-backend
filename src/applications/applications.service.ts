import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prismaService: PrismaService) {}

  async createApplication(dto: CreateApplicationDto, userId: string) {
    const existingApplication = await this.prismaService.application.findFirst({
      where: {
        userId: userId,
        jobId: dto.jobId,
      },
    });
    if (existingApplication) {
      throw new BadRequestException('You have already applied for this job.');
    }

    return this.prismaService.application.create({
      data: {
        userId: userId,
        jobId: dto.jobId,
        resumeId: dto.resumeId,
        coverLetter: dto.coverLetter,
      },
    });
  }

  async getMyApplication(userId: string) {
    return this.prismaService.application.findMany({
      where: { userId: userId },
      include: {
        job: {
          select: {
            title: true,
            location: true,
            jobType: true,
            company: {
              select: { name: true },
            },
          },
        },
      },
    });
  }

  async getApplicationsForRecruiter(recruiterId: string) {
    return this.prismaService.application.findMany({
      where: {
        job: {
          recruiterId: recruiterId,
        },
      },

      include: {
        user: {
          select: { id: true, username: true, email: true },
        },
        job: {
          select: { title: true, company: { select: { name: true } } },
        },
        resume: true,
      },
    });
  }
}
