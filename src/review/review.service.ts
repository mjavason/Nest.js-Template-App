import { GenericService } from 'src/common/providers/generic.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IReviewDocument } from './review.interface';
import { Model } from 'mongoose';
import { Review } from './entities/review.schema';

@Injectable()
export class ReviewService extends GenericService<IReviewDocument> {
  constructor(@InjectModel(Review.name) private reviewModel: Model<IReviewDocument>) {
    super(reviewModel);
  }
}
