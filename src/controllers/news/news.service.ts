import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ItemEntity } from '../../entities';

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(ItemEntity)
		private newsRepository: Repository<ItemEntity>,
	) {}

	all(): Promise<ItemEntity[]> {
		return this.newsRepository.find();
	}

	get(id: string): Promise<ItemEntity> {
		return this.newsRepository.findOne(id);
	}

	save(data: object): Promise<ItemEntity> {
		return this.newsRepository.save(data);
	}

	async delete(data: any): Promise<{ok: boolean}> {
		await this.newsRepository.delete(data);

		return {
			ok: true
		};
	}
}
