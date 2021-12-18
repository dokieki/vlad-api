import {
	Controller,
	Get,
	Post,
	Param,
	Put,
	NotFoundException,
	Delete,
	Body
} from '@nestjs/common';

import {
	ItemEntity,
	GuildUserEntity,
	GuildEntity,
	GuildInventoryEntity,
	GuildUserInventoryEntity
} from '../../entities';
import { GuildsService } from './guilds.service';
import { ItemsService } from '../items/items.service';
import { ItemDto, UserDto, GuildDto } from '../../dto';
import { Roles, User } from '../../common';

@Controller('guilds')
export class GuildsController {
    constructor(
    	private readonly guildsService: GuildsService,
        private readonly itemsService: ItemsService
    ) {}

	@Get('/:id')
	@Roles('user')
	async get(@Param('id') id: string, @User() user): Promise<any> {
		if (!await this.guildsService.getUser(user.id, id)) throw new NotFoundException();

		const guild = await this.guildsService.get(id);
		return {
			...guild,
			experienceNext: this.guildsService.getExp(guild.level + 1)
		}
	}

	@Put('/:id')
	@Roles('admin')
	async add(@Param('id') id: string, @Body() server: GuildDto): Promise<any> {
		if (!await this.guildsService.get(id)) throw new NotFoundException();

		return this.guildsService.save(server);
	}

	@Post('/')
	@Roles('admin')
	create(@Body() guild: GuildDto): Promise<GuildEntity> {
		return this.guildsService.save(guild);
	}

	@Post('/:id/users')
	@Roles('admin')
	async createUser(@Param('id') id: string, @Body() user: UserDto): Promise<GuildUserEntity> {
		if (!await this.guildsService.get(id)) throw new NotFoundException();

		this.guildsService.saveUserInventory({
			id: user.id,
			guild: id
		});
		return this.guildsService.saveUser({
			...user,
			guild: id
		});
	}

	@Get('/:id/users')
	@Roles('admin')
	getUsers(@Param('id') id: string): Promise<GuildUserEntity[]> {
		return this.guildsService.getUsers(id);
	}

	@Get('/:id/users/:userID')
	@Roles('user')
	getUser(@Param('id') id: string, @Param('userID') user: string): Promise<GuildUserEntity> {
		return this.guildsService.getUser(user, id);
	}

	@Get('/:id/inventory/:userID')
	@Roles('user')
	async userInventory(@Param('id') id: string, @Param('userID') user: string): Promise<GuildUserInventoryEntity> {
		return this.guildsService.getUserInventory(user);
	}

	@Post('/:id/items')
	@Roles('admin')
	async createItem(@Param() id: string, @Body() item: ItemDto): Promise<ItemEntity> {
		const server = await this.guildsService.get(id);

		if (!server) throw new NotFoundException();

		item.server = id;

		return this.itemsService.save(item);
	}

	@Get('/:id/items')
	@Roles('user')
	items(@Param('id') id: string): Promise<ItemEntity[]> {
		return this.itemsService.allServer(id);
	}

	@Delete('/:id/items/:itemID')
	@Roles('admin')
	async deleteItem(@Param() id: string, @Param('itemID') itemID: string): Promise<object> {
		const server = await this.guildsService.get(id);

		if (!server) throw new NotFoundException();

		const item = await this.itemsService.getServerItem(id, itemID);

		if (!item) throw new NotFoundException();

		return this.itemsService.delete({
			id: itemID,
			server: id,
		});
	}
}
