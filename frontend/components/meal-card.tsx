import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, MoreVertical, Ticket, Edit3, Trash2 } from "lucide-react"

interface MealCardProps {
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
  onEdit?: (mealData: MealCardProps) => void
  onDelete?: (mealId: string, mealName: string) => void
}

export function MealCard({
  id,
  name,
  price,
  rating,
  status,
  imageUrl,
  restaurant,
  showAdminControls = false,
  onEdit,
  onDelete,
}: MealCardProps) {
  const statusColor = status === "Open" ? "brand-open" : "brand-closed"

  const handleEdit = () => {
    if (onEdit) {
      onEdit({
        id,
        name,
        price,
        rating,
        status,
        imageUrl,
        restaurant,
        showAdminControls
      })
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id, name)
    }
  }

  return (
    <Card className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={400}
          height={250}
          className="object-cover w-full aspect-[16/10]"
        />
        <div className="absolute top-3 left-3 bg-brand-orange text-white px-3 py-1.5 rounded-md text-sm font-semibold flex items-center shadow-md">
          <Ticket className="w-4 h-4 mr-1.5" />${price}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={restaurant.logoUrl || "/placeholder.svg"} alt={restaurant.name} />
              <AvatarFallback>{restaurant.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-gray-800 truncate" title={name}>
              {name}
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-1 mb-3">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600 font-medium">{rating.toFixed(1)}</span>
        </div>
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
            ${status === "Open" ? "bg-brand-open-bg text-brand-open-text" : "bg-brand-closed-bg text-brand-closed-text"}`}
        >
          {status}
        </div>
      </CardContent>
    </Card>
  )
}
