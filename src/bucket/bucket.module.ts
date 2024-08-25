import { Global, Module } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { BucketController } from './bucket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bucket, bucketSchema } from './bucket.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Bucket.name, schema: bucketSchema }])],
  controllers: [BucketController],
  providers: [BucketService],
  exports: [BucketService],
})
export class BucketModule {}
