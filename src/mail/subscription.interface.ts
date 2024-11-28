import { Document } from 'mongoose';

export interface IMailSubscription {
  emailAddress: string;
  verified: boolean;
}

export interface IMailSubscriptionDocument extends IMailSubscription, Document {}
