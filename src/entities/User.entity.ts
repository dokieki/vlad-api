import { PrimaryColumn, CreateDateColumn, Column, Entity } from 'typeorm';

export interface UserBank {
    id: string;
    quantity: number;
};

export type UserRoleType = 'admin' | 'editor' | 'user';

@Entity()
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        default: 100
    })
    defaultCurrency: number;

    @Column('json', {
        default: {}
    })
    bank: UserBank;

    @Column({
        type: 'enum',
        enum: ['admin', 'editor', 'user'],
        default: 'user'
    })
    role: UserRoleType

    @Column('int', {
        default: 1
    })
    level: number;

    @Column()
    key: string;

    @Column({
        default: false
    })
    banned: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
