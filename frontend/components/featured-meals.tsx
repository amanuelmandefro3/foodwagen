"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MealCard } from "./meal-card"
import { EditMealModal } from "./edit-meal-modal"
import { DeleteMealModal } from "./delete-meal-modal"
import { AddMealModal } from "./add-meal-modal"
import { MealSkeleton } from "./meal-skeleton"
import { ErrorMessage } from "./error-message"
import { ChevronRight, RefreshCw, Plus, X } from "lucide-react"
import { useMealsWithAutoFetch } from "@/hooks/use-meals"
import { useSearch } from "@/hooks/use-meals"
import type { MealData } from "@/lib/types"

export function FeaturedMeals() {
  // Custom hook with auto-fetch
  const { meals, loading, error, deleteMeal, retry, isSearchMode, searchQuery } = useMealsWithAutoFetch()
  
  // Search hook for clear functionality
  const { clearSearch } = useSearch()

  // Local state for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<MealData | undefined>()
  const [mealToDelete, setMealToDelete] = useState<{id: string, name: string} | undefined>()

  const handleEdit = (mealData: MealData) => {
    setSelectedMeal(mealData)
    setIsEditModalOpen(true)
  }

  const handleDelete = (mealId: string, mealName: string) => {
    setMealToDelete({ id: mealId, name: mealName })
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    // This function is no longer needed since delete modal handles API call
    setMealToDelete(undefined)
  }

  const handleRetry = () => {
    retry()
  }

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-7xl px-4 md:px-6">
          <div className="flex justify-between items-center mb-10 md:mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                {isSearchMode ? `Search Results` : 'Featured Meals'}
              </h2>
              {isSearchMode && searchQuery && (
                <p className="text-gray-600 mt-2">
                  {loading ? 'Searching for' : 'Results for'} "{searchQuery}"
                </p>
              )}
            </div>
            <div className="flex gap-3">
              {isSearchMode && (
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="rounded-lg px-6 py-2 font-medium"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Search
                </Button>
              )}
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg px-6 py-2 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Meal
              </Button>
            </div>
          </div>
          
          {/* Error State */}
          {error && (
            <div className="mb-8">
              <ErrorMessage 
                message={error} 
                onRetry={handleRetry}
              />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <MealSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Success State */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {meals.length > 0 ? (
                  meals.map((meal) => (
                    <MealCard 
                      key={meal.id} 
                      {...meal} 
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {isSearchMode 
                        ? `No meals found matching "${searchQuery}". Try a different search term.`
                        : 'No meals available at the moment.'
                      }
                    </p>
                    <Button 
                      onClick={handleRetry}
                      className="mt-4"
                      variant="outline"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {isSearchMode ? 'Clear Search' : 'Refresh'}
                    </Button>
                  </div>
                )}
              </div>
              
              {meals.length > 0 && !isSearchMode && (
                <div className="mt-12 md:mt-16 text-center">
                  <Button
                    size="lg"
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-md px-8 py-3 text-base"
                    disabled={loading}
                  >
                    Load more <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <AddMealModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />

      <EditMealModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen}
        mealData={selectedMeal}
      />

      <DeleteMealModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        mealId={mealToDelete?.id}
        mealName={mealToDelete?.name}
      />
    </>
  )
}
