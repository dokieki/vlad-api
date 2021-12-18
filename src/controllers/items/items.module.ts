import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemEntity } from '../../entities';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { InventoryModule } from '../inventory/inventory.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ItemEntity]),
        forwardRef(() => InventoryModule),
        forwardRef(() => UsersModule)
    ],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [ItemsService]
})
export class ItemsModule {}