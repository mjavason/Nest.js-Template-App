import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  // @ApiProperty({
  //   description: 'ID of the user',
  //   type: String,
  //   example: '64afc3a2f23b9e0d12345abc',
  // })
  // @IsMongoId()
  user: string = undefined;

  @ApiProperty({
    description: 'Rating of the review (1-5)',
    type: Number,
    example: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({
    description: 'Comment for the review',
    type: String,
    example: 'This is an amazing product!',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
