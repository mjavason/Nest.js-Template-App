import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact, contactSchema } from './entities/contact.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: contactSchema }])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
