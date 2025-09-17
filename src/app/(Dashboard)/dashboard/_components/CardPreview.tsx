"use client"
import StudentCard from "@/components/layout/cards/StudentCard"
import React from "react"

interface CardPreviewProps {
  instituteName: string
  idCardType: string
  logoUrl?: string
  signatureUrl?: string
  profileUrl?: string
  bgColor: string
}

export default function CardPreview({
  instituteName,
  idCardType,
  logoUrl,
  signatureUrl,
  profileUrl = "https://via.placeholder.com/100",
  bgColor,
}: CardPreviewProps) {
  return (
    // <div className="flex flex-col items-center gap-4">
    //   <h3 className="text-lg font-semibold">Preview</h3>

    //   {/* Card Preview */}
    //   <div className="w-64 h-[400px] bg-white rounded-xl shadow-lg overflow-hidden relative border">
    //     {/* Header wave shape */}
    //     <div
    //       className="h-24 relative flex items-center justify-center"
    //       style={{ backgroundColor: bgColor }}
    //     >
    //       {logoUrl && (
    //         <img
    //           src={logoUrl}
    //           alt="Logo"
    //           className="absolute top-3 left-3 w-12 h-12 object-cover"
    //         />
    //       )}
    //       <h1 className="text-white text-xs font-bold text-center px-4">
    //         {instituteName || "Institute Name"}
    //       </h1>
    //     </div>

    //     {/* Profile */}
    //     <div className="flex flex-col items-center -mt-10">
    //       <img
    //         src={profileUrl}
    //         alt="Profile"
    //         className="w-20 h-20 rounded-full border-4 border-white shadow"
    //       />
    //       <h2 className="mt-2 text-sm font-bold text-gray-800">Mark Marshal</h2>
    //       <p className="text-xs text-gray-500">{idCardType || "Student"}</p>
    //     </div>

    //     {/* Details */}
    //     <div className="px-6 mt-4 text-xs text-gray-700 space-y-1">
    //       <p>
    //         <span className="font-semibold">Department:</span> CSE
    //       </p>
    //       <p>
    //         <span className="font-semibold">Roll:</span> 123
    //       </p>
    //       <p>
    //         <span className="font-semibold">Blood Group:</span> B+
    //       </p>
    //       <p>
    //         <span className="font-semibold">Date of Birth:</span> 12-12-2000
    //       </p>
    //       <p>
    //         <span className="font-semibold">Phone:</span> +8801234XXXX
    //       </p>
    //     </div>

    //     {/* Footer */}
    //     <div className="absolute bottom-3 w-full px-4 flex flex-col items-center">
    //       {signatureUrl && (
    //         <img
    //           src={signatureUrl}
    //           alt="Signature"
    //           className="w-16 h-8 object-contain mb-1"
    //         />
    //       )}
    //       <p className="text-[10px] text-gray-500">Principal Signature</p>
    //     </div>
    //   </div>
    // </div>
    <StudentCard />
  )
}
