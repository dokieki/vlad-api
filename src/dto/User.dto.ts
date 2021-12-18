import { ApiProperty } from '@nestjs/swagger';
import { UserBank } from 'src/entities';

export class UserDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	guild?: string;

	@ApiProperty()
	level?: number;

	@ApiProperty()
	money?: number;

	@ApiProperty()
	bank?: UserBank;

	@ApiProperty()
	role?: string;
}