import { Module } from '@nestjs/common';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';


@Module({
  imports: [PrismaModule, AiModule, CloudinaryModule],
  controllers: [ResumesController],
  providers: [ResumesService]
})
export class ResumesModule {}
