import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ToLowerCase, Trim } from 'src/common/decorators/util.decorator';

export class VerifyTokenDto {
  @ApiProperty({ example: 'testerzero@gmail.com' })
  @IsEmail()
  @ToLowerCase()
  @Trim()
  email: string;

  @ApiProperty({ example: '2134' })
  @IsNotEmpty()
  @Trim()
  @IsString()
  token: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'testerzero@gmail.com' })
  @IsEmail()
  @ToLowerCase()
  @Trim()
  email: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  expiredAccessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}
