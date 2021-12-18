import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CurrencyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: null
    })
    guild: string;

    @Column()
    name: string;

    @Column({
        default: 1
    })
    price: number;
}