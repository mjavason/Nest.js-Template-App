import { Body, Controller, Get, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BucketService } from 'src/bucket/bucket.service';
import { uploadImages } from 'src/common/configs/multer.config';
import { Auth, CurrentUser } from 'src/common/decorators/auth.decorator';
import { MulterFile } from 'src/common/interfaces/multer.interface';
import { UpdateUserDTOWithAvatar } from './dto/update-user.dto';
import { IUser, IUserDocument } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bucketService: BucketService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Retrieve logged in users profile' })
  @Auth()
  async profile(@CurrentUser() auth: IUserDocument) {
    return auth;
  }

  @Patch()
  @ApiOperation({ summary: 'Update logged in user profile' })
  @UseInterceptors(FileInterceptor('avatar', uploadImages))
  @ApiConsumes('multipart/form-data')
  @Auth()
  async update(
    @UploadedFile() avatar: MulterFile,
    @Body() updateUserDto: UpdateUserDTOWithAvatar,
    @CurrentUser() auth: { id: string },
  ) {
    const updates: Partial<IUser> = {
      ...updateUserDto,
    };

    if (avatar) {
      const imageUpload = await this.bucketService.uploadToCloudinary(avatar.path);
      updates.avatarURL = imageUpload.url;
    }

    if (updateUserDto.phoneNumber) updates.isPhoneNumberVerified = false;
    if (updateUserDto.email || updateUserDto.password) updates.isEmailVerified = false;

    return await this.userService.updateProfile(auth.id, updates);
  }
}
