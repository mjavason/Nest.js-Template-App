import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, CurrentUser } from 'src/common/decorators/auth.decorator';
import { BucketService } from './bucket.service';
import { FileUploadDTO, MultiFileUploadDTO } from 'src/common/dtos/file.dto';
import { IUserDocument } from 'src/user/user.interface';
import { MulterFile } from 'src/common/interfaces/multer.interface';
import { upload } from 'src/common/configs/multer.config';
import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

@Controller('bucket')
@ApiTags('File Bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file to the platform bucket and cloudinary' })
  @UseInterceptors(FileInterceptor('uploadedFile', upload))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @Auth()
  async uploadFile(@UploadedFile() uploadedFile: MulterFile, @CurrentUser() auth: IUserDocument) {
    if (!uploadedFile) throw new BadRequestException('No file uploaded');

    const data = await this.bucketService.uploadToCloudinary(uploadedFile.path, auth.id, auth.id);
    return { data: data.url };
  }

  @Post('upload-multiple')
  @ApiOperation({ summary: 'Upload a group of files', description: 'Maximum of 10 at once' })
  @UseInterceptors(AnyFilesInterceptor(upload))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: MultiFileUploadDTO })
  @Auth()
  async create(@UploadedFiles() files: MulterFile[], @CurrentUser() auth: IUserDocument) {
    const uploadedFiles = files.filter((file) => file.fieldname === 'uploadedFiles');
    if (uploadedFiles.length < 1) throw new BadRequestException('No files uploaded');

    // Upload all files concurrently and wait for them to finish
    const uploadedFilesArray = await Promise.all(
      uploadedFiles.map(async (file) => {
        const fileUploaded = await this.bucketService.uploadToCloudinary(
          file.path,
          auth.id, // folder
          auth.id, // author
        );
        return fileUploaded.url;
      }),
    );

    return uploadedFilesArray;
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
