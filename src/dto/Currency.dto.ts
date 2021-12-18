import { ApiProperty } from '@nestjs/swagger';

export class CurrencyDto {
    @ApiProperty()
    server?: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;
}