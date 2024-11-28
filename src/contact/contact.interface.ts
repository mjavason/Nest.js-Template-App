import { Document } from 'mongoose';

export interface IContact {
  fullName?: string;
  emailAddress: string;
  subject: string;
  message: string;
}

export interface IContactDocument extends IContact, Document {}
