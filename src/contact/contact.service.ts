import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IContactDocument } from './contact.interface';
import { Contact } from './entities/contact.schema';
import { GenericService } from 'src/common/providers/generic.service';

@Injectable()
export class ContactService extends GenericService<IContactDocument> {
  constructor(@InjectModel(Contact.name) private contactModel: Model<IContactDocument>) {
    super(contactModel);
  }
}
