import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config.env' });

export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: 'dlunbu0qm',
    api_key: '187476356594955',
    api_secret: 'tmJHgIJ5UKo2fOP9_X4vK0ls8ec',
  });
  return cloudinary;
};
