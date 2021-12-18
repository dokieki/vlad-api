import {
    Controller,
    Param,
    Get,
    Post,
    Put,
    Body,
    Query,
    NotFoundException
} from '@nestjs/common';

import { UsersService } from './users.service';
import { Roles, User } from '../../common';
import { UserDto } from '../../dto';
import { UserEntity } from '../../entities';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:id')
    @Roles('admin')
    get(@Param('id') id: string): Promise<UserEntity> {
        return this.usersService.get(id);
    }

    @Post('/')
    @Roles('admin')
    async create(@Body() user: UserDto): Promise<any> {
        if (await this.usersService.get(user.id)) throw new NotFoundException();

        return this.usersService.create(user);
    }

    @Put('/:id')
    @Roles('admin')
    async update(@Param('id') id: string, @Body() user: UserDto): Promise<UserEntity> {
        if (!await this.usersService.findOne(id)) throw new NotFoundException();

        return this.usersService.save(user);
    }

    @Get('/me')
    @Roles('user')
    me(@User() user): Promise<object> {
        return this.usersService.get(user.id);
    }

    @Get('/me/servers')
    @Roles('user')
    meServers(@User() user): Promise<object> {
        return this.usersService.getServers(user.id);
    }

    @Get('/me/key')
    async meKey(@Query('token') token: string): Promise<any> {
        const discordUser = await this.usersService.getDiscordUser(token);

        if (!discordUser) throw new NotFoundException();

        const user = await this.usersService.findOne(discordUser.data.id); 
        
        return user?.key;
    }
}
