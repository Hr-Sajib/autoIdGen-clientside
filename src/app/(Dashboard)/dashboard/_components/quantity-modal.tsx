"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CardQuantityModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (quantity: number) => void
}

export function CardQuantityModal({ isOpen, onClose, onGenerate }: CardQuantityModalProps) {
  const [quantity, setQuantity] = useState("")

  const handleGenerate = () => {
    const qty = Number.parseInt(quantity)
    if (qty > 0) {
      onGenerate(qty)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Card Quantity</h2>

        <div className="space-y-6">
          <Input
            type="number"
            placeholder="Type Card Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            autoFocus
          />

          <Button
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            disabled={!quantity || Number.parseInt(quantity) <= 0}
          >
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            Generate
          </Button>
        </div>
      </div>
    </div>
  )
}
