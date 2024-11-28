import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateMailSubscriptionDto {
  @ApiProperty({
    description: 'Subscriber email address',
    type: String,
    example: 'user@example.com',
  })
  @IsEmail()
  emailAddress: string;

  //   @ApiProperty({
  //     description: 'Verification status of the subscription',
  //     type: Boolean,
  //     default: false,
  //   })
  //   @IsBoolean()
  //   @IsOptional()
  verified?: boolean = undefined;
}
