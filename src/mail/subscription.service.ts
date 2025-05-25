import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/common/providers/generic.service';
import { IMailSubscriptionDocument } from './subscription.interface';
import { MailSubscription } from './subscription.schema';

@Injectable()
export class MailSubscriptionService extends GenericService<IMailSubscriptionDocument> {
  constructor(
    @InjectModel(MailSubscription.name)
    private mailSubscriptionModel: Model<IMailSubscriptionDocument>,
  ) {
    super(mailSubscriptionModel);
  }
}
