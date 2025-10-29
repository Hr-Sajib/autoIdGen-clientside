// "use client"

// import { useState, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import Image from "next/image"
// import style1 from "@/../public/images/studentCard.png"
// import style2 from "@/../public/images/employeeCard.png"
// import { DashboardHeader } from "../_components/dashboard-header"

// // Card styles configuration
// const cardStyles = [
//   {
//     id: "horizontal",
//     image: style1,
//     alt: "Horizontal Template"
//   },
//   {
//     id: "vertical",
//     image: style2,
//     alt: "Vertical Template"
//   }
// ]

// export default function SelectCardPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const queryProjectName = searchParams.get("project")
//   const savedFormData = sessionStorage.getItem("formData")
//   const sessionProjectName = savedFormData ? JSON.parse(savedFormData).project : null
//   const projectName = queryProjectName || sessionProjectName || ""

//   const handleStyleSelect = (styleId: string) => {
//     // router.push(`/dashboard/card-template-setup?project=${projectName}&style=${styleId}`)
//     router.push(`/dashboard/card-template-setup?project=${projectName}&style=${styleId}`)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <DashboardHeader />

//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <div className="max-w-5xl mx-auto">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
//             Select from available templates
//           </h1>
//           <p className="text-gray-600 text-center mb-10">
//             Choose a style for <span className="font-semibold text-blue-600">{projectName}</span>
//           </p>

//           {/* Template Style Selector */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
//             {cardStyles.map((style) => (
//               <div
//                 key={style.id}
//                 onClick={() => handleStyleSelect(style.id)}
//                 className="relative cursor-pointer group transition-all duration-200 hover:scale-[1.02]"
//               >
//                 <div className="relative bg-white rounded-xl overflow-hidden shadow-md ring-1 ring-gray-200 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-200">
//                   {/* Image Container */}
//                   <div className="p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//                     <div className="relative">
//                       <Image 
//                         src={style.image} 
//                         alt={style.alt} 
//                         width={280} 
//                         height={360}
//                         className="rounded-lg shadow-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }


















// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import style1 from "@/../public/images/studentCard.png";
// import style2 from "@/../public/images/employeeCard.png";
// import { DashboardHeader } from "../_components/dashboard-header";

// const cardStyles = [
//   {
//     id: "horizontal",
//     image: style1,
//     alt: "Horizontal Template",
//   },
//   {
//     id: "vertical",
//     image: style2,
//     alt: "Vertical Template",
//   },
// ];

// export default function SelectCardPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const queryProjectName = searchParams.get("project");
//   const savedFormData = sessionStorage.getItem("formData");
//   const sessionProjectName = savedFormData ? JSON.parse(savedFormData).project : null;
//   const projectName = queryProjectName || sessionProjectName || "";

//   const handleStyleSelect = (styleId: string) => {
//     router.push(`/dashboard/card-template-setup?project=${projectName}&style=${styleId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <DashboardHeader />

//       <main className="container mx-auto px-4 py-10">
//         <div className="max-w-5xl mx-auto text-center">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//             Select from available templates
//           </h1>
//           <p className="text-gray-600 mb-10">
//             Choose a template for{" "}
//             <span className="font-semibold text-blue-600">{projectName}</span>
//           </p>

//           {/* Template Style Selector */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
//             {cardStyles.map((style, index) => (
//               <div
//                 key={style.id}
//                 onClick={() => handleStyleSelect(style.id)}
//                 className="cursor-pointer group transition-transform duration-300 hover:scale-105"
//               >
//                 <div className="relative">
//                   <Image
//                     src={style.image}
//                     alt={style.alt}
//                     // Different width/height for better balance
//                     width={index === 0 ? 280 : 480} // first smaller, second larger
//                     height={index === 0 ? 420 : 300} // first taller but narrower, second wider but shorter
//                     className="rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 object-contain"
//                   />
//                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }










"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import style1 from "@/../public/images/studentCard.png"
import style2 from "@/../public/images/vertical-without-handle.svg"
import { DashboardHeader } from "../_components/dashboard-header"

// Card styles configuration
const cardStyles = [
  {
    id: "horizontal",
    image: style1,
    alt: "Horizontal Template"
  },
  {
    id: "vertical",
    image: style2,
    alt: "Vertical Template"
  }
]

export default function SelectCardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const queryProjectName = searchParams.get("project")
  const savedFormData = sessionStorage.getItem("formData")
  const sessionProjectName = savedFormData ? JSON.parse(savedFormData).project : null
  const projectName = queryProjectName || sessionProjectName || ""

  const handleStyleSelect = (styleId: string) => {
    router.push(`/dashboard/card-template-setup?project=${projectName}&style=${styleId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
            Select from available templates
          </h1>
          <p className="text-gray-600 text-center mb-10">
            Choose a style for <span className="font-semibold text-blue-600">{projectName}</span>
          </p>

          {/* Template Style Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {cardStyles.map((style) => (
              <div
                key={style.id}
                onClick={() => handleStyleSelect(style.id)}
                className="relative cursor-pointer group transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleStyleSelect(style.id)
                  }
                }}
              >
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md ring-1 ring-gray-200 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-200 h-[450px] flex flex-col">
                  {/* Image Container - Fixed height for consistent card height */}
                  <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="relative w-72 h-[360px]">
                      <Image 
                        src={style.image} 
                        alt={style.alt} 
                        fill
                        loading="lazy"
                        className="rounded-lg object-contain"
                      />
                    </div>
                  </div>
                  {/* Optional: Add a label below the image for better UX */}
                  {/* <div className="px-6 pb-6 text-center">
                    <p className="text-sm font-medium text-gray-900 capitalize">{style.id} Template</p>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}