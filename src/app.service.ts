import { Injectable } from '@nestjs/common';
import { MESSAGES } from './common/configs/constants';

@Injectable()
export class AppService {
  getHello(): string {
    return MESSAGES.DEFAULT;
  }
}
