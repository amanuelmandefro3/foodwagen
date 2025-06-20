// Backend API response types
export interface FoodItem {
  _id: string
  food_name: string
  food_price: number
  food_rating: number
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: "Open Now" | "Closed"
  createdAt: string
  updatedAt: string
  __v: number
}

// Frontend component types (transformed from backend)
export interface MealData {
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
  showAdminControls?: boolean
}

// API response type
export type FoodsApiResponse = FoodItem[]

// Form data for creating new food
export interface CreateFoodData {
  food_name: string
  food_price: number
  food_rating: number
  food_image: File
  restaurant_name: string
  restaurant_logo: File
  restaurant_status: "Open Now" | "Closed"
}

// Form data for updating existing food
export interface UpdateFoodData {
  food_name: string
  food_price: number
  food_rating: number
  food_image?: File | string // Can be File for new upload or string for existing URL
  restaurant_name: string
  restaurant_logo?: File | string // Can be File for new upload or string for existing URL
  restaurant_status: "Open Now" | "Closed"
}

// Store state types
export interface MealsStore {
  meals: MealData[]
  loading: boolean
  error: string | null
  creating: boolean
  createError: string | null
  updating: boolean
  updateError: string | null
  deleting: boolean
  deleteError: string | null
  searchQuery: string
  searchResults: MealData[]
  searching: boolean
  searchError: string | null
  isSearchMode: boolean
  fetchMeals: () => Promise<void>
  searchMeals: (query: string) => Promise<void>
  clearSearch: () => void
  setSearchQuery: (query: string) => void
  createMeal: (data: CreateFoodData) => Promise<void>
  updateMealById: (id: string, data: UpdateFoodData) => Promise<void>
  deleteMealById: (id: string) => Promise<void>
  addMeal: (meal: MealData) => void
  updateMeal: (id: string, meal: Partial<MealData>) => void
  deleteMeal: (id: string) => void
  clearError: () => void
  clearCreateError: () => void
  clearUpdateError: () => void
  clearDeleteError: () => void
  clearSearchError: () => void
} 