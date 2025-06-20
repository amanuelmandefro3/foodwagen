import { Request, Response } from 'express';
import Food from '../models/Food';
import { foodSchema } from '../validations/food.schema';
import mongoose from 'mongoose';
import { uploadToCloudinary } from '../config/cloudinary';

// GET /api/foods or GET /api/foods?name=searchTerm
export const getAllFoods = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.query;
    
    let query = {};
    if (name && typeof name === 'string') {
      // If name query parameter exists, search for it
      query = { food_name: new RegExp(name, 'i') };
    }
    
    const foods = await Food.find(query);
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food items', error });
  }
};

// GET /api/foods/search?name=burger (kept for backward compatibility)
export const searchFoods = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.query.name as string;
    if (!name) {
      res.status(400).json({ message: 'Name query is required' });
      return;
    }

    const foods = await Food.find({ food_name: new RegExp(name, 'i') });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search food items', error });
  }
};

// Interface for Multer files
interface MulterFiles {
  food_image?: Express.Multer.File[];
  restaurant_logo?: Express.Multer.File[];
}

// POST /api/foods
export const addFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as MulterFiles;
    
    // Prepare data for validation
    const foodData = { ...req.body };
    
    // If files are uploaded, we'll upload them to Cloudinary
    if (files?.food_image?.[0] || files?.restaurant_logo?.[0]) {
      // Upload food image if provided
      if (files.food_image?.[0]) {
        foodData.food_image = await uploadToCloudinary(files.food_image[0].buffer, 'foodwagen/foods');
      }
      
      // Upload restaurant logo if provided
      if (files.restaurant_logo?.[0]) {
        foodData.restaurant_logo = await uploadToCloudinary(files.restaurant_logo[0].buffer, 'foodwagen/restaurants');
      }
    }
    
    // Validate the complete data
    const parsed = foodSchema.safeParse(foodData);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.errors });
      return;
    }

    const food = new Food(parsed.data);
    await food.save();
    res.status(201).json(food);
  } catch (error) {
    console.error('Error in addFood:', error);
    res.status(500).json({ message: 'Failed to add food item', error });
  }
};

// PUT /api/foods/:id
export const updateFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid food ID' });
      return;
    }

    const files = req.files as MulterFiles;
    
    // Prepare update data
    const updateData = { ...req.body };
    
    // Upload new images if provided
    if (files?.food_image?.[0] || files?.restaurant_logo?.[0]) {
      if (files.food_image?.[0]) {
        updateData.food_image = await uploadToCloudinary(files.food_image[0].buffer, 'foodwagen/foods');
      }
      
      if (files.restaurant_logo?.[0]) {
        updateData.restaurant_logo = await uploadToCloudinary(files.restaurant_logo[0].buffer, 'foodwagen/restaurants');
      }
    }
    
    // For updates, we need to make fields optional if not provided
    const partialSchema = foodSchema.partial();
    const parsed = partialSchema.safeParse(updateData);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.errors });
      return;
    }

    const updated = await Food.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updated) {
      res.status(404).json({ message: 'Food item not found' });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error in updateFood:', error);
    res.status(500).json({ message: 'Failed to update food item', error });
  }
};

// DELETE /api/foods/:id
export const deleteFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid food ID' });
      return;
    }

    const deleted = await Food.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: 'Food item not found' });
      return;
    }

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete food item', error });
  }
};
