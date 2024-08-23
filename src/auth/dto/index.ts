import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ToLowerCase, Trim } from 'src/common/decorators/util.decorator';

export class RegisterDTO {
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
  @IsStrongPassword()
  @Trim()
  password: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'testerzero@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @ToLowerCase()
  @Trim()
  email: string;

  // @ApiProperty({
  //   description: 'Type of user',
  //   enum: UserType,
  //   example: UserType.USER,
  // })
  // @IsEnum(UserType)
  // userType: UserType;

  // @ApiProperty({
  //   description: 'Role of the user',
  //   enum: Roles,
  //   example: Roles.BUSINESS_OWNER,
  // })
  // @IsEnum(Roles)
  // role: Roles;

  @ApiProperty({
    required: false,
    example:
      'https://api.dicebear.com/5.x/pixel-art-neutral/svg?seed=tester2-5w0t1-gmail-qeusl-com&size=200&radius=50',
  })
  @IsOptional()
  @IsString()
  @Trim()
  @IsUrl()
  avatarURL: string;
}

export class RegisterWithAvatarDTO extends RegisterDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Desired avatar image. Only image types accepted',
  })
  avatar: any;
}
export class LoginDTO {
  @ApiProperty({ example: 'testerzero@gmail.com' })
  @IsEmail()
  @ToLowerCase()
  @Trim()
  email: string;

  @ApiProperty({
    example: 'StrongPassword@123',
    description:
      'Minimum of 8 characters, At least one uppercase letter (e.g., A-Z), At least one lowercase letter (e.g., a-z), At least one numeric digit (e.g., 0-9), At least one special character (e.g., !@#$%^&*).',
  })
  @IsStrongPassword()
  @Trim()
  password: string;
}

export * from './create-auth.dto';
export * from './update-auth.dto';
