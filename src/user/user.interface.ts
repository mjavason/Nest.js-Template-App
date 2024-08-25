import { Document } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  isPhoneNumberVerified: boolean;
  isEmailVerified: boolean;
  isBvnVerified: boolean;
  email: string;
  userType: string;
  role: string;
  status: string;
  avatarURL: string;
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

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

export enum Roles {
  BUSINESS_OWNER = 'businessOwner',
  CUSTOMER = 'customer',
}
