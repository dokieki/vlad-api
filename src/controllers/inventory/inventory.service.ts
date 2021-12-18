import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InventoryEntity } from '../../entities';

@Injectable()
export class InventoryService {
	constructor(
		@InjectRepository(InventoryEntity)
		private inventoryRepository: Repository<InventoryEntity>
	) {}

	addItem(inventory: InventoryEntity, id: string, quantity: number): Promise<InventoryEntity> {
		if (!inventory.items[id]) {
			inventory.items[id] = quantity;
		} else {
			inventory.items[id] += quantity;
		}

		return this.inventoryRepository.save(inventory);
	}

	get(id: string): Promise<InventoryEntity> {
		return this.inventoryRepository.findOne(id);
	}

	create(id: string): Promise<any> {
		return this.inventoryRepository.save({
			id
		});
	}

	save(data: object): Promise<InventoryEntity> {
		return this.inventoryRepository.save(data);
	}
}
