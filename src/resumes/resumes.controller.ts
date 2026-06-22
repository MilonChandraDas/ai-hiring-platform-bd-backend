import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('resumes')
export class ResumesController {
    constructor(private resumesService: ResumesService) { }
    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createResume(
        @Body() dto: CreateResumeDto,
        @Req() req: any,
        @UploadedFile() file: Express.Multer.File,
        ) {
        return this.resumesService.createResume(dto, req.user.id, file)
    }


    @UseGuards(JwtGuard)
    @Get('me')
    getMyResume(@Req() req: any) {
        return this.resumesService.getMyResume(req.user.id)
    }
}
