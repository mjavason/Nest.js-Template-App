import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsStrongPassword, IsUrl } from 'class-validator';
import { ConvertToInt, Trim } from 'src/common/decorators/util.decorator';
import { MulterFile } from 'src/common/interfaces/multer.interface';

export class UpdateUserDTO {
  isPhoneNumberVerified: boolean = undefined;
  isEmailVerified: boolean = undefined;
  USER_TYPES: string = undefined;
  role: string = undefined;
  status: string = undefined;

  @ApiPropertyOptional({
    description: 'Primary address of the user',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({
    description: 'Longitude of the user’s location',
  })
  @IsOptional()
  @ConvertToInt()
  mapLongitude?: number;

  @ApiPropertyOptional({
    description: 'Latitude of the user’s location',
  })
  @IsOptional()
  @ConvertToInt()
  mapLatitude?: number;

  @ApiPropertyOptional({
    description: 'Full name of the user',
  })
  @IsOptional()
  @IsString()
  @Trim()
  fullName?: string;

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

  @ApiPropertyOptional({
    description: 'URL for the user’s avatar image',
  })
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
