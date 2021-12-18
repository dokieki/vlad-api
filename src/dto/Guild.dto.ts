import { ApiProperty } from '@nestjs/swagger';

export class GuildDto {
	@ApiProperty()
	id: string;
}