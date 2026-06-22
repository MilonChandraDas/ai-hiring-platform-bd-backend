import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
    constructor(private prisma: PrismaService) { }


    async createJob(dto: CreateJobDto, recruiterId: string) {
        return this.prisma.job.create({
            data: {
                title: dto.title,
                description: dto.description,
                role: dto.role,
                salary: dto.salary,
                location: dto.location,
                banner: dto.banner,
                jobType: dto.jobType as any,
                experience: dto.experience as any,
                deadline: dto.deadline ? new Date(dto.deadline) : null,
                companyId: dto.companyId,
                recruiterId: recruiterId
            }
        })
    }

    async getAllJobs() {
        return this.prisma.job.findMany({
            include: {
                company: true,
                recruiter: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    }
                }
            }
        })
    }


    async getJobById(id: string) {
        return this.prisma.job.findUnique({
            where: { id },
            include: {
                company: true,
                recruiter: {
                    select: { id: true, username: true, email: true }
                }
            }
        })
    }
}
