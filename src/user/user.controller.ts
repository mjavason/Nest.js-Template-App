import {
  Body,
  Controller,
  Get,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, CurrentUser } from 'src/common/decorators/auth.decorator';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { uploadImages } from 'src/common/configs';
import { BucketService } from 'src/bucket/bucket.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'src/common/interfaces/multer.interface';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly bucketService: BucketService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Retrieve logged in users profile' })
  @Auth()
  async profile(@CurrentUser() user: { id: string }) {
    return await this.userService.findOne({ _id: user.id });
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update logged in user profile' })
  @UseInterceptors(FileInterceptor('avatar', uploadImages))
  @ApiConsumes('multipart/form-data')
  @Auth()
  async update(
    @UploadedFile() avatar: MulterFile,
    @Body() updateUserDto: UpdateUserDTO,
    @CurrentUser() auth: { id: string },
  ) {
    const updates: CreateUserDTO | any = {
      ...updateUserDto,
    };

    // if an image was uploaded, set the avatarURL as its path
    if (avatar) {
      const imageUpload = await this.bucketService.uploadToCloudinary(
        avatar.path,
      );
      updates.avatarURL = imageUpload.url;
    }

    if (updateUserDto.phoneNumber) updates.isPhoneNumberVerified = false;
    if (updateUserDto.email || updateUserDto.password)
      updates.isEmailVerified = false;

    return await this.userService.updateProfile(auth.id, updates);
  }
}
