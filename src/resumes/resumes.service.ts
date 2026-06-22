import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ResumesService {
    constructor(
        private prisma: PrismaService,
        private aiService: AiService,
        private cloudinary: CloudinaryService
    ) { }

    async createResume(dto: CreateResumeDto, userId: string, file?: Express.Multer.File) {
        let resumeUrl = null

        if (file) {
            resumeUrl = await this.cloudinary.uploadFile(file)
        }
        const resume = await this.prisma.resume.create({
            data: {
                userId: userId,
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                about: dto.about,
                education: dto.education,
                experience: dto.experience,
                expectedSalary: dto.expectedSalary,
                skill: typeof dto.skill === 'string'
                    ? dto.skill.split(',').map(s => s.trim())
                    : dto.skill,
                resumeUrl: resumeUrl
            }
        })

        try {
            const aiResult = await this.aiService.analyzeResume(resume)

            return this.prisma.resume.update({
                where: { id: resume.id },
                data: {
                    atsScore: aiResult.atsScore,
                    aiReview: aiResult.review
                }
            })
        }
        catch (error) {
            console.log('AI analysis failed:', error.message)
            return resume
        }
    }

    async getMyResume(userId: string) {
        return this.prisma.resume.findMany({
            where: {
                userId: userId
            }
        })
    }
}
