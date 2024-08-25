import { cloudinaryInstance } from '../configs';

export async function uploadToCloudinary(path: string, folder: string = 'Uploads') {
  return await cloudinaryInstance.upload(path, {
    folder,
    // resource_type: 'raw',
  });
}

export async function deleteFromCloudinary(public_id: string) {
  return await cloudinaryInstance.destroy(public_id);
}
