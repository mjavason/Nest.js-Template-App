import { Types } from 'mongoose';

export function isValidObjectId(value: string): boolean {
  return Types.ObjectId.isValid(value);
}
