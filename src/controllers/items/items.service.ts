import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';

import { ItemEntity } from '../../entities';

@Injectable()
export class ItemsService {
	constructor(
		@InjectRepository(ItemEntity)
		private itemsRepository: Repository<ItemEntity>
	) {}

	allPublic(): Promise<ItemEntity[]> {
		return this.itemsRepository.find({
			where: {
				server: IsNull()
			}
		});
	}

	allServer(id: string): Promise<ItemEntity[]> {
		return this.itemsRepository.find({
			where: {
				server: id
			}
		});
	}

	getGlobal(id: string): Promise<ItemEntity> {
		return this.itemsRepository.findOne({
			where: {
				id,
				server: IsNull()
			}
		});
	}

	getServerItem(id: string, server: string) {
		return this.itemsRepository.findOne({
			where: {
				id,
				server: id
			}
		});
	}

	all(): Promise<ItemEntity[]> {
		return this.itemsRepository.find();
	}

	save(data: object): Promise<ItemEntity> {
		return this.itemsRepository.save(data);
	}

	async delete(data: any): Promise<{ok: boolean}> {
		await this.itemsRepository.delete(data);

		return {
			ok: true
		};
	}
}
