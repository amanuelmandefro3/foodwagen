import { z } from 'zod';

// Helper to convert string to number (for form-data)
const numberString = z.string().transform((val) => {
  const parsed = parseFloat(val);
  if (isNaN(parsed)) {
    throw new Error("Invalid number");
  }
  return parsed;
});

export const foodSchema = z.object({
  food_name: z.string().min(1, "Food name is required"),
  food_price: z.union([z.number(), numberString]).refine(val => val > 0, "Price must be positive"),
  food_rating: z.union([z.number(), numberString]).refine(val => val >= 0 && val <= 5, "Rating must be between 0 and 5"),
  food_image: z.string().url("Invalid image URL"),
  restaurant_name: z.string().min(1, "Restaurant name is required"),
  restaurant_logo: z.string().url("Invalid logo URL"),
  restaurant_status: z.enum(["Open Now", "Closed"]),
});
