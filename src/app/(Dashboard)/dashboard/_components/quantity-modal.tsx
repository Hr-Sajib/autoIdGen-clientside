// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// interface CardQuantityModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onGenerate: (quantity: number) => void
// }

// export function CardQuantityModal({ isOpen, onClose, onGenerate }: CardQuantityModalProps) {
//   const [quantity, setQuantity] = useState("")

//   const handleGenerate = () => {
//     const qty = Number.parseInt(quantity)
//     if (qty > 0) {
//       onGenerate(qty)
//       onClose()
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
//         <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Card Quantity</h2>

//         <div className="space-y-6">
//           <Input
//             type="number"
//             placeholder="Type Card Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             autoFocus
//           />

//           <Button
//             onClick={handleGenerate}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
//             disabled={!quantity || Number.parseInt(quantity) <= 0}
//           >
//             <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center mr-2">
//               <span className="text-white text-xs font-bold">R</span>
//             </div>
//             Generate
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface CardQuantityModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (quantity: number) => void
}

export function CardQuantityModal({ isOpen, onClose, onGenerate }: CardQuantityModalProps) {
  const [quantity, setQuantity] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (quantity.trim()) {
      onGenerate(Number.parseInt(quantity.trim()))
      setQuantity("")
      onClose()
      router.push('/dashboard/select-card')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      {/* Modal container */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Card Quantity
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              type="number"
              placeholder="Type Card Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full h-11"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition disabled:opacity-50"
            disabled={!quantity || Number.parseInt(quantity) <= 0}
            onClick={handleSubmit}
          >
            Generate
          </Button>
        </form>
      </div>
    </div>
  )
}
