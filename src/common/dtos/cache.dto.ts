import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetCacheDto {
  //   @ApiProperty({
  //     description: 'The unique key to store the data under',
  //     example: 'user_123',
  //   })
  //   @IsString()
  //   @IsNotEmpty()
  //   key: string;

  @ApiProperty({
    description: 'The data to store in the cache',
    example: { name: 'John Doe', age: 30 },
  })
  @IsNotEmpty()
  data: any;
}

export class GetCacheDto {
  @ApiProperty({
    description: 'The unique key for the data to retrieve',
    example: 'user_123',
  })
  @IsString()
  @IsNotEmpty()
  key: string;
}
