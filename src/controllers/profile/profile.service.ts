import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProfileEntity } from '../../entities';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(ProfileEntity)
		private profileRepository: Repository<ProfileEntity>
	) {}

	get(id: string): Promise<ProfileEntity> {
		return this.profileRepository.findOne(id);
	}

	create(id: string): Promise<ProfileEntity> {
		return this.profileRepository.save({
			id
		});
	}

	save(data: object): Promise<ProfileEntity> {
		return this.profileRepository.save(data);
	}
}
