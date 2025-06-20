import axios from 'axios'
import type { FoodsApiResponse, FoodItem, MealData, CreateFoodData, UpdateFoodData } from './types'
import { config } from './config'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Transform backend data to frontend format
export const transformFoodItemToMealData = (foodItem: FoodItem): MealData => ({
  id: foodItem._id,
  name: foodItem.food_name,
  price: foodItem.food_price.toFixed(2),
  rating: foodItem.food_rating,
  status: foodItem.restaurant_status === "Open Now" ? "Open" : "Closed",
  imageUrl: foodItem.food_image,
  restaurant: {
    name: foodItem.restaurant_name,
    logoUrl: foodItem.restaurant_logo,
  },
})

// API service functions
export const foodsApi = {
  // Fetch all foods
  async getFoods(): Promise<MealData[]> {
    try {
      const response = await api.get<FoodsApiResponse>(config.endpoints.foods)
      return response.data.map(transformFoodItemToMealData)
    } catch (error) {
      console.error('Failed to fetch foods:', error)
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else if (error.response && error.response.status === 404) {
          throw new Error('Meals not found.')
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please check your connection.')
        }
      }
      throw new Error('Failed to fetch meals. Please try again later.')
    }
  },

  // Get food by ID
  async getFoodById(id: string): Promise<MealData> {
    try {
      const response = await api.get<FoodItem>(config.endpoints.foodById(id))
      return transformFoodItemToMealData(response.data)
    } catch (error) {
      console.error('Failed to fetch food by ID:', error)
      throw new Error('Failed to fetch meal details.')
    }
  },

  // Create new food item
  async createFood(data: CreateFoodData): Promise<MealData> {
    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('food_name', data.food_name)
      formData.append('food_price', data.food_price.toString())
      formData.append('food_rating', data.food_rating.toString())
      formData.append('food_image', data.food_image)
      formData.append('restaurant_name', data.restaurant_name)
      formData.append('restaurant_logo', data.restaurant_logo)
      formData.append('restaurant_status', data.restaurant_status)

      const response = await api.post<FoodItem>(config.endpoints.createFood, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // Increase timeout for file uploads
      })

      return transformFoodItemToMealData(response.data)
    } catch (error) {
      console.error('Failed to create food:', error)
      
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          throw new Error('Invalid data provided. Please check your inputs.')
        } else if (error.response && error.response.status === 413) {
          throw new Error('Files are too large. Please use smaller images.')
        } else if (error.response && error.response.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Upload timed out. Please try again or use smaller images.')
        }
      }
      
      throw new Error('Failed to create meal. Please try again.')
    }
  },

  // Update existing food item
  async updateFood(id: string, data: UpdateFoodData): Promise<MealData> {
    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('food_name', data.food_name)
      formData.append('food_price', data.food_price.toString())
      formData.append('food_rating', data.food_rating.toString())
      
      // Handle food_image - can be File or existing URL
      if (data.food_image instanceof File) {
        formData.append('food_image', data.food_image)
      } else if (typeof data.food_image === 'string') {
        // Keep existing image, backend should handle this
        formData.append('food_image', data.food_image)
      }
      
      formData.append('restaurant_name', data.restaurant_name)
      
      // Handle restaurant_logo - can be File or existing URL
      if (data.restaurant_logo instanceof File) {
        formData.append('restaurant_logo', data.restaurant_logo)
      } else if (typeof data.restaurant_logo === 'string') {
        // Keep existing logo, backend should handle this
        formData.append('restaurant_logo', data.restaurant_logo)
      }
      
      formData.append('restaurant_status', data.restaurant_status)

      const response = await api.put<FoodItem>(config.endpoints.updateFood(id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // Increase timeout for file uploads
      })

      return transformFoodItemToMealData(response.data)
    } catch (error) {
      console.error('Failed to update food:', error)
      
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          throw new Error('Invalid data provided. Please check your inputs.')
        } else if (error.response && error.response.status === 404) {
          throw new Error('Meal not found.')
        } else if (error.response && error.response.status === 413) {
          throw new Error('Files are too large. Please use smaller images.')
        } else if (error.response && error.response.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Upload timed out. Please try again or use smaller images.')
        }
      }
      
      throw new Error('Failed to update meal. Please try again.')
    }
  },

  // Delete food item
  async deleteFood(id: string): Promise<void> {
    try {
      await api.delete(config.endpoints.deleteFood(id))
    } catch (error) {
      console.error('Failed to delete food:', error)
      
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          throw new Error('Meal not found.')
        } else if (error.response && error.response.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please try again.')
        }
      }
      
      throw new Error('Failed to delete meal. Please try again.')
    }
  },

  // Search foods by name
  async searchFoods(query: string): Promise<MealData[]> {
    try {
      if (!query.trim()) {
        return []
      }
      
      const response = await api.get<FoodsApiResponse>(config.endpoints.searchFoods(query))
      return response.data.map(transformFoodItemToMealData)
    } catch (error) {
      console.error('Failed to search foods:', error)
      
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else if (error.response && error.response.status === 404) {
          // No results found is not an error, return empty array
          return []
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Search timed out. Please try again.')
        }
      }
      
      throw new Error('Failed to search meals. Please try again.')
    }
  }
}

export default api 