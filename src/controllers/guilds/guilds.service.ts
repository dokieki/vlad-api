import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
    GuildEntity,
    GuildUserEntity,
    GuildInventoryEntity,
    GuildUserInventoryEntity
} from '../../entities';

import { UserDto } from '../../dto';

@Injectable()
export class GuildsService {
    constructor(
        @InjectRepository(GuildEntity)
        private guildsRepository: Repository<GuildEntity>,
        @InjectRepository(GuildUserEntity)
        private guildUserRepository: Repository<GuildUserEntity>,
        @InjectRepository(GuildInventoryEntity)
        private guildInventoryRepository: Repository<GuildInventoryEntity>,
        @InjectRepository(GuildUserInventoryEntity)
        private guildUserInventoryRepository: Repository<GuildUserInventoryEntity>,
    ) {}

    getExp(lvl: number): number {
        return ((Math.sqrt((lvl ** 2) + 1) * 69) + lvl ** 2.28) ** 1.33742069666;
    }

    get(id: string): Promise<GuildEntity> {
        return this.guildsRepository.findOne(id);
    }

    async getUserGuilds(id: string): Promise<GuildUserEntity[]> {
        const Guilds = await this.guildUserRepository.find({
            id
        });

        return Guilds.map(x => {
            return {
                ...x,
                experience: this.getExp(x.level),
                nextExperience: this.getExp(x.level + 1)
            }
        });
    }

    getUsers(guild: string): Promise<GuildUserEntity[]> {
        return this.guildUserRepository.find({
            guild
        });
    }

    getUser(id: string, guild: string): Promise<GuildUserEntity> {
        return this.guildUserRepository.findOne({
            id,
            guild
        });
    }

    getUserInventory(id: string): Promise<GuildUserInventoryEntity> {
        return this.guildUserInventoryRepository.findOne(id);
    }

    getGuildInventory(id: string): Promise<GuildUserInventoryEntity> {
        return this.guildUserInventoryRepository.findOne(id);
    }

    getAll(): Promise<GuildEntity[]> {
        return this.guildsRepository.find();
    }

    saveUser(user: UserDto): Promise<GuildUserEntity> {
        return this.guildUserRepository.save(user)
    }

    saveUserInventory(data: object): Promise<GuildUserInventoryEntity> {
        return this.guildUserInventoryRepository.save(data);
    }

    saveGuildInventory(data: object): Promise<GuildInventoryEntity> {
        return this.guildInventoryRepository.save(data);
    }

    save(data: object): Promise<GuildEntity> {
        return this.guildsRepository.save(data);
    }
}
