import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/common/providers/generic.service';
import { Token } from '../entities/token.schema';
import { ITokenDocument } from '../interfaces/token.interface';

@Injectable()
export class TokenService extends GenericService<ITokenDocument> {
  constructor(@InjectModel(Token.name) private tokenModel: Model<ITokenDocument>) {
    super(tokenModel);
  }
}
