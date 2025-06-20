"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MealCard } from "./meal-card"
import { EditMealModal } from "./edit-meal-modal"
import { DeleteMealModal } from "./delete-meal-modal"
import { ChevronRight } from "lucide-react"

const mealsData = [
  {
    id: "1",
    name: "Bow Lasagna",
    price: "2.99",
    rating: 4.6,
    status: "Closed" as "Closed" | "Open",
    imageUrl: "/placeholder.svg?width=400&height=250&seed=lasagna",
    restaurant: { name: "Friendly's", logoUrl: "/placeholder.svg?width=40&height=40&seed=friendlys" },
  },
  {
    id: "2",
    name: "Mixed Avocado Sm",
    price: "5.99",
    rating: 4.0,
    status: "Closed" as "Closed" | "Open",
    imageUrl: "/placeholder.svg?width=400&height=250&seed=avocado",
    restaurant: { name: "Pizza King", logoUrl: "/placeholder.svg?width=40&height=40&seed=pizzaking" },
    showAdminControls: true,
  },
  {
    id: "3",
    name: "Pancake",
    price: "3.99",
    rating: 5.0,
    status: "Open" as "Closed" | "Open",
    imageUrl: "/placeholder.svg?width=400&height=250&seed=pancake",
    restaurant: { name: "Dunkin'", logoUrl: "/placeholder.svg?width=40&height=40&seed=dunkin" },
  },
  {
    id: "4",
    name: "Cupcake",
    price: "1.99",
    rating: 5.0,
    status: "Open" as "Closed" | "Open",
    imageUrl: "/placeholder.svg?width=400&height=250&seed=cupcake",
    restaurant: { name: "Subway", logoUrl: "/placeholder.svg?width=40&height=40&seed=subway" },
  },
  {
    id: "5",
    name: "Creamy Stake",
    price: "12.99",
    rating: 4.5,
    status: "Open" as "Closed" | "Open",
    imageUrl: "/placeholder.svg?width=400&height=250&seed=stake1",
    restaurant: { name: "Ruby Tuesday", logoUrl: "/placeholder.svg?width=40&height=40&seed=ruby" },
  },
  {
    id: "6",
    name: "Stake with Potatos",
    price: "15.99",
    rating: 5.0,
    status: "Open" as "Closed" | "Open",
    imageUrl: "/placeholder.svg?width=400&height=250&seed=stake2",
    restaurant: { name: "KFC", logoUrl: "/placeholder.svg?width=40&height=40&seed=kfc" },
  },
  {
    id: "7",
    name: "Indian Spicy Soup",
    price: "9.99",
    rating: 4.5,
    status: "Open" as "Closed" | "Open",
    imageUrl: "/placeholder.svg?width=400&height=250&seed=soup",
    restaurant: { name: "Royal Signature", logoUrl: "/placeholder.svg?width=40&height=40&seed=royal" },
  },
  {
    id: "8",
    name: "Stake Omlet",
    price: "11.99",
    rating: 4.9,
    status: "Open" as "Closed" | "Open",
    imageUrl: "/placeholder.svg?width=400&height=250&seed=omlet",
    restaurant: { name: "Taco Bell", logoUrl: "/placeholder.svg?width=40&height=40&seed=taco" },
  },
]

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

export function FeaturedMeals() {
  const [meals, setMeals] = useState(mealsData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<MealData | undefined>()
  const [mealToDelete, setMealToDelete] = useState<{id: string, name: string} | undefined>()

  const handleEdit = (mealData: any) => {
    setSelectedMeal(mealData)
    setIsEditModalOpen(true)
  }

  const handleDelete = (mealId: string, mealName: string) => {
    setMealToDelete({ id: mealId, name: mealName })
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (mealToDelete) {
      // Remove the meal from the list
      setMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealToDelete.id))
      console.log(`Deleted meal: ${mealToDelete.name} (ID: ${mealToDelete.id})`)
    }
    setMealToDelete(undefined)
  }

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-7xl px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10 md:mb-16">Featured Meals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {meals.map((meal) => (
              <MealCard 
                key={meal.id} 
                {...meal} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <div className="mt-12 md:mt-16 text-center">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-md px-8 py-3 text-base"
            >
              Load more <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <EditMealModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen}
        mealData={selectedMeal}
      />

      <DeleteMealModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        mealName={mealToDelete?.name}
        onConfirmDelete={confirmDelete}
      />
    </>
  )
}
