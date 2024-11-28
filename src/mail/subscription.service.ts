import { GenericService } from 'src/common/providers/generic.service';
import { IMailSubscriptionDocument } from './subscription.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailSubscription } from './subscription.schema';
import { Model } from 'mongoose';

@Injectable()
export class MailSubscriptionService extends GenericService<IMailSubscriptionDocument> {
  constructor(
    @InjectModel(MailSubscription.name)
    private mailSubscriptionModel: Model<IMailSubscriptionDocument>,
  ) {
    super(mailSubscriptionModel);
  }
}
