"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bike, ShoppingBag, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearch } from "@/hooks/use-meals"
import { toast } from "sonner"

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery")
  const [searchInput, setSearchInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { 
    searchMeals, 
    clearSearch, 
    searchQuery, 
    searching, 
    searchError, 
    isSearchMode,
    clearSearchError
  } = useSearch()

  // Only sync search input with store query when store query changes
  // This prevents overwriting user input while typing
  useEffect(() => {
    // Only update if searchQuery has actually changed from external source
    // (e.g., when clearing search from elsewhere)
    if (searchQuery !== searchInput && !document.activeElement?.isSameNode(inputRef.current)) {
      setSearchInput(searchQuery)
    }
  }, [searchQuery])

  // Show error toast if search fails
  useEffect(() => {
    if (searchError) {
      toast.error(searchError)
      clearSearchError()
    }
  }, [searchError, clearSearchError])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchInput.trim()
    
    if (!query) {
      // Don't clear search, just don't search
      return
    }
    
    searchMeals(query)
  }

  const handleClearSearch = () => {
    setSearchInput("")
    clearSearch()
    // Focus back on input after clearing
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return (
    <section className="w-full py-12 md:py-20 lg:py-28 bg-brand-yellow">
      <div className="container max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Are you starving?
            </h1>
            <p className="max-w-[600px] text-white/90 md:text-xl">
              Within a few clicks, find meals that are accessible near you
            </p>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-lg">
              <div className="flex mb-4">
                <Button
                  variant="ghost"
                  className={cn(
                    "flex-1 justify-center rounded-md mr-2 py-3",
                    activeTab === "delivery"
                      ? "bg-brand-orange text-white hover:bg-brand-orange/90"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700",
                  )}
                  onClick={() => setActiveTab("delivery")}
                >
                  <Bike className="w-5 h-5 mr-2" /> Delivery
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex-1 justify-center rounded-md ml-2 py-3",
                    activeTab === "pickup"
                      ? "bg-brand-orange text-white hover:bg-brand-orange/90"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700",
                  )}
                  onClick={() => setActiveTab("pickup")}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" /> Pickup
                </Button>
              </div>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="What do you like to eat today?"
                    className="pl-10 pr-10 w-full rounded-md h-12"
                    value={searchInput}
                    onChange={handleInputChange}
                  />
                  {isSearchMode && searchInput && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-md h-12 px-6"
                  disabled={searching}
                >
                  {searching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      <span className="hidden sm:inline">Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2 sm:hidden" />
                      <span className="hidden sm:inline">Find Meal</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
          <Image
            src="/hero-image.jpg"
            alt="Bowl of noodles"
            width={600}
            height={500}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  )
}
