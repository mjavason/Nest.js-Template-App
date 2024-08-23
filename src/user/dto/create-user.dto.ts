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
import { UserType, Roles, Status } from '../user.interface';
import { Trim } from 'src/common/decorators/util.decorator';

export class CreateUserDTO {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  lastName: string;

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
    enum: UserType,
    example: UserType.USER,
  })
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty({
    description: 'Role of the user',
    enum: Roles,
    example: Roles.BUSINESS_OWNER,
  })
  @IsEnum(Roles)
  role: Roles;

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
