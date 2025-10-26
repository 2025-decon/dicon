import { Controller, Get, NotFoundException, Post, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../user/user.entity';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('my')
    async getMyProfile() {
        // 실제 애플리케이션에서는 인증된 사용자 정보를 사용해야 합니다.
        const username = 'testuser'; 
        const user = await this.profileService.findOneByName(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    // 테스트용 임시 엔드포인트
    @Post('user')
    async createUser(@Body() user: Partial<User>) {
        return this.profileService.createUser(user);
    }
}
