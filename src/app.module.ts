import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import {
    NewsModule,
    UsersModule,
    ProfileModule,
    InventoryModule,
    ItemsModule,
    GuildsModule,
    CurrencyModule
} from './controllers';
import {
    UserEntity,
    ItemEntity,
    InventoryEntity,
    ProfileEntity,
    GuildEntity,
    GuildUserEntity,
    GuildUserInventoryEntity,
    GuildInventoryEntity,
    CurrencyEntity,
    NewsEntity
} from './entities';
import { RolesGuard } from './common';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
            entities: [
                UserEntity,
                ItemEntity,
                InventoryEntity,
                ProfileEntity,
                GuildEntity,
                GuildUserEntity,
                GuildUserInventoryEntity,
                GuildInventoryEntity,
                CurrencyEntity,
                NewsEntity
            ],
            database: 'bot',
            logging: true,
            synchronize: true
        }),
		NewsModule,
        InventoryModule,
        UsersModule,
        ProfileModule,
        ItemsModule,
        GuildsModule,
        CurrencyModule
	]
})
export class AppModule {}