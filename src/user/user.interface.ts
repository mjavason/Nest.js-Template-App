import { Document } from 'mongoose';

export interface IUser {
  fullName: string;
  password: string;
  phoneNumber: string;
  isPhoneNumberVerified: boolean;
  isEmailVerified: boolean;
  email: string;
  userType: string;
  role: string;
  status: string;
  avatarURL: string;
  address: string;
  mapLongitude: number;
  mapLatitude: number;
  signInWithGoogle: boolean;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

interface IUserStatics {
  hashPassword(password: string): Promise<string>;
  userExists(email: string): Promise<boolean>;
}

export interface IUserDocument extends IUser, Document, IUserMethods, IUserStatics {}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum USER_TYPES {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

export enum USER_ROLES {
  BUSINESS_OWNER = 'businessOwner',
  CUSTOMER = 'customer',
  COURIER = 'courier',
}
