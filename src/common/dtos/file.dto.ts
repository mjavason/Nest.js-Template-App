import { ApiProperty } from '@nestjs/swagger';
import { MulterFile } from '../interfaces/multer.interface';

export class FileUploadDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Desired file to be uploaded',
  })
  uploadedFile: MulterFile;
}
