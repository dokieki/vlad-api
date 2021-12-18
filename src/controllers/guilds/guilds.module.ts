import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
    GuildEntity,
    GuildUserEntity,
    GuildInventoryEntity,
    GuildUserInventoryEntity
} from '../../entities';
import { GuildsService } from './guilds.service';
import { GuildsController } from './guilds.controller';
import { ItemsModule } from '../items/items.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            GuildEntity,
            GuildUserEntity,
            GuildInventoryEntity,
            GuildUserInventoryEntity
        ]),
        ItemsModule,
        InventoryModule
    ],
    controllers: [GuildsController],
    providers: [GuildsService],
    exports: [GuildsService]
})
export class GuildsModule {}