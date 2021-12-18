import { Entity, PrimaryColumn, Column } from 'typeorm';

interface ItemsInterface {
    id: string;
    quantity: number;
}

@Entity()
export class InventoryEntity {
    @PrimaryColumn()
    id: string;

    @Column('json', {
        default: {}
    })
    items: ItemsInterface
}
