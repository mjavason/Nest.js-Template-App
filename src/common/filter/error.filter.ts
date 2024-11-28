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
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = this.getStatus(exception);
    const message = this.getMessage(exception, status);

    // Enhanced logging with stack trace in development
    if (process.env.NODE_ENV !== 'production') {
      this.logger.error(exception instanceof Error ? exception.stack : exception);
    } else {
      this.logger.error(exception);
    }
    this.logger.error(message);

    response.status(status).json({
      success: false,
      message,
      ...(exception instanceof HttpException &&
        Array.isArray(exception.getResponse()['message'] as unknown) && {
          errors: exception.getResponse()['message'],
        }),
    });
  }

  /**
   * Determine the HTTP status for the response.
   */
  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Extract or map the appropriate error message.
   */
  private getMessage(exception: unknown, status: number): string {
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as { message: string[] | string };
      const error = Array.isArray(errorResponse.message)
        ? errorResponse.message[0]
        : errorResponse.message;

      if (exception instanceof ForbiddenException && errorResponse.message === 'forbidden') {
        return MESSAGES.USER_UNAUTHORIZED;
      }
      if (exception instanceof UnauthorizedException) {
        return MESSAGES.USER_NOT_LOGGED_IN;
      }
      if (status === HttpStatus.TOO_MANY_REQUESTS) {
        return MESSAGES.TOO_MANY_REQUESTS;
      }
      return error;
    }

    // Default fallback for non-HttpExceptions
    if (exception instanceof Error) {
      return exception['response'] || exception.message || MESSAGES.INTERNAL_ERROR;
    }

    return MESSAGES.INTERNAL_ERROR;
  }
}
