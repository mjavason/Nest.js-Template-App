import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, reviewSchema } from './entities/review.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: reviewSchema }])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
