import {
    Controller,
    Get
} from '@nestjs/common';

import { InventoryService } from './inventory.service';
import { InventoryEntity } from '../../entities';
import { Roles, User } from '../../common';

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService,
    ) {}

    @Get('/')
    @Roles('user')
    get(@User() user): Promise<InventoryEntity> {
        return this.inventoryService.get(user.id);
    }
}