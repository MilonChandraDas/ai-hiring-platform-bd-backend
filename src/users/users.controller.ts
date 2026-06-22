import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: any) {
        return this.usersService.getMe(req.user.id)
    }

    @UseGuards(JwtGuard)
    @Patch('me')
    updateMe(@Body() dto: UpdateUserDto, @Req() req: any) {
        return this.usersService.updateMe(req.user.id, dto)
    }
}
