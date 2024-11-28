import { Document, Types } from 'mongoose';

export interface IToken {
  user?: string | Types.ObjectId;
  type: string;
  token: string;
  createdAt?: Date;
}

export interface ITokenDocument extends IToken, Document {}

export enum TOKEN_TYPE {
  PASSWORD_RESET = 'password-reset',
  EMAIL_CONFIRM = 'email-confirm',
  PHONE_CONFIRM = 'phone-confirm',
  REFRESH_TOKEN = 'refresh-token',
}
