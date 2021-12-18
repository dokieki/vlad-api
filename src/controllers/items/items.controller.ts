import {
    Controller,
    Param,
    Get,
    Delete,
    Post,
    Put,
    Body,
    NotFoundException
} from '@nestjs/common';

import { ItemsService } from './items.service';
import { InventoryService } from '../inventory/inventory.service';
import { UsersService } from '../users/users.service';
import { Roles, User } from '../../common';
import { ItemEntity } from '../../entities';
import { ItemDto } from '../../dto';

@Controller('items')
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly inventoryService: InventoryService,
        private readonly usersService: UsersService
    ) {}

    @Get('/:id')
    get(@Param('id') id: string): Promise<ItemEntity> {
        return this.itemsService.getGlobal(id);
    }

    @Post('/')
    @Roles('admins')
    create(@Body() item: ItemDto): Promise<ItemEntity> {
        return this.itemsService.save(item);
    }
    
    @Delete('/:id')
    @Roles('admins')
    delete(@Param('id') id: string): Promise<any> {
        return this.itemsService.delete(id);
    }

    @Get('/list')
    publicList(): Promise<ItemEntity[]> {
        return this.itemsService.all();
    }

    @Put('/:id/buy')
    @Roles('user')
    async buy(@User() user, @Param('id') id: string): Promise<any> {
        const item = await this.itemsService.getGlobal(id);
        
        if (!item) throw new NotFoundException();
        if (item.currency === 'defaultCurrency') {
            if (user.defaultCurrency < item.price) return {};

            user.defaultCurrency -= item.price;

            this.usersService.save(user);

            const inventory = await this.inventoryService.get(user.id);

            return this.inventoryService.addItem(inventory, item.id, 1);
        } else {
            if (!user.bank[item.currency] || user.bank[item.currency] < item.price) return {};

            user.bank[item.currency] -= item.price;

            this.usersService.save(user);

            const inventory = await this.inventoryService.get(user.id);
            
            return this.inventoryService.addItem(inventory, item.id, 1);
        }
    }
}