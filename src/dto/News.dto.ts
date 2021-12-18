import { ApiProperty } from '@nestjs/swagger';

export class NewsDto {
	@ApiProperty()
	title: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	image: string;
}