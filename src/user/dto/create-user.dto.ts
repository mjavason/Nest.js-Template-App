import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { USER_TYPES, USER_ROLES, Status } from '../user.interface';
import { Trim } from 'src/common/decorators/util.decorator';

export class CreateUserDTO {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  fullName: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPassword@123',
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Trim()
  password: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @Trim()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Indicates if the phone number is verified',
    example: false,
    required: false,
  })
  @IsBoolean()
  isPhoneNumberVerified?: boolean;

  @ApiProperty({
    description: 'Indicates if the email is verified',
    example: false,
    required: false,
  })
  @IsBoolean()
  isEmailVerified?: boolean;

  @ApiProperty({
    description: 'Indicates if the user signed up/in with google',
    example: false,
    required: false,
  })
  @IsBoolean()
  signInWithGoogle?: boolean;

  @ApiProperty({
    description: 'Indicates if the BVN is verified',
    example: false,
    required: false,
  })
  @IsBoolean()
  isBvnVerified?: boolean;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @ApiProperty({
    description: 'Type of user',
    enum: USER_TYPES,
    example: USER_TYPES.USER,
  })
  @IsEnum(USER_TYPES)
  USER_TYPES: USER_TYPES;

  @ApiProperty({
    description: 'Role of the user',
    enum: USER_ROLES,
    example: USER_ROLES.BUSINESS_OWNER,
  })
  @IsEnum(USER_ROLES)
  role: USER_ROLES;

  @ApiProperty({
    description: 'Account status of the user',
    enum: Status,
    example: Status.INACTIVE,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    required: false,
    example:
      'https://api.dicebear.com/5.x/pixel-art-neutral/svg?seed=tester2-5w0t1-gmail-qeusl-com&size=200&radius=50',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @Trim()
  avatarURL: string;
}
