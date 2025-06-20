// API Configuration
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://foodwagen.onrender.com/api',
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
    retryAttempts: Number(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS) || 3,
    retryDelay: Number(process.env.NEXT_PUBLIC_API_RETRY_DELAY) || 1000,
  },
  
  app: {
    name: 'FoodWagen',
    version: '1.0.0',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },

  endpoints: {
    foods: '/foods',
    foodById: (id: string) => `/foods/${id}`,
    createFood: '/foods',
    updateFood: (id: string) => `/foods/${id}`,
    deleteFood: (id: string) => `/foods/${id}`,
    searchFoods: (query: string) => `/foods/search?name=${encodeURIComponent(query)}`,
    // Add more endpoints as needed
  }
} as const

// Type for the config
export type Config = typeof config 