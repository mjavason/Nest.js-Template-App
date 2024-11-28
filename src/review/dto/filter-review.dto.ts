import { ApiPropertyOptional } from '@nestjs/swagger';
import { ConvertToInt } from 'src/common/decorators/util.decorator';
import { IsMongoId, IsOptional, Max, Min } from 'class-validator';

export class FilterReviewDto {
  @ApiPropertyOptional({
    description: 'ID of the user',
    type: String,
    example: '64afc3a2f23b9e0d12345abc',
  })
  @IsOptional()
  @IsMongoId()
  user?: string;

  @ApiPropertyOptional({
    description: 'Rating of the review (1-5)',
    type: Number,
    example: 5,
  })
  @IsOptional()
  @ConvertToInt()
  @Min(1)
  @Max(5)
  rating?: number;
}

export class FilterReviewWithPaginationDto extends FilterReviewDto {
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
