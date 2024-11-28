import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsBoolean, Min } from 'class-validator';
import { ConvertToInt } from 'src/common/decorators/util.decorator';

export class FilterMailSubscriptionDto {
  @ApiPropertyOptional({
    description: 'Filter by email address',
    type: String,
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @ApiPropertyOptional({
    description: 'Filter by verification status',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}

export class FilterMailSubscriptionWithPaginationDto extends FilterMailSubscriptionDto {
  @ApiPropertyOptional({
    description: 'Number of objects per page',
    type: Number,
    default: 10,
  })
  @ConvertToInt()
  @Min(1)
  pagination_size: number = 10;

  @ApiPropertyOptional({
    description: 'Page number',
    type: Number,
    default: 1,
  })
  @ConvertToInt()
  @Min(1)
  pagination_page: number = 1;
}
