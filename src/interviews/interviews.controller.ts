import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Controller('interviews')
export class InterviewsController {
    constructor(private interviewsService: InterviewsService) {}

    @UseGuards(JwtGuard)
    @Post()
    createInterview(@Body() dto: CreateInterviewDto, @Req() req:any) {
        return this.interviewsService.createInterview(dto, req.user.id)
    }


    @UseGuards(JwtGuard)
    @Get('me')
    getMyInterviews(@Req() req: any) {
        return this.interviewsService.getMyInterviews(req.user.id)
    }
}
