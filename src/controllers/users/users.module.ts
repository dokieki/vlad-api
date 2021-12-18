import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { UserEntity } from '../../entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfileModule } from '../profile/profile.module';
import { InventoryModule } from '../inventory/inventory.module';
import { GuildsModule } from '../guilds/guilds.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        ProfileModule,
        InventoryModule,
        GuildsModule,
        HttpModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}