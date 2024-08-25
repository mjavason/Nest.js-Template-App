import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsUrl, IsStrongPassword } from 'class-validator';
import { Trim } from 'src/common/decorators/util.decorator';
import { MulterFile } from 'src/common/interfaces/multer.interface';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    description: 'First name of the user',
  })
  @IsOptional()
  @IsString()
  @Trim()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name of the user',
  })
  @IsOptional()
  @IsString()
  @Trim()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
  })
  @IsOptional()
  @IsString()
  @Trim()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Email address of the user',
  })
  @IsOptional()
  @IsEmail()
  @Trim()
  email?: string;

  @ApiPropertyOptional({
    description: 'Password for the user account',
    minLength: 5,
  })
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  @Trim()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsUrl()
  @Trim()
  avatarURL?: string;
}

export class UpdateUserDTOWithAvatar extends UpdateUserDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Desired avatar image. Only image types accepted',
  })
  avatar: MulterFile;
}
