import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { GenericService } from '../common/providers/generic.service'; // Import the GenericService
import { IUser, IUserDocument } from './user.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService extends GenericService<IUserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUserDocument>,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {
    super(userModel); // Pass the model to the GenericService constructor
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
          'Unknown error occured: Unable to send verification mail',
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
