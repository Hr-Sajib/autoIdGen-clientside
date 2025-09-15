"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function SelectCardPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const router = useRouter()

  const cardTypes = [
    {
      id: "student",
      title: "Student ID Card",
      image: "/images/StudentIDCard.svg",
    },
    {
      id: "employee",
      title: "Employee ID Card",
      image: "/images/EmployeeLandscape.svg",
    },
  ]

  const handleContinue = () => {
    if (selectedCard === "student") {
      router.push("/dashboard/institute-template-setup")
    } else if (selectedCard === "employee") {
      router.push("/dashboard/company-template-setup")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="font-semibold text-blue-600">AutoIDGen</span>
              </div>

              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h4"
                  />
                </svg>
                Dashboard
              </div>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Select Card</h1>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cardTypes.map((card) => (
            <Card
              key={card.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${selectedCard === card.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
              onClick={() => setSelectedCard(card.id)}
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{card.title}</h3>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    className="w-full h-64 object-contain rounded"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" className="text-blue-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
              </svg>
              Dashboard
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={selectedCard === "student" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCard("student")}
                className={selectedCard === "student" ? "bg-blue-600 text-white" : ""}
              >
                Student ID Card
              </Button>
              <Button
                variant={selectedCard === "employee" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCard("employee")}
                className={selectedCard === "employee" ? "bg-blue-600 text-white" : ""}
              >
                Employee ID Card
              </Button>
            </div>

            {selectedCard && (
              <Card className="p-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <img
                    src={cardTypes.find((c) => c.id === selectedCard)?.image || "/placeholder.svg"}
                    alt={cardTypes.find((c) => c.id === selectedCard)?.title}
                    className="w-full h-48 object-contain rounded"
                  />
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Continue Button */}
        {selectedCard && (
          <div className="flex justify-center mt-8">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-4">
        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </Button>
      </footer>
    </div>
  )
}