import { Module } from '@nestjs/common';
import { CodingTestsService } from './coding-tests.service';
import { CodingTestsController } from './coding-tests.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [CodingTestsController],
  providers: [CodingTestsService],
})
export class CodingTestsModule {}
