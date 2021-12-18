import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

export enum ItemType {
    USER_STATS = 0,
    TRASH,
    LOOT_BOX,
    PROFILE,
    SERVER
}

export enum ItemRarity {
    COMMON = 0,
    MEDIUM,
    RARE,
    VERY_RARE,
    SUPREME,
    FANTASTIC,
    EVENT
}

@Entity()
export class ItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: null
    })
    guild: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ItemType,
        default: ItemType.TRASH
    })
    type: number;

    @Column({
        type: 'enum',
        enum: ItemRarity,
        default: ItemRarity.COMMON
    })
    rarity: number;

    @Column({
        default: 1
    })
    price: number;

    @Column({
        default: 'defaultCurrency'
    })
    currency: string;

    @CreateDateColumn()
    createdAt: Date;
}
