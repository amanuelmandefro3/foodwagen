import { useEffect, useCallback } from 'react'
import { useMealsStore } from '@/lib/store'

/**
 * Custom hook for managing meals data
 * Provides all meals-related state and actions in a single hook
 */
export function useMeals() {
  const meals = useMealsStore((state) => state.meals)
  const loading = useMealsStore((state) => state.loading)
  const error = useMealsStore((state) => state.error)
  const creating = useMealsStore((state) => state.creating)
  const createError = useMealsStore((state) => state.createError)
  const updating = useMealsStore((state) => state.updating)
  const updateError = useMealsStore((state) => state.updateError)
  const deleting = useMealsStore((state) => state.deleting)
  const deleteError = useMealsStore((state) => state.deleteError)
  const fetchMeals = useMealsStore((state) => state.fetchMeals)
  const createMeal = useMealsStore((state) => state.createMeal)
  const updateMealById = useMealsStore((state) => state.updateMealById)
  const deleteMealById = useMealsStore((state) => state.deleteMealById)
  const addMeal = useMealsStore((state) => state.addMeal)
  const updateMeal = useMealsStore((state) => state.updateMeal)
  const deleteMeal = useMealsStore((state) => state.deleteMeal)
  const clearError = useMealsStore((state) => state.clearError)
  const clearCreateError = useMealsStore((state) => state.clearCreateError)
  const clearUpdateError = useMealsStore((state) => state.clearUpdateError)
  const clearDeleteError = useMealsStore((state) => state.clearDeleteError)

  // Retry function that clears error and refetches
  const retry = () => {
    clearError()
    fetchMeals()
  }

  return {
    // State
    meals,
    loading,
    error,
    creating,
    createError,
    updating,
    updateError,
    deleting,
    deleteError,
    isEmpty: meals.length === 0 && !loading && !error,
    
    // Actions
    fetchMeals,
    createMeal,
    updateMealById,
    deleteMealById,
    addMeal,
    updateMeal,
    deleteMeal,
    clearError,
    clearCreateError,
    clearUpdateError,
    clearDeleteError,
    retry,
  }
}

/**
 * Hook that automatically fetches meals on mount
 * Now also handles search mode - returns search results when searching
 * Useful for components that need meals data immediately
 */
export function useMealsWithAutoFetch() {
  const mealsData = useMeals()
  
  // Get search-related state
  const searchResults = useMealsStore((state) => state.searchResults)
  const searching = useMealsStore((state) => state.searching)
  const searchError = useMealsStore((state) => state.searchError)
  const isSearchMode = useMealsStore((state) => state.isSearchMode)
  const searchQuery = useMealsStore((state) => state.searchQuery)
  const clearSearchError = useMealsStore((state) => state.clearSearchError)
  
  useEffect(() => {
    if (mealsData.meals.length === 0 && !mealsData.loading && !mealsData.error) {
      mealsData.fetchMeals()
    }
  }, [mealsData.fetchMeals, mealsData.meals.length, mealsData.loading, mealsData.error])
  
  // Enhanced retry function that clears both regular and search errors
  const retry = useCallback(() => {
    mealsData.clearError()
    clearSearchError()
    if (isSearchMode) {
      // If we're in search mode, we should exit search mode and show all meals
      useMealsStore.getState().clearSearch()
    } else {
      mealsData.fetchMeals()
    }
  }, [mealsData.clearError, mealsData.fetchMeals, clearSearchError, isSearchMode])

  // Return appropriate data based on search mode
  const displayMeals = isSearchMode ? searchResults : mealsData.meals
  const displayLoading = isSearchMode ? searching : mealsData.loading
  const displayError = isSearchMode ? searchError : mealsData.error
  
  return {
    ...mealsData,
    meals: displayMeals,
    loading: displayLoading,
    error: displayError,
    retry,
    // Search-specific data
    isSearchMode,
    searchQuery,
  }
}

/**
 * Hook for search functionality
 * Provides search-related state and actions
 */
export function useSearch() {
  const searchMeals = useMealsStore((state) => state.searchMeals)
  const clearSearch = useMealsStore((state) => state.clearSearch)
  const setSearchQuery = useMealsStore((state) => state.setSearchQuery)
  const searchQuery = useMealsStore((state) => state.searchQuery)
  const searching = useMealsStore((state) => state.searching)
  const searchError = useMealsStore((state) => state.searchError)
  const isSearchMode = useMealsStore((state) => state.isSearchMode)
  const searchResults = useMealsStore((state) => state.searchResults)
  const clearSearchError = useMealsStore((state) => state.clearSearchError)

  const handleSearch = useCallback((query: string) => {
    searchMeals(query)
  }, [searchMeals])

  const handleClearSearch = useCallback(() => {
    clearSearch()
  }, [clearSearch])

  return {
    searchQuery,
    searching,
    searchError,
    isSearchMode,
    searchResults,
    searchMeals: handleSearch,
    clearSearch: handleClearSearch,
    setSearchQuery,
    clearSearchError
  }
} 