// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useRouter } from "next/navigation"
// import { DashboardHeader } from "../_components/dashboard-header"

// export default function SelectCardPage() {
//   const [selectedCard, setSelectedCard] = useState<string | null>("student")
//   const router = useRouter()

//   const cardTypes = [
//     {
//       id: "student",
//       title: "Student ID Card",
//       image: "/images/studentCard.png",
//     },
//     {
//       id: "employee",
//       title: "Employee ID Card",
//       image: "/images/employeeCard.png",
//     },
//   ]

//   const handleContinue = () => {
//     if (selectedCard === "student") {
//       router.push("/dashboard/institute-template-setup")
//     } else if (selectedCard === "employee") {
//       router.push("/dashboard/company-template-setup")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />

//       {/* Main Content */}
//       <main className="container mx-auto px-6 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Select Card</h1>

//         {/* Desktop Layout */}
//         <div className="hidden md:grid md:grid-cols-2 gap-8 container mx-auto">
//           {cardTypes.map((card) => (
//             <Card
//               key={card.id}
//               className={`pt-6 px-6 h-full cursor-pointer transition-all hover:shadow-lg ${selectedCard === card.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
//                 }`}
//               onClick={() => setSelectedCard(card.id)}
//             >
//               <div className="text-center pb-0">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">{card.title}</h3>
//                 <div className="bg-white rounded-lg p-4 shadow-sm">
//                   <img
//                     src={card.image || "/placeholder.svg"}
//                     alt={card.title}
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
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
//               <Button
//                 variant={selectedCard === "student" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedCard("student")}
//                 className={selectedCard === "student" ? "bg-blue-600 text-white" : ""}
//               >
//                 Student ID Card
//               </Button>
//               <Button
//                 variant={selectedCard === "employee" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedCard("employee")}
//                 className={selectedCard === "employee" ? "bg-blue-600 text-white" : ""}
//               >
//                 Employee ID Card
//               </Button>
//             </div>

//             {selectedCard && (
//               <Card className="p-4">
//                 <div className="bg-white rounded-lg p-4 shadow-sm">
//                   <img
//                     src={cardTypes.find((c) => c.id === selectedCard)?.image || "/placeholder.svg"}
//                     alt={cardTypes.find((c) => c.id === selectedCard)?.title}
//                     className="w-full h-48 object-contain rounded"
//                   />
//                 </div>
//               </Card>
//             )}
//           </div>
//         </div>

//         {/* Continue Button */}
//         {selectedCard && (
//           <div className="flex justify-center mt-8">
//             <Button
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
//               onClick={handleContinue}
//             >
//               Continue
//             </Button>
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="fixed bottom-4 left-4">
//         <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
//           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//             />
//           </svg>
//           Sign Out
//         </Button>
//       </footer>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useRouter, useSearchParams } from "next/navigation"
// import { DashboardHeader } from "../_components/dashboard-header"
// import Image from "next/image"

// export default function SelectCardPage() {
//   const [selectedCard, setSelectedCard] = useState<string | null>("student")
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   // ✅ Get projectName from query param
//   const projectName = searchParams.get("projectName")

//   useEffect(() => {
//     console.log("👉 Project Name:", projectName)
//   }, [projectName])

//   const cardTypes = [
//     {
//       id: "student",
//       title: "Student ID Card",
//       image: "/images/studentCard.png",
//     },
//     {
//       id: "employee",
//       title: "Employee ID Card",
//       image: "/images/employeeCard.png",
//     },
//   ]

//   const handleContinue = () => {
//     if (selectedCard === "student") {
//       router.push(
//         `/dashboard/institute-template-setup?project=${projectName || ""}&type=student`
//       )
//     } else if (selectedCard === "employee") {
//       router.push(
//         `/dashboard/company-template-setup?project=${projectName || ""}&type=employee`
//       )
//     }
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
//               className={`pt-6 px-6 h-full cursor-pointer transition-all hover:shadow-lg ${
//                 selectedCard === card.id
//                   ? "ring-2 ring-blue-500 bg-blue-50"
//                   : "hover:bg-gray-50"
//               }`}
//               onClick={() => setSelectedCard(card.id)}
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
//               <Button
//                 variant={selectedCard === "student" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedCard("student")}
//                 className={selectedCard === "student" ? "bg-blue-600 text-white" : ""}
//               >
//                 Student ID Card
//               </Button>
//               <Button
//                 variant={selectedCard === "employee" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedCard("employee")}
//                 className={selectedCard === "employee" ? "bg-blue-600 text-white" : ""}
//               >
//                 Employee ID Card
//               </Button>
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

//         {/* Continue Button */}
//         {selectedCard && (
//           <div className="flex justify-center mt-8">
//             <Button
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
//               onClick={handleContinue}
//             >
//               Continue
//             </Button>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "../_components/dashboard-header"
import Image from "next/image"

export default function SelectCardPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>("student")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get projectName from query param
  const projectName = searchParams.get("projectName")

  useEffect(() => {
    console.log("👉 Project Name:", projectName)
  }, [projectName])

  const cardTypes = [
    {
      id: "student",
      title: "Student ID Card",
      image: "/images/studentCard.png",
    },
    {
      id: "employee",
      title: "Employee ID Card", 
      image: "/images/employeeCard.png",
    },
  ]

  const handleContinue = () => {
    if (selectedCard === "student") {
      router.push(
        `/dashboard/institute-template-setup?project=${projectName || ""}&type=student`
      )
    } else if (selectedCard === "employee") {
      router.push(
        `/dashboard/company-template-setup?project=${projectName || ""}&type=employee`
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Select Card for <span className="text-blue-600">{projectName}</span>
        </h1>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 container mx-auto">
          {cardTypes.map((card) => (
            <Card
              key={card.id}
              className={`pt-6 px-6 h-full cursor-pointer transition-all hover:shadow-lg ${
                selectedCard === card.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedCard(card.id)}
            >
              <div className="text-center pb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{card.title}</h3>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    width={400}
                    height={400}
                    className="w-full h-96 object-contain rounded"
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
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
                  <Image
                    src={
                      cardTypes.find((c) => c.id === selectedCard)?.image || "/placeholder.svg"
                    }
                    alt={cardTypes.find((c) => c.id === selectedCard)?.title || "Card Image"}
                    width={400}
                    height={400}
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
    </div>
  )
}