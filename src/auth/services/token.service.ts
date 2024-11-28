import { GenericService } from 'src/common/providers/generic.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITokenDocument } from '../interfaces/token.interface';
import { Model } from 'mongoose';
import { Token } from '../entities/token.schema';

@Injectable()
export class TokenService extends GenericService<ITokenDocument> {
  constructor(@InjectModel(Token.name) private tokenModel: Model<ITokenDocument>) {
    super(tokenModel);
  }
}
