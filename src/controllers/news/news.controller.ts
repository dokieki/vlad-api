import {
	Controller,
	Get,
	Param,
	Delete,
	Post,
	Body,
} from '@nestjs/common';

import { ItemEntity } from '../../entities';
import { NewsService } from './news.service';
import { NewsDto } from '../../dto';
import { Roles } from '../../common';

@Controller('news')
export class NewsController {
	constructor(
		private readonly newsService: NewsService,
	) {}

	@Post('/')
	@Roles('admin')
	create(@Body() news: NewsDto): Promise<any> {
		return this.newsService.save(news);
	}

	@Get('/:id')
	get(@Param('id') id: string): Promise<ItemEntity> {
		return this.newsService.get(id);
	}

	@Get('/list')
	list(): Promise<ItemEntity[]> {
		return this.newsService.all();
	}

	@Delete('/:id')
	@Roles('admin')
	delete(@Param('id') id: string): Promise<any> {
		return this.newsService.delete(id);
	}
}
