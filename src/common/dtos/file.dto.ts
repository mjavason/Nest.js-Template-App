import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Desired file to be uploaded',
  })
  uploadedFile: any;
}
