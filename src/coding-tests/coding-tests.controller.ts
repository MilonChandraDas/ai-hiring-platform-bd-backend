import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CodingTestsService } from './coding-tests.service';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateCodingTestDto } from './dto/create-coding-test.dto';

@Controller('coding-tests')
export class CodingTestsController {
    constructor(private codingTestsService: CodingTestsService) { }

    @UseGuards(JwtGuard)
    @Post()
    createCodingTest(@Body() dto: CreateCodingTestDto, @Req() req: any) {
        return this.codingTestsService.createCodingTest(dto, req.user.id)
    }


    @UseGuards(JwtGuard)
    @Get('me')
    getMyCodingTests(@Req() req: any) {
        return this.codingTestsService.getMyCodingTests(req.user.id)
    }
}
