import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
	@ApiProperty()
	background?: string;

	@ApiProperty()
	status?: string;

	@ApiProperty()
	about?: string;
}