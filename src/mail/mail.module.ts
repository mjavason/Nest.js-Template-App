import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailSubscriptionController } from './subscription.controller';
import { MailSubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailSubscription, mailSubscriptionSchema } from './subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MailSubscription.name, schema: mailSubscriptionSchema }]),
  ],
  controllers: [MailController, MailSubscriptionController],
  providers: [MailService, MailSubscriptionService],
  exports: [MailService],
})
export class MailModule {}
