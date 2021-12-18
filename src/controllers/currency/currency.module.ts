import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CurrencyEntity } from '../../entities';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([CurrencyEntity]),
    ],
    controllers: [CurrencyController],
    providers: [CurrencyService],
    exports: [CurrencyService]
})
export class CurrencyModule {}