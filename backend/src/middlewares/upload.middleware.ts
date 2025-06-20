import multer from 'multer';
import { Request } from 'express';

// Define allowed file types
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Configure multer for memory storage (we'll upload to Cloudinary from buffer)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'));
  }
};

// Create multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Export specific upload configurations
export const uploadFoodImages = upload.fields([
  { name: 'food_image', maxCount: 1 },
  { name: 'restaurant_logo', maxCount: 1 }
]);

export const uploadSingleImage = upload.single('image'); 