import { IReview } from '../review.interface';
import { IUserDocument } from 'src/user/user.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Review implements IReview {
  @Prop({ required: true, type: Types.ObjectId, autopopulate: true, ref: User.name })
  user: string | Types.ObjectId | IUserDocument;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ default: null })
  comment?: string;
}

export const reviewSchema = SchemaFactory.createForClass(Review);
