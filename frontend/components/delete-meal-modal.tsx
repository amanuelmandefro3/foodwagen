"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { useMeals } from "@/hooks/use-meals"
import { toast } from "sonner"

interface DeleteMealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mealId?: string
  mealName?: string
}

export function DeleteMealModal({ open, onOpenChange, mealId, mealName }: DeleteMealModalProps) {
  const { deleteMealById, deleting, deleteError } = useMeals()

  const handleConfirmDelete = async () => {
    if (!mealId) return
    
    try {
      await deleteMealById(mealId)
      toast.success("Meal deleted successfully!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to delete meal. Please try again.")
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-white rounded-2xl p-0">
        <div className="p-8 text-center">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-brand-orange">
              Delete Meal
            </DialogTitle>
          </DialogHeader>

          {deleteError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{deleteError}</p>
            </div>
          )}

          <p className="text-gray-600 mb-8 leading-relaxed">
            Are you sure you want to delete "{mealName}"? This action cannot be reversed.
          </p>

          <div className="flex gap-4">
            <Button
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="flex-1 h-12 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg font-medium text-base"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
            <Button
              onClick={handleCancel}
              disabled={deleting}
              variant="outline"
              className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-base"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 