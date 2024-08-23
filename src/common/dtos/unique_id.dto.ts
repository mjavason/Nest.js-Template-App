import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UniqueIdDTO {
  @ApiProperty({
    description: 'Unique mongodb id',
    type: String,
    format: 'ObjectId',
    example: '60d0fe4f5311236168a109ca', // example ObjectId
  })
  @IsMongoId()
  id: string;
}
