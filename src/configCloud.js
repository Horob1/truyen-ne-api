import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
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

export const storage = new CloudinaryStorage({
  cloudinary: configureCloudinary(),
  params: {
    folder: 'avatars', // Thư mục trên Cloudinary để lưu trữ ảnh
    allowed_formats: ['jpg', 'jpeg', 'png'], // Định dạng file cho phép
  },
});

export const upload = multer({ storage: storage });
