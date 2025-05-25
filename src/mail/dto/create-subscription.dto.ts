import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateMailSubscriptionDto {
  verified?: boolean = undefined;

  @ApiProperty({
    description: 'Subscriber email address',
    type: String,
    example: 'user@example.com',
  })
  @IsEmail()
  emailAddress: string;
}
