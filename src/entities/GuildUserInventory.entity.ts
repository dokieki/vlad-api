import { PrimaryColumn, Entity } from 'typeorm';

import { InventoryEntity } from '.';

@Entity()
export class GuildUserInventoryEntity extends InventoryEntity {
    @PrimaryColumn()
    id: string;
}