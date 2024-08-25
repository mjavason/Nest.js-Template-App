import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, Roles, Status, UserType } from './user.interface';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    },
  },
})
export class User implements IUser {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({
    default: false,
  })
  isPhoneNumberVerified: boolean;

  @Prop({
    default: false,
  })
  isEmailVerified: boolean;

  @Prop({
    default: false,
  })
  isBvnVerified: boolean;

  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop({
    enum: UserType,
    default: UserType.USER,
  })
  userType: string;

  @Prop({
    enum: Roles,
    default: Roles.CUSTOMER,
  })
  role: string;

  @Prop({
    enum: Status,
    default: Status.ACTIVE,
  })
  status: string;

  @Prop({ required: true })
  avatarURL: string;
}

export const userSchema = SchemaFactory.createForClass(User);
const userModel = mongoose.model('User', userSchema);

userSchema.methods.comparePassword = async function compare(password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function hashPassword(password: string) {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

userSchema.pre('save', async function preSave(next) {
  if (this.isModified('password') || (this.isNew && this.password)) {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
  next();
});

userSchema.statics.userExists = async function duplicateIdentity(email: string) {
  const user = await userModel.findOne({
    email,
  });
  if (user) return true;
  return false;
};
