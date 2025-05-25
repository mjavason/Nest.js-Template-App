import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/common/providers/generic.service';
import { Review } from './entities/review.schema';
import { IReviewDocument } from './review.interface';

@Injectable()
export class ReviewService extends GenericService<IReviewDocument> {
  constructor(@InjectModel(Review.name) private reviewModel: Model<IReviewDocument>) {
    super(reviewModel);
  }
}
