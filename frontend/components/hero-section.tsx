"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bike, ShoppingBag, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery")

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
              <div className="flex space-x-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="What do you like to eat today?"
                    className="pl-10 w-full rounded-md h-12"
                  />
                </div>
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-md h-12 px-6">
                  <Search className="w-5 h-5 mr-2 sm:hidden" />
                  <span className="hidden sm:inline">Find Meal</span>
                </Button>
              </div>
            </div>
          </div>
          <Image
            src="/placeholder.svg?width=600&height=500"
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
