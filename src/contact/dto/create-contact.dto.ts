import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ToLowerCase } from 'src/common/decorators/util.decorator';

export class CreateContactDto {
  @ApiPropertyOptional({
    description: 'Full name of the contact',
    type: String,
    example: 'Jane Doe',
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: 'Email address of the contact',
    type: String,
    example: 'jane.doe@example.com',
  })
  @ToLowerCase()
  @IsEmail()
  emailAddress: string;

  @ApiProperty({
    description: 'Subject of the message',
    type: String,
    example: 'Support Request',
  })
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'Message content',
    type: String,
    example: 'I need help with my account.',
  })
  @IsString()
  message: string;
}
