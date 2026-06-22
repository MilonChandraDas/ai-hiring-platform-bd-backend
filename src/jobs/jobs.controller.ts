import {Post,Get,Req, Body, Controller, UseGuards, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtGuard } from '../auth/jwt.guard';



@Controller('jobs')
export class JobsController {
    constructor(private jobService: JobsService) {}
    @UseGuards(JwtGuard)
    @Post()
    createJob(@Body() dto:CreateJobDto, @Req() req:any) {
        return this.jobService.createJob(dto, req.user.id)
    }

    @Get()
    getAllJobs() {
        return this.jobService.getAllJobs()
    }

    @Get(':id')
    getJobById(@Param('id') id: string) {
        return this.jobService.getJobById(id)
    }
}
