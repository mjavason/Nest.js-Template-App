import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponseDTO } from '../dtos/response.dto';
import { MESSAGES } from '../configs/constants';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, SuccessResponseDTO> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponseDTO> {
    return next.handle().pipe(
      map((data) => {
        // Initialize response object with default status
        const response: SuccessResponseDTO = {
          success: true,
          message: MESSAGES.SUCCESSFUL,
          data: undefined,
          pagination: undefined,
        };

        if (typeof data === 'object' && data !== null) {
          if ('message' in data) {
            response.message = data.message;
            data.message = undefined;
          }
          if ('success' in data) {
            response.success = data.success;
            data.success = undefined;
          }
          if ('pagination' in data) {
            response.pagination = data.pagination;
            data.pagination = undefined;
          }
          if ('data' in data) {
            response.data = data.data;
          } else {
            response.data = data;

            //if the only fields in data are  message and success, delete the data field
            if (Object.keys(response.data).length == 2) response.data = undefined;
          }
        }

        return response;
      }),
    );
  }
}
