import { z } from "zod"

// Validation schema for creating a new food item
export const createFoodSchema = z.object({
  food_name: z
    .string()
    .min(1, "Food name is required")
    .min(2, "Food name must be at least 2 characters")
    .max(100, "Food name must be less than 100 characters")
    .trim(),

  food_price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(999.99, "Price must be less than $1000")
    .refine((val) => Number((val).toFixed(2)) === val, {
      message: "Price can have at most 2 decimal places"
    }),

  food_rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .refine((val) => Number((val * 10).toFixed(0)) / 10 === val, {
      message: "Rating can have at most 1 decimal place"
    }),

  food_image: z
    .instanceof(File, { message: "Food image is required" })
    .refine((file) => file.size > 0, "Food image is required")
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG and WebP images are allowed"
    ),

  restaurant_name: z
    .string()
    .min(1, "Restaurant name is required")
    .min(2, "Restaurant name must be at least 2 characters")
    .max(100, "Restaurant name must be less than 100 characters")
    .trim(),

  restaurant_logo: z
    .instanceof(File, { message: "Restaurant logo is required" })
    .refine((file) => file.size > 0, "Restaurant logo is required")
    .refine((file) => file.size <= 2 * 1024 * 1024, "Logo must be less than 2MB")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG and WebP images are allowed"
    ),

  restaurant_status: z.enum(["Open Now", "Closed"], {
    required_error: "Restaurant status is required",
    invalid_type_error: "Please select a valid status"
  })
})

export type CreateFoodFormData = z.infer<typeof createFoodSchema>

// Validation schema for updating a food item (images are optional)
export const updateFoodSchema = z.object({
  food_name: z
    .string()
    .min(1, "Food name is required")
    .min(2, "Food name must be at least 2 characters")
    .max(100, "Food name must be less than 100 characters")
    .trim(),

  food_price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(999.99, "Price must be less than $1000")
    .refine((val) => Number((val).toFixed(2)) === val, {
      message: "Price can have at most 2 decimal places"
    }),

  food_rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .refine((val) => Number((val * 10).toFixed(0)) / 10 === val, {
      message: "Rating can have at most 1 decimal place"
    }),

  food_image: z
    .union([
      z.instanceof(File).refine((file) => file.size > 0, "Food image is required")
        .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
        .refine(
          (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
          "Only JPEG, PNG and WebP images are allowed"
        ),
      z.string().url("Invalid image URL")
    ])
    .optional(),

  restaurant_name: z
    .string()
    .min(1, "Restaurant name is required")
    .min(2, "Restaurant name must be at least 2 characters")
    .max(100, "Restaurant name must be less than 100 characters")
    .trim(),

  restaurant_logo: z
    .union([
      z.instanceof(File).refine((file) => file.size > 0, "Restaurant logo is required")
        .refine((file) => file.size <= 2 * 1024 * 1024, "Logo must be less than 2MB")
        .refine(
          (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
          "Only JPEG, PNG and WebP images are allowed"
        ),
      z.string().url("Invalid logo URL")
    ])
    .optional(),

  restaurant_status: z.enum(["Open Now", "Closed"], {
    required_error: "Restaurant status is required",
    invalid_type_error: "Please select a valid status"
  })
})

export type UpdateFoodFormData = z.infer<typeof updateFoodSchema>

// Helper function to validate form data
export function validateCreateFoodForm(data: unknown) {
  return createFoodSchema.safeParse(data)
}

export function validateUpdateFoodForm(data: unknown) {
  return updateFoodSchema.safeParse(data)
} 