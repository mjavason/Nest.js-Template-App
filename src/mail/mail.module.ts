import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailSubscriptionController } from './subscription.controller';
import { MailSubscription, mailSubscriptionSchema } from './subscription.schema';
import { MailSubscriptionService } from './subscription.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MailSubscription.name, schema: mailSubscriptionSchema }]),
  ],
  controllers: [MailController, MailSubscriptionController],
  providers: [MailService, MailSubscriptionService],
  exports: [MailService],
})
export class MailModule {}
