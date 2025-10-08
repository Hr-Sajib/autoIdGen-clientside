// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useRouter, useSearchParams } from "next/navigation"
// import { DashboardHeader } from "../_components/dashboard-header"
// import Image from "next/image"

// export default function SelectCardPage() {
//   const [selectedCard, setSelectedCard] = useState<string | null>("")
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   // Get projectName from query param OR fallback to session storage
//   const queryProjectName = searchParams.get("project")
//   const savedFormData = sessionStorage.getItem("formData")
//   const sessionProjectName = savedFormData ? JSON.parse(savedFormData).project : null
//   const projectName = queryProjectName || sessionProjectName || ""  // fallback to empty string

//   useEffect(() => {
//     // console.log("👉 Project Name:", projectName)
//   }, [projectName])

//   const cardTypes = [
//     {
//       id: "Student",
//       title: "Student ID Card",
//       image: "/images/studentCard.png",
//     },
//     {
//       id: "Employee",
//       title: "Employee ID Card",
//       image: "/images/employeeCard.png",
//     },
//   ]

//   // Load selected card from session
//   useEffect(() => {
//     const savedCard = sessionStorage.getItem("selectedCard");
//     if (savedCard) setSelectedCard(savedCard);
//   }, []);

//   const handleCardClick = (cardId: string) => {
//     setSelectedCard(cardId)
//     sessionStorage.setItem("selectedCard", cardId)
//     router.push(
//       `/dashboard/card-template-setup?project=${projectName}&type=${cardId}`
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />

//       <main className="container mx-auto px-6 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
//           Select Card for <span className="text-blue-600">{projectName}</span>
//         </h1>

//         {/* Desktop Layout */}
//         <div className="hidden md:grid md:grid-cols-2 gap-8 container mx-auto">
//           {cardTypes.map((card) => (
//             <Card
//               key={card.id}
//               className={`pt-6 px-6 h-full cursor-pointer transition-all hover:shadow-lg ${selectedCard === card.id
//                 ? "ring-2 ring-blue-500 bg-blue-50"
//                 : "hover:bg-gray-50"
//                 }`}
//               onClick={() => handleCardClick(card.id)}
//             >
//               <div className="text-center pb-0">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">{card.title}</h3>
//                 <div className="bg-white rounded-lg p-4 shadow-sm">
//                   <Image
//                     src={card.image || "/placeholder.svg"}
//                     alt={card.title}
//                     width={400}
//                     height={400}
//                     className="w-full h-96 object-contain rounded"
//                   />
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>

//         {/* Mobile Layout */}
//         <div className="md:hidden">
//           <div className="flex items-center justify-between mb-6">
//             <Button variant="ghost" size="sm" className="text-blue-600">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
//                 />
//               </svg>
//               Dashboard
//             </Button>
//           </div>

//           <div className="space-y-4">
//             <div className="flex gap-2 mb-4">
//               {cardTypes.map((card) => (
//                 <Button
//                   key={card.id}
//                   variant={selectedCard === card.id ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handleCardClick(card.id)}
//                   className={selectedCard === card.id ? "bg-blue-600 text-white" : ""}
//                 >
//                   {card.title}
//                 </Button>
//               ))}
//             </div>

//             {selectedCard && (
//               <Card className="p-4">
//                 <div className="bg-white rounded-lg p-4 shadow-sm">
//                   <Image
//                     src={
//                       cardTypes.find((c) => c.id === selectedCard)?.image || "/placeholder.svg"
//                     }
//                     alt={cardTypes.find((c) => c.id === selectedCard)?.title || "Card Image"}
//                     width={400}
//                     height={400}
//                     className="w-full h-48 object-contain rounded"
//                   />
//                 </div>
//               </Card>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "../_components/dashboard-header"

export default function SelectCardPage() {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get projectName from query param OR fallback to session storage
  const queryProjectName = searchParams.get("project")
  const savedFormData = sessionStorage.getItem("formData")
  const sessionProjectName = savedFormData ? JSON.parse(savedFormData).project : null
  const projectName = queryProjectName || sessionProjectName || ""

  useEffect(() => {
    // Load saved card input if available
    const savedInput = sessionStorage.getItem("selectedCard")
    if (savedInput) setInputValue(savedInput)
  }, [])

  const handleSubmit = () => {
    if (!inputValue.trim()) return
    sessionStorage.setItem("selectedCard", inputValue.trim())
    router.push(`/dashboard/card-template-setup?project=${projectName}&type=${inputValue.trim()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Select Card for <span className="text-blue-600">{projectName}</span>
        </h1>

        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Dashboard Breadcrumb */}
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-sm font-medium">Dashboard</span>
          </div>

          {/* Input Field */}
          <div className="flex items-center gap-2">
            <input
              placeholder="Enter card type (e.g., Teacher)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-60 sm:w-72 border p-[7px] text-sm rounded-lg border-gray-100 focus:border-blue-200! focus:outline-blue-100!"
            />
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>Next</Button>
          </div>

          {/* Small preview or hint */}
          {inputValue && (
            <Card className="p-4 mt-4 text-center">
              <p className="text-gray-600">
                You are selecting <span className="font-semibold text-blue-600">{inputValue}</span> card
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
