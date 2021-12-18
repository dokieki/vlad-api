import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemEntity } from '../../entities';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ItemEntity])
    ],
    controllers: [NewsController],
    providers: [NewsService],
    exports: [NewsService]
})
export class NewsModule {}
