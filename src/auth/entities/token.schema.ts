import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IToken } from '../interfaces/token.interface';
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
export class Token implements IToken {
  @Prop({ type: Types.ObjectId, ref: User.name, default: null })
  user: string | Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  token: string;
}

export const tokenSchema = SchemaFactory.createForClass(Token);
