import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { MealData, MealsStore, CreateFoodData, UpdateFoodData } from './types'
import { foodsApi } from './api'

export const useMealsStore = create<MealsStore>()(
  devtools(
    (set, get) => ({
      meals: [],
      loading: false,
      error: null,
      creating: false,
      createError: null,
      updating: false,
      updateError: null,
      deleting: false,
      deleteError: null,
      searchQuery: '',
      searchResults: [],
      searching: false,
      searchError: null,
      isSearchMode: false,

      fetchMeals: async () => {
        set({ loading: true, error: null })
        try {
          const meals = await foodsApi.getFoods()
          set({ meals, loading: false })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
          set({ error: errorMessage, loading: false })
        }
      },

      createMeal: async (data: CreateFoodData) => {
        set({ creating: true, createError: null })
        try {
          const newMeal = await foodsApi.createFood(data)
          set((state) => ({
            meals: [newMeal, ...state.meals], // Add to beginning of list
            creating: false,
          }))
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to create meal'
          set({ createError: errorMessage, creating: false })
          throw error // Re-throw to allow modal to handle it
        }
      },

      updateMealById: async (id: string, data: UpdateFoodData) => {
        set({ updating: true, updateError: null })
        try {
          const updatedMeal = await foodsApi.updateFood(id, data)
          set((state) => ({
            meals: state.meals.map((meal) =>
              meal.id === id ? updatedMeal : meal
            ),
            updating: false,
          }))
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update meal'
          set({ updateError: errorMessage, updating: false })
          throw error // Re-throw to allow modal to handle it
        }
      },

      deleteMealById: async (id: string) => {
        set({ deleting: true, deleteError: null })
        try {
          await foodsApi.deleteFood(id)
          set((state) => ({
            meals: state.meals.filter((meal) => meal.id !== id),
            deleting: false,
          }))
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to delete meal'
          set({ deleteError: errorMessage, deleting: false })
          throw error // Re-throw to allow modal to handle it
        }
      },

      addMeal: (meal: MealData) => {
        set((state) => ({
          meals: [...state.meals, meal],
        }))
      },

      updateMeal: (id: string, updatedMeal: Partial<MealData>) => {
        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === id ? { ...meal, ...updatedMeal } : meal
          ),
        }))
      },

      deleteMeal: (id: string) => {
        set((state) => ({
          meals: state.meals.filter((meal) => meal.id !== id),
        }))
      },

      clearError: () => {
        set({ error: null })
      },

      clearCreateError: () => {
        set({ createError: null })
      },

      clearUpdateError: () => {
        set({ updateError: null })
      },

      clearDeleteError: () => {
        set({ deleteError: null })
      },

      searchMeals: async (query: string) => {
        const trimmedQuery = query.trim()
        
        if (!trimmedQuery) {
          // Don't search with empty query, just clear search mode
          return
        }

        set({ searching: true, searchError: null, searchQuery: trimmedQuery, isSearchMode: true })
        try {
          const results = await foodsApi.searchFoods(trimmedQuery)
          set({ searchResults: results, searching: false })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to search meals'
          set({ searchError: errorMessage, searching: false })
        }
      },

      clearSearch: () => {
        set({ 
          searchQuery: '', 
          searchResults: [], 
          searching: false, 
          searchError: null, 
          isSearchMode: false 
        })
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query })
      },

      clearSearchError: () => {
        set({ searchError: null })
      },
    }),
    {
      name: 'meals-store', // name of the store for devtools
    }
  )
)

// Selector hooks for better performance (optional but recommended)
export const useMeals = () => useMealsStore((state) => state.meals)
export const useMealsLoading = () => useMealsStore((state) => state.loading)
export const useMealsError = () => useMealsStore((state) => state.error)
export const useMealsActions = () => useMealsStore((state) => ({
  fetchMeals: state.fetchMeals,
  addMeal: state.addMeal,
  updateMeal: state.updateMeal,
  deleteMeal: state.deleteMeal,
  clearError: state.clearError,
})) 