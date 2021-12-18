import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ProfileEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        default: ''
    })
    status: string;

    @Column({
        default: ''
    })
    about: string;

    @Column({ default: 'default' })
    background: string;
}
