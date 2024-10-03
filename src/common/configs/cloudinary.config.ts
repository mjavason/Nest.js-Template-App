import cloudinary from 'cloudinary';

import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_API_NAME } from './constants';

cloudinary.v2.config({
  cloud_name: CLOUDINARY_API_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const cloudinaryInstance = cloudinary.v2;
