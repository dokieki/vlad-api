import {
    Controller,
    Get,
    Post,
    Delete,
    NotFoundException,
    Body,
    Param
} from '@nestjs/common';

import { CurrencyService } from './currency.service';
import { CurrencyEntity } from '../../entities';
import { Roles } from '../../common';
import { CurrencyDto } from 'src/dto';

@Controller('currency')
export class CurrencyController {
    constructor(
        private readonly currencyService: CurrencyService
    ) {}

    @Get('/')
    getAll(): Promise<CurrencyEntity[]> {
        return this.currencyService.allPublic();
    }

    @Get('/:id')
    get(@Param('id') id: string): Promise<CurrencyEntity> {
        return this.currencyService.getPublic(id);
    }

    @Delete('/:id')
    @Roles('admin')
    delete(@Param('id') id: string): Promise<any> {
        return this.currencyService.delete(id);
    }

    @Post('/')
    @Roles('admin')
    create(@Body() data: CurrencyDto): Promise<CurrencyEntity> {
        return this.currencyService.save(data);
    }
}
