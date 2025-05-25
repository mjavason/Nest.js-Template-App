import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MESSAGES } from '../configs/constants';
import { ErrorResponseDTO, SuccessResponseDTO } from '../dtos/response.dto';

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
