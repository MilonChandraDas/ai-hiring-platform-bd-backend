import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getMe(userId: string) {
        return this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async updateMe(userId: string, dto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                username: dto.username,
                profileImage: dto.profileImage
            }
        })
    }
}
