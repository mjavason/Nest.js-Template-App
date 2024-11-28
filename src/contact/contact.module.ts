import { Contact, contactSchema } from './entities/contact.schema';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: contactSchema }])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
