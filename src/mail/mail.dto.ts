import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendMailDTO {
  @ApiProperty({
    description: 'Recipient email',
    example: 'orjimichael2240@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Hello' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Hello fellow Human, this is a simple mail test, do not be alarmed',
  })
  @IsString()
  body: string;
}

export class SendWelcomeMailDTO {
  @ApiProperty({ description: 'Recipient email' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  token: string;
}
