import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsUrl,
  IsStrongPassword,
} from 'class-validator';
import { Trim } from 'src/common/decorators/util.decorator';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'First name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Trim()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Trim()
  lastName: string;

  @ApiProperty({
    description: 'Phone number of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Trim()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Email address of the user',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  @Trim()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    minLength: 5,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  @Trim()
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @Trim()
  avatarURL: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Desired avatar image. Only image types accepted',
  })
  avatar: any;
}
