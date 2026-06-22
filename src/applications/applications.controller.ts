import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
export class ApplicationsController {
    constructor(private applicationsService: ApplicationsService) { }

    @UseGuards(JwtGuard)
    @Post()
    createApplication(@Body() dto: CreateApplicationDto, @Req() req: any) {
        return this.applicationsService.createApplication(dto, req.user.id)
    }


    @UseGuards(JwtGuard)
    @Get('me')
    getMyApplications(@Req() req: any) {
        return this.applicationsService.getMyApplication(req.user.id)
    }
}
