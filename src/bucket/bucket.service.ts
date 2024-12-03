import { Bucket } from './bucket.schema';
import { cloudinaryInstance } from 'src/common/configs/cloudinary.config';
import { GenericService } from '../common/providers/generic.service';
import { IBucketDocument } from './bucket.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APP_NAME } from 'src/common/configs/constants';
// Import the GenericService

@Injectable()
export class BucketService extends GenericService<IBucketDocument> {
  constructor(@InjectModel(Bucket.name) bucketModel: Model<IBucketDocument>) {
    super(bucketModel); // Pass the model to the GenericService constructor
  }

  async uploadToCloudinary(path: string, folder: string = 'global', author: string = '001x') {
    const imageUpload = await cloudinaryInstance.uploader.upload(path, {
      folder: `${APP_NAME}/${folder}`,
      // resource_type: 'raw',
    });

    return await this.create({
      author,
      cloudinaryId: imageUpload.public_id,
      url: imageUpload.secure_url,
      metaData: imageUpload,
    });
  }

  async deleteFromCloudinary(url: string, author: string = '001x') {
    const imageUploaded = await this.findOne({ url, author });
    if (!imageUploaded) throw new NotFoundException('Upload not found');

    await cloudinaryInstance.uploader.destroy(imageUploaded.metaData.public_id);

    return await this.remove(imageUploaded.id);
  }
}
