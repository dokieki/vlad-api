import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
	@ApiProperty()
	name: string;
	
	@ApiProperty()
	description: string;
	
	@ApiProperty({
		default: null
	})
	server: string;

	@ApiProperty({
		default: 0
	})
	rarity?: number;
	
	@ApiProperty({
		default: 0
	})
	type?: number;
}