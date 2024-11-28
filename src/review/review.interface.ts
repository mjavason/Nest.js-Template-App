import { Document, Types } from 'mongoose';
import { IUserDocument } from 'src/user/user.interface';

export interface IReview {
  user: string | Types.ObjectId | IUserDocument;
  rating: number;
  comment?: string;
}

export interface IReviewDocument extends IReview, Document {}
