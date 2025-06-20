import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Check if Cloudinary credentials are provided
const checkCloudinaryConfig = () => {
  const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing Cloudinary configuration:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\n📝 Please add these to your .env file:');
    console.error('   CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.error('   CLOUDINARY_API_KEY=your_api_key');
    console.error('   CLOUDINARY_API_SECRET=your_api_secret');
    console.error('\n🔗 Get your credentials at: https://cloudinary.com/console');
    return false;
  }
  return true;
};

// Configure Cloudinary
if (checkCloudinaryConfig()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Upload image buffer to Cloudinary
export const uploadToCloudinary = async (buffer: Buffer, folder: string = 'foodwagen'): Promise<string> => {
  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary is not configured. Please check your .env file.');
  }
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(new Error('Failed to upload image'));
        } else if (result) {
          resolve(result.secure_url);
        }
      }
    );
    
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

export default cloudinary; 