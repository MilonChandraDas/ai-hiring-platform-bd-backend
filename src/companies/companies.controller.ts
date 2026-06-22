import { Post, Get, Req, Body, Controller, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) { }

    @UseGuards(JwtGuard)
    @Post()
    createCompany(@Body() dto: CreateCompanyDto, @Req() req: any) {
        return this.companiesService.createCompany(dto, req.user.id)
    }


    @Get()
    getAllCompanies() {
        return this.companiesService.getAllCompanies()
    }

    @Get('my-company')
    @UseGuards(JwtGuard)
    getMyCompany(@Req() req: any) {
        return this.companiesService.getMyCompany(req.user.id);
    }
}
