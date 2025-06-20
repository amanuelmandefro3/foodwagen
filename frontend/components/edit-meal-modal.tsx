"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, Loader2, X, ImageIcon } from "lucide-react"
import { useMeals } from "@/hooks/use-meals"
import { updateFoodSchema, type UpdateFoodFormData } from "@/lib/validations"
import { toast } from "sonner"
import type { MealData } from "@/lib/types"

interface EditMealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mealData?: MealData
}

interface FormData {
  food_name: string
  food_price: string
  food_rating: string
  food_image: File | string | null
  restaurant_name: string
  restaurant_logo: File | string | null
  restaurant_status: "Open Now" | "Closed" | ""
}

interface FormErrors {
  food_name?: string
  food_price?: string
  food_rating?: string
  food_image?: string
  restaurant_name?: string
  restaurant_logo?: string
  restaurant_status?: string
}

export function EditMealModal({ open, onOpenChange, mealData }: EditMealModalProps) {
  const { updateMealById, updating, updateError, clearUpdateError } = useMeals()
  const foodImageRef = useRef<HTMLInputElement>(null)
  const logoImageRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>({
    food_name: "",
    food_price: "",
    food_rating: "",
    food_image: null,
    restaurant_name: "",
    restaurant_logo: null,
    restaurant_status: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [foodImagePreview, setFoodImagePreview] = useState<string>("")
  const [logoImagePreview, setLogoImagePreview] = useState<string>("")

  // Pre-fill form data when mealData changes
  useEffect(() => {
    if (mealData) {
      setFormData({
        food_name: mealData.name,
        food_price: parseFloat(mealData.price).toString(),
        food_rating: mealData.rating.toString(),
        food_image: mealData.imageUrl, // Keep existing URL
        restaurant_name: mealData.restaurant.name,
        restaurant_logo: mealData.restaurant.logoUrl, // Keep existing URL
        restaurant_status: mealData.status === "Open" ? "Open Now" : "Closed"
      })
      
      // Set previews to existing images
      setFoodImagePreview(mealData.imageUrl)
      setLogoImagePreview(mealData.restaurant.logoUrl)
    }
  }, [mealData])

  const resetForm = () => {
    if (mealData) {
      setFormData({
        food_name: mealData.name,
        food_price: parseFloat(mealData.price).toString(),
        food_rating: mealData.rating.toString(),
        food_image: mealData.imageUrl,
        restaurant_name: mealData.restaurant.name,
        restaurant_logo: mealData.restaurant.logoUrl,
        restaurant_status: mealData.status === "Open" ? "Open Now" : "Closed"
      })
      setFoodImagePreview(mealData.imageUrl)
      setLogoImagePreview(mealData.restaurant.logoUrl)
    }
    setErrors({})
    clearUpdateError()
  }

  const validateForm = (): UpdateFoodFormData | null => {
    setErrors({})
    clearUpdateError()

    const dataToValidate = {
      food_name: formData.food_name.trim(),
      food_price: parseFloat(formData.food_price) || 0,
      food_rating: parseFloat(formData.food_rating) || 0,
      food_image: formData.food_image,
      restaurant_name: formData.restaurant_name.trim(),
      restaurant_logo: formData.restaurant_logo,
      restaurant_status: formData.restaurant_status as "Open Now" | "Closed"
    }

    const result = updateFoodSchema.safeParse(dataToValidate)

    if (!result.success) {
      const newErrors: FormErrors = {}
      result.error.errors.forEach((error) => {
        const path = error.path[0] as keyof FormErrors
        newErrors[path] = error.message
      })
      setErrors(newErrors)
      return null
    }

    return result.data
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!mealData) return
    
    const validatedData = validateForm()
    if (!validatedData) return

    try {
      await updateMealById(mealData.id, validatedData)
      toast.success("Meal updated successfully!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to update meal. Please try again.")
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileChange = (field: 'food_image' | 'restaurant_logo', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    // Create preview
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const preview = e.target?.result as string
        if (field === 'food_image') {
          setFoodImagePreview(preview)
        } else {
          setLogoImagePreview(preview)
        }
      }
      reader.readAsDataURL(file)
    } else {
      // Reset to original image if file is removed
      if (mealData) {
        if (field === 'food_image') {
          setFoodImagePreview(mealData.imageUrl)
          setFormData(prev => ({ ...prev, food_image: mealData.imageUrl }))
        } else {
          setLogoImagePreview(mealData.restaurant.logoUrl)
          setFormData(prev => ({ ...prev, restaurant_logo: mealData.restaurant.logoUrl }))
        }
      }
    }
  }

  const handleFileClick = (field: 'food_image' | 'restaurant_logo') => {
    if (field === 'food_image') {
      foodImageRef.current?.click()
    } else {
      logoImageRef.current?.click()
    }
  }

  const handleCancel = () => {
    resetForm()
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

          {updateError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{updateError}</p>
            </div>
          )}

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
                disabled={updating}
              />
              {errors.food_name && (
                <p className="text-sm text-red-500">{errors.food_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="food_price"
                type="number"
                step="0.01"
                min="0"
                placeholder="Price ($)"
                value={formData.food_price}
                onChange={(e) => handleInputChange("food_price", e.target.value)}
                className={`h-12 bg-gray-50 border-0 rounded-lg placeholder:text-gray-500 ${
                  errors.food_price ? 'ring-2 ring-red-500' : ''
                }`}
                disabled={updating}
              />
              {errors.food_price && (
                <p className="text-sm text-red-500">{errors.food_price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="food_rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Rating (0-5)"
                value={formData.food_rating}
                onChange={(e) => handleInputChange("food_rating", e.target.value)}
                className={`h-12 bg-gray-50 border-0 rounded-lg placeholder:text-gray-500 ${
                  errors.food_rating ? 'ring-2 ring-red-500' : ''
                }`}
                disabled={updating}
              />
              {errors.food_rating && (
                <p className="text-sm text-red-500">{errors.food_rating}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Food Image</Label>
              <div 
                onClick={() => handleFileClick('food_image')}
                className={`h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  errors.food_image ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
              >
                {foodImagePreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={foodImagePreview} 
                      alt="Food preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFileChange('food_image', null)
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to change food image</p>
                    <p className="text-xs text-gray-400">PNG, JPG, WebP up to 5MB</p>
                  </div>
                )}
              </div>
              <input
                ref={foodImageRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('food_image', e.target.files?.[0] || null)}
                className="hidden"
                disabled={updating}
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
                disabled={updating}
              />
              {errors.restaurant_name && (
                <p className="text-sm text-red-500">{errors.restaurant_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Restaurant Logo</Label>
              <div 
                onClick={() => handleFileClick('restaurant_logo')}
                className={`h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  errors.restaurant_logo ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
              >
                {logoImagePreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={logoImagePreview} 
                      alt="Logo preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFileChange('restaurant_logo', null)
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to change restaurant logo</p>
                    <p className="text-xs text-gray-400">PNG, JPG, WebP up to 2MB</p>
                  </div>
                )}
              </div>
              <input
                ref={logoImageRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('restaurant_logo', e.target.files?.[0] || null)}
                className="hidden"
                disabled={updating}
              />
              {errors.restaurant_logo && (
                <p className="text-sm text-red-500">{errors.restaurant_logo}</p>
              )}
            </div>

            <div className="space-y-2">
              <Select
                value={formData.restaurant_status}
                onValueChange={(value) => handleInputChange("restaurant_status", value)}
                disabled={updating}
              >
                <SelectTrigger className={`h-12 bg-gray-50 border-0 rounded-lg ${
                  errors.restaurant_status ? 'ring-2 ring-red-500' : ''
                }`}>
                  <SelectValue placeholder="Restaurant status" />
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
                disabled={updating}
                className="flex-1 h-12 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg font-medium text-base"
              >
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Meal'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={updating}
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