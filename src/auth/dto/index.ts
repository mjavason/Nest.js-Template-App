import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MinLength,
} from 'class-validator';
import { ToLowerCase, Trim } from 'src/common/decorators/util.decorator';
import { MulterFile } from 'src/common/interfaces/multer.interface';

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
