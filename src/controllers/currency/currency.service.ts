import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';

import { CurrencyEntity } from '../../entities';

@Injectable()
export class CurrencyService {
	constructor(
		@InjectRepository(CurrencyEntity)
		private currencyRepository: Repository<CurrencyEntity>
	) {}

    allPublic(): Promise<CurrencyEntity[]> {
        return this.currencyRepository.find({
            where: {
                guild: IsNull()
            }
        });
    }

    getPublic(id: string): Promise<CurrencyEntity> {
        return this.currencyRepository.findOne({
            where: {
                id,
                guild: IsNull()
            }
        })
    }

    allServer(guild: string): Promise<CurrencyEntity[]> {
        return this.currencyRepository.find({
            where: {
                guild
            }
        });
    }

	save(data: object): Promise<CurrencyEntity> {
		return this.currencyRepository.save(data);
	}

	async delete(data: any): Promise<{ok: boolean}> {
		await this.currencyRepository.delete(data);

		return {
            ok: true
        };
	}
}
