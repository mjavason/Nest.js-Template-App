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

export class MultiFileUploadDTO {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Desired files to be uploaded',
  })
  uploadedFiles: MulterFile[];
}
