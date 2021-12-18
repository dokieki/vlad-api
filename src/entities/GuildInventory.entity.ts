import { Entity } from 'typeorm';

import { InventoryEntity } from './Inventory.entity';

@Entity()
export class GuildInventoryEntity extends InventoryEntity {}