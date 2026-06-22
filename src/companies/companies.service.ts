import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async createCompany(dto: CreateCompanyDto, recruiterId: string) {
    const existingCompany = await this.prisma.company.findFirst({
      where: {
        recruiterId: recruiterId,
      },
    });

    if (existingCompany) {
      throw new BadRequestException(
        'Company already exists for this recruiter',
      );
    }

    return this.prisma.company.create({
      data: {
        name: dto.name,
        email: dto.email,
        website: dto.website,
        location: dto.location,
        type: dto.type as any,
        phone: dto.phone,
        description: dto.description,
        logo: dto.logo,
        recruiterId: recruiterId,
      },
    });
  }

  async getAllCompanies() {
    return this.prisma.company.findMany();
  }

  async getMyCompany(userId: string) {
    return this.prisma.company.findFirst({
      where: {
        recruiterId: userId,
      },
    });
  }
}
