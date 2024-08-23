import { UploadApiResponse } from 'cloudinary';
import { Document } from 'mongoose';

export interface IBucket {
  url: string;
  cloudinaryId: string;
  author?: string;
  metaData: UploadApiResponse;
}

export interface IBucketDocument extends IBucket, Document {}
