import {
    Controller,
    Get,
    Put,
    Param,
    Body,
    NotFoundException,
} from '@nestjs/common';

import { ProfileService } from './profile.service';
import { ProfileEntity } from '../../entities';
import { Roles, User } from '../../common';
import { ProfileDto } from '../../dto';
import { UsersService } from '../users/users.service';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly usersService: UsersService
    ) {}

    @Get('/:id')
    @Roles('user')
    async get(@Param('id') id: string): Promise<any> {
        const user = await this.usersService.get(id);
        return {
            experience: this.usersService.getExp(user.level),
            experienceNext: this.usersService.getExp(user.level + 1),
            ...await this.profileService.get(id)
        };
    }

    @Put('/:id')
    @Roles('user')
    async update(@User() user, @Param('id') id: string, @Body() profileData: ProfileDto): Promise<ProfileEntity> {
        const profile = await this.profileService.get(id);

        if (!profile || profile.id !== user.id) throw new NotFoundException();

        return this.profileService.save(profileData);
    }
}