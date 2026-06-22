import { Module } from '@nestjs/common';
import { CodingTestsController } from './coding-tests.controller';
import { CodingTestsService } from './coding-tests.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CodingTestsController],
  providers: [CodingTestsService]
})
export class CodingTestsModule {}
