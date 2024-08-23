import { Types } from 'mongoose';

export function isValidObjectId(value: any): boolean {
  return Types.ObjectId.isValid(value);
}
