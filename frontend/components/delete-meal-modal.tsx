"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DeleteMealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mealName?: string
  onConfirmDelete?: () => void
}

export function DeleteMealModal({ open, onOpenChange, mealName, onConfirmDelete }: DeleteMealModalProps) {
  const handleConfirmDelete = () => {
    if (onConfirmDelete) {
      onConfirmDelete()
    }
    onOpenChange(false)
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

          <p className="text-gray-600 mb-8 leading-relaxed">
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </p>

          <div className="flex gap-4">
            <Button
              onClick={handleConfirmDelete}
              className="flex-1 h-12 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg font-medium text-base"
            >
              Yes
            </Button>
            <Button
              onClick={handleCancel}
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