import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { createDiffieHellman } from 'crypto';

import { UserEntity, GuildUserEntity } from '../../entities';

import { ProfileService } from '../profile/profile.service';
import { InventoryService } from '../inventory/inventory.service';
import { GuildsService } from '../guilds/guilds.service';

import { Constants } from '../../util';
import { UserDto } from '../../dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
		private profileService: ProfileService,
		private inventoryService: InventoryService,
		private guildsService: GuildsService,
		private httpService: HttpService
	) {}

	generateKey(): string {
		const hell = createDiffieHellman(256);
		
		hell.generateKeys();

		return hell.getPrivateKey('hex');
	}

	async getDiscordUser(token: string): Promise<any> {
		return new Promise(async resolve => {
			const response = await this.httpService.get(`https://discord.com/api/v${Constants.DISCORD_API_VERSION}/users/@me`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).toPromise().catch(e => {
				return resolve(null);
			});

			return resolve(response);
		})
	}

	getExp(lvl: number): number {
		return ((Math.sqrt((lvl ** 2) + 1) * 69) + lvl ** 2.28) ** 1.33742069666;
	}

	findOne(data: any): Promise<UserEntity> {
		return this.usersRepository.findOne(data);
	}

	getServers(id: string): Promise<GuildUserEntity[]> {
		return this.guildsService.getUserGuilds(id);
	}

	async get(id: string): Promise<any> {
		const user = await this.usersRepository.findOne(id);

		if (!user) return {};

		return {
			...user,
			profile: {
				...await this.profileService.get(id)
			},
			inventory: {
				...await this.inventoryService.get(id)
			}
		};
	}

	create(data: UserDto): Promise<any> {
		this.profileService.create(data.id);
		this.inventoryService.create(data.id);

		return this.usersRepository.save({
			id: data.id,
			key: this.generateKey()
		});
	}

	save(data: object): Promise<UserEntity> {
		return this.usersRepository.save(data);
	}
}
