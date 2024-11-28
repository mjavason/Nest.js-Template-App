import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IContact } from '../contact.interface';

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
export class Contact implements IContact {
  @Prop()
  fullName?: string;

  @Prop({ required: true })
  emailAddress: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;
}

export const contactSchema = SchemaFactory.createForClass(Contact);
