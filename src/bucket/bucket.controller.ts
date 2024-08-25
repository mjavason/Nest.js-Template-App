import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, CurrentUser } from 'src/common/decorators/auth.decorator';
import { BucketService } from './bucket.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDTO } from 'src/common/dtos/file.dto';
import { IUserDocument } from 'src/user/user.interface';
import { MulterFile } from 'src/common/interfaces/multer.interface';
import { upload } from 'src/common/configs';
import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('bucket')
@ApiTags('File Bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file to the platform bucket' })
  @UseInterceptors(FileInterceptor('uploadedFile', upload))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @Auth()
  async uploadFile(@UploadedFile() uploadedFile: MulterFile, @CurrentUser() auth: IUserDocument) {
    if (!uploadedFile) throw new BadRequestException('No file uploaded');

    return await this.bucketService.uploadToCloudinary(uploadedFile.path, undefined, auth.id);
  }

  @Delete('delete-upload/:url')
  @ApiOperation({
    summary: 'Delete a file uploaded to the platform bucket',
    description: 'This removes the file from the bucket database and from cloudinary itself',
  })
  @Auth()
  async deleteUpload(@Param('url') url: string, @CurrentUser() auth: IUserDocument) {
    return await this.bucketService.deleteFromCloudinary(url, auth.id);
  }
}
