import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Min } from 'class-validator';
import { ConvertToInt } from 'src/common/decorators/util.decorator';

export class FilterContactDto {
  @ApiPropertyOptional({
    description: 'Full name of the contact',
    type: String,
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    description: 'Subject of the message',
    type: String,
    example: 'Support Request',
  })
  @IsOptional()
  @IsString()
  subject?: string;
}

export class FilterContactWithPaginationDto extends FilterContactDto {
  @ApiPropertyOptional({
    description: 'Number of objects per page',
    type: Number,
    default: 10,
  })
  @ConvertToInt() // Don't update this, it's very important
  @Min(1)
  pagination_size: number = 10;

  @ApiPropertyOptional({
    description: 'Page number',
    type: Number,
    default: 1,
  })
  @ConvertToInt() // Don't update this, it's very important
  @Min(1)
  pagination_page: number = 1;
}
