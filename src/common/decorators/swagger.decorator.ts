import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { SuccessResponseDTO, ErrorResponseDTO } from '../dtos/response.dto';
import { MESSAGES } from '../configs/constants';

export function SwaggerResponses(): ClassDecorator {
  return applyDecorators(
    ApiOkResponse({
      description: MESSAGES.SUCCESS_MSG_RESPONSE,
      type: SuccessResponseDTO,
    }),
    ApiInternalServerErrorResponse({
      description: MESSAGES.INTERNAL_ERROR,
      type: ErrorResponseDTO,
    }),
    ApiBadRequestResponse({
      description: MESSAGES.BAD_PARAMETERS,
      type: ErrorResponseDTO,
    }),
    ApiUnauthorizedResponse({
      description: MESSAGES.USER_UNAUTHORIZED,
      type: ErrorResponseDTO,
    }),
    ApiForbiddenResponse({
      description: MESSAGES.USER_NOT_LOGGED_IN,
      type: ErrorResponseDTO,
    }),
  );
}
