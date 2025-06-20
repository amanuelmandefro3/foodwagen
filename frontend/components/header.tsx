"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { AddMealModal } from "./add-meal-modal"

export function SiteHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Menu className="h-7 w-7 text-brand-orange" />
            <span className="font-bold text-2xl text-brand-orange">FoodWagen</span>
          </Link>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-md"
          >
            Add Meal
          </Button>
        </div>
      </header>
      
      <AddMealModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  )
}
