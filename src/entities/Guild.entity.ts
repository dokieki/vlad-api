import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class GuildEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        default: 0
    })
    level: number;

    @Column({
        default: 0
    })
    capital: number;

    @Column({
        default: null
    })
    invite: string;
}
