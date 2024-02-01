import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { configureCloudinary } from '../configCloud.js';
import multer from 'multer';
export const storageCoverImage = new CloudinaryStorage({
  cloudinary: configureCloudinary(),
  params: {
    folder: 'coverImg', // Thư mục trên Cloudinary để lưu trữ ảnh
    allowed_formats: ['jpg', 'jpeg', 'png'], // Định dạng file cho phép
  },
});

export const storagePhoto = new CloudinaryStorage({
  cloudinary: configureCloudinary(),
  params: {
    folder: 'photo', // Thư mục trên Cloudinary để lưu trữ ảnh
    allowed_formats: ['jpg', 'jpeg', 'png'], // Định dạng file cho phép
  },
});

export const uploadImg = multer({ storage: storageCoverImage });
export const uploadPhoto = multer({ storage: storagePhoto });
