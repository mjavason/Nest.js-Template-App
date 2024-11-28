import { ApiProperty } from '@nestjs/swagger';
import { MulterFile } from 'src/common/interfaces/multer.interface';
import { ToLowerCase, Trim } from 'src/common/decorators/util.decorator';
import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class RegisterDTO {
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
  //   enum: USER_TYPES,
  //   example: USER_TYPES.USER,
  // })
  // @IsEnum(USER_TYPES)
  // USER_TYPES: USER_TYPES;

  // @ApiPropertyOptional({
  //   description: 'Role of the user',
  //   enum: USER_ROLES,
  //   example: USER_ROLES.BUSINESS_OWNER,
  // })
  // @IsOptional()
  // @IsEnum(USER_ROLES)
  // role: USER_ROLES;

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

  // @ApiProperty({
  //   required: false,
  //   example: '3 Nnamani Nwene street',
  // })
  // @IsOptional()
  // @IsString()
  // @Trim()
  // address: string;

  // @ApiProperty({
  //   description: 'Longitude of the user’s location',
  //   example: 12.345678,
  // })
  // @IsNumber()
  // mapLongitude: number;

  // @ApiProperty({
  //   description: 'Latitude of the user’s location',
  //   example: 98.765432,
  // })
  // @IsNumber()
  // mapLatitude: number;
}

export class RegisterWithAvatarDTO extends RegisterDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Desired avatar image. Only image types accepted',
  })
  avatar: MulterFile;
}

export class LoginDTO {
  @ApiProperty({ example: 'testerzero@gmail.com' })
  @IsEmail()
  @ToLowerCase()
  @Trim()
  email: string;

  @ApiProperty({
    example: 'StrongPassword@123',
    description: 'User password',
  })
  @Trim()
  password: string;
}

export class NewPasswordDto {
  @ApiProperty({ example: 'testerzero@gmail.com' })
  @IsEmail()
  @ToLowerCase()
  @Trim()
  email: string;

  @ApiProperty({ example: '2134' })
  @IsString()
  @Trim()
  token: string;

  @ApiProperty({
    example: 'StrongPassword@123',
    description: 'User password',
  })
  @IsString()
  @Trim()
  newPassword: string;
}

export * from './create-auth.dto';
export * from './update-auth.dto';
