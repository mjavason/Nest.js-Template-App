import { MESSAGES } from '../configs/constants';
import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = MESSAGES.INTERNAL_ERROR;
    Logger.error(exception);

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as {
        message: string[] | string;
      };
      const error = Array.isArray(errorResponse.message)
        ? errorResponse.message[0]
        : errorResponse.message;

      if (exception instanceof ForbiddenException && errorResponse.message === 'forbidden') {
        message = MESSAGES.USER_UNAUTHORIZED;
      } else if (exception instanceof UnauthorizedException) {
        message = MESSAGES.USER_NOT_LOGGED_IN;
      } else {
        message = error;
      }

      return response.status(status).json({
        success: false,
        message,
        errors: Array.isArray(errorResponse.message) ? errorResponse.message : undefined,
      });
    }

    if (exception instanceof Error) {
      message = exception['response'] || exception.message;
    }

    response.status(status).json({
      success: false,
      message,
    });
  }
}
