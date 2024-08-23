import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, Min } from 'class-validator';
import { ConvertToInt } from '../decorators/util.decorator';

export class PaginationDTO {
  @ApiProperty({
    description: 'Number of objects you want returned per page',
    type: Number,
    required: false,
    default: 10,
  })
  @ConvertToInt() // Because by default any value passed through query is a string, we need to convert it back to a number.
  @IsPositive()
  @Min(1)
  pagination_size: number = 10;

  @ApiProperty({
    description: 'Page you want to be at. Its self explanatory',
    type: Number,
    required: false,
    default: 1,
  })
  @ConvertToInt()
  @IsPositive()
  @Min(1)
  pagination_page: number = 1;
}
