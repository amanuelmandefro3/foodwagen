"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MealData {
  id: string
  name: string
  price: string
  rating: number
  status: "Open" | "Closed"
  imageUrl: string
  restaurant: {
    name: string
    logoUrl: string
  }
}

interface EditMealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mealData?: MealData
}

interface FormData {
  food_name: string
  food_rating: string
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: string
}

interface FormErrors {
  food_name?: string
  food_rating?: string
  food_image?: string
  restaurant_name?: string
  restaurant_logo?: string
  restaurant_status?: string
}

export function EditMealModal({ open, onOpenChange, mealData }: EditMealModalProps) {
  const [formData, setFormData] = useState<FormData>({
    food_name: "",
    food_rating: "",
    food_image: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // Pre-fill form data when mealData changes
  useEffect(() => {
    if (mealData) {
      setFormData({
        food_name: mealData.name,
        food_rating: mealData.rating.toString(),
        food_image: mealData.imageUrl,
        restaurant_name: mealData.restaurant.name,
        restaurant_logo: mealData.restaurant.logoUrl,
        restaurant_status: mealData.status === "Open" ? "Open Now" : "Closed"
      })
    }
  }, [mealData])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food name is required"
    }

    if (!formData.food_rating.trim()) {
      newErrors.food_rating = "Food rating is required"
    } else {
      const rating = parseFloat(formData.food_rating)
      if (isNaN(rating) || rating < 0 || rating > 5) {
        newErrors.food_rating = "Rating must be between 0 and 5"
      }
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = "Food image URL is required"
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant name is required"
    }

    if (!formData.restaurant_logo.trim()) {
      newErrors.restaurant_logo = "Restaurant logo URL is required"
    }

    if (!formData.restaurant_status) {
      newErrors.restaurant_status = "Restaurant status is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Handle form submission here
      console.log("Form updated:", formData)
      // Reset form and close modal
      setFormData({
        food_name: "",
        food_rating: "",
        food_image: "",
        restaurant_name: "",
        restaurant_logo: "",
        restaurant_status: ""
      })
      setErrors({})
      onOpenChange(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleCancel = () => {
    // Reset to original data
    if (mealData) {
      setFormData({
        food_name: mealData.name,
        food_rating: mealData.rating.toString(),
        food_image: mealData.imageUrl,
        restaurant_name: mealData.restaurant.name,
        restaurant_logo: mealData.restaurant.logoUrl,
        restaurant_status: mealData.status === "Open" ? "Open Now" : "Closed"
      })
    }
    setErrors({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-0">
        <div className="p-8">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-2xl font-bold text-brand-orange">
              Edit Meal
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="food_name"
                placeholder="Food name"
                value={formData.food_name}
                onChange={(e) => handleInputChange("food_name", e.target.value)}
                className={`h-12 bg-gray-50 border-0 rounded-lg placeholder:text-gray-500 ${
                  errors.food_name ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {errors.food_name && (
                <p className="text-sm text-red-500">{errors.food_name}</p>
              )}
              <p className="text-xs text-gray-400">Food name is required</p>
            </div>

            <div className="space-y-2">
              <Input
                name="food_rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Food rating"
                value={formData.food_rating}
                onChange={(e) => handleInputChange("food_rating", e.target.value)}
                className={`h-12 bg-gray-50 border-0 rounded-lg placeholder:text-gray-500 ${
                  errors.food_rating ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {errors.food_rating && (
                <p className="text-sm text-red-500">{errors.food_rating}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="food_image"
                placeholder="Food image (link)"
                value={formData.food_image}
                onChange={(e) => handleInputChange("food_image", e.target.value)}
                className={`h-12 bg-gray-50 border-0 rounded-lg placeholder:text-gray-500 ${
                  errors.food_image ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {errors.food_image && (
                <p className="text-sm text-red-500">{errors.food_image}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="restaurant_name"
                placeholder="Restaurant name"
                value={formData.restaurant_name}
                onChange={(e) => handleInputChange("restaurant_name", e.target.value)}
                className={`h-12 bg-gray-50 border-0 rounded-lg placeholder:text-gray-500 ${
                  errors.restaurant_name ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {errors.restaurant_name && (
                <p className="text-sm text-red-500">{errors.restaurant_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="restaurant_logo"
                placeholder="Restaurant logo (link)"
                value={formData.restaurant_logo}
                onChange={(e) => handleInputChange("restaurant_logo", e.target.value)}
                className={`h-12 bg-gray-50 border-0 rounded-lg placeholder:text-gray-500 ${
                  errors.restaurant_logo ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {errors.restaurant_logo && (
                <p className="text-sm text-red-500">{errors.restaurant_logo}</p>
              )}
            </div>

            <div className="space-y-2">
              <Select
                name="restaurant_status"
                value={formData.restaurant_status}
                onValueChange={(value) => handleInputChange("restaurant_status", value)}
              >
                <SelectTrigger className={`h-12 bg-gray-50 border-0 rounded-lg ${
                  errors.restaurant_status ? 'ring-2 ring-red-500' : ''
                }`}>
                  <SelectValue placeholder="Restaurant status (open/close)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open Now">Open Now</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              {errors.restaurant_status && (
                <p className="text-sm text-red-500">{errors.restaurant_status}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 h-12 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg font-medium text-base"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-base"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
} 