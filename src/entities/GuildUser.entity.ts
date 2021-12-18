import { Entity, PrimaryColumn, CreateDateColumn, Column } from 'typeorm';
import { UserBank } from '.';

@Entity()
export class GuildUserEntity {
    @PrimaryColumn()
    id: string;
    
    @Column()
    guild: string;

    @Column('json', {
        default: {}
    })
    bank: UserBank;
    
    @Column({
        default: 0
    })
    level: number;

    @CreateDateColumn()
    createdAt: Date;
}
