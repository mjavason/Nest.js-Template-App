import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { GenericService } from '../common/providers/generic.service';
import { IUser, IUserDocument } from './user.interface';
import { User } from './user.schema';

@Injectable()
export class UserService extends GenericService<IUserDocument> {
  constructor(
    @InjectModel(User.name) userModel: Model<IUserDocument>,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {
    super(userModel);
  }

  async updateProfile(id: string, updates: Partial<IUser>) {
    const data = await this.update(id, updates);

    if (updates.email || updates.password) {
      const verificationToken = await this.jwtService.signAsync({
        sub: data.id,
      });
      const mailSent = await this.mailService.sendMailVerificationEmail(
        data.email,
        `${data.fullName}`,
        `${this.config.get('app.baseURL')}/${this.config.get('app.apiPrefix')}/auth/verify-email/${verificationToken}`,
      );
      if (!mailSent) {
        throw new InternalServerErrorException(
          'Unknown error occurred: Unable to send verification mail',
        );
      }

      return {
        data,
        message: 'Update successful, verification mail has been sent to your email address',
      };
    }

    return data;
  }
}
