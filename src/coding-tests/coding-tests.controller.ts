import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CodingTestsService } from './coding-tests.service';
import { JwtGuard } from '../auth/jwt.guard';
import {
  CreateCodingTestDto,
  SubmitMCQDto,
  SubmitCodeDto,
} from './dto/create-coding-test.dto';

@Controller('coding-tests')
export class CodingTestsController {
  constructor(private codingTestsService: CodingTestsService) {}

  // Test শুরু করো (MCQ generate হবে)
  @UseGuards(JwtGuard)
  @Post('start')
  createCodingTest(@Body() dto: CreateCodingTestDto, @Req() req: any) {
    return this.codingTestsService.createCodingTest(dto, req.user.id);
  }

  // MCQ submit করো (Coding problems generate হবে)
  @UseGuards(JwtGuard)
  @Post('submit-mcq')
  submitMCQ(@Body() dto: SubmitMCQDto, @Req() req: any) {
    return this.codingTestsService.submitMCQ(dto, req.user.id);
  }

  // Code submit করো (Final result আসবে)
  @UseGuards(JwtGuard)
  @Post('submit-code')
  submitCode(@Body() dto: SubmitCodeDto, @Req() req: any) {
    return this.codingTestsService.submitCode(dto, req.user.id);
  }

  // আমার সব tests
  @UseGuards(JwtGuard)
  @Get('me')
  getMyCodingTests(@Req() req: any) {
    return this.codingTestsService.getMyCodingTests(req.user.id);
  }

  // Single test details
  @UseGuards(JwtGuard)
  @Get(':id')
  getTestById(@Param('id') id: string, @Req() req: any) {
    return this.codingTestsService.getTestById(id, req.user.id);
  }

  // Recruiter — job এর সব tests
  @UseGuards(JwtGuard)
  @Get('job/:jobId')
  getJobCodingTests(@Param('jobId') jobId: string) {
    return this.codingTestsService.getJobCodingTests(jobId);
  }
}
