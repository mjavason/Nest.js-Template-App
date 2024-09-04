import { ApiProperty } from '@nestjs/swagger';
import { PaginationData } from '../interfaces';

export class ErrorResponseDTO {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: String, isArray: true })
  errors?: string[];
}

export class SuccessResponseDTO {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: unknown;

  @ApiProperty({ required: false })
  pagination?: PaginationData;
}
