//? without crope 

// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import EmployeeCard from "@/components/layout/cards/EmployeCard"
// import StudentCard from "@/components/layout/cards/StudentCard"
// import { UserDashboardHeader } from "./UserDashboardHeader"
// import { useRouter } from "next/navigation"
// import Image from "next/image"

// export default function EmployeeInformationPage() {
//   const router = useRouter()

//   // ✅ State for form data
//   const [formData, setFormData] = useState({
//     employeeName: "",
//     department: "",
//     rollNumber: "",
//     bloodGroup: "",
//     dateOfBirth: "",
//     phone: "",
//     cardQuantity: "",
//     companyName: "",
//     idCardType: "Employee",
//     address: "",
//     profileUrl: "https://via.placeholder.com/100", // default profile photo
//     bgColor: "#0f172a",
//     qrData: "",
//   })

//   // ✅ Orientation of card (saved in sessionStorage)
//   const [cardOrientation, setCardOrientation] = useState("horizontal")

//   // ✅ Captured/Uploaded photo preview
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null)

//   // ✅ Ref for hidden file input (camera trigger)
//   const fileInputRef = useRef<HTMLInputElement | null>(null)

//   // ---------------------------
//   // Load saved orientation
//   // ---------------------------
//   useEffect(() => {
//     const savedOrientation = sessionStorage.getItem("cardOrientation")
//     if (savedOrientation) {
//       setCardOrientation(savedOrientation)
//     }
//   }, [])

//   // ---------------------------
//   // Handle text input changes
//   // ---------------------------
//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   // ---------------------------
//   // Handle file upload / camera capture
//   // ---------------------------
//   const handleFileChange = (file: File | null) => {
//     if (!file) return
//     const imgUrl = URL.createObjectURL(file)

//     // Save to preview + formData
//     setPhotoPreview(imgUrl)
//     setFormData((prev) => ({ ...prev, profileUrl: imgUrl }))

//     console.log("📸 Captured file:", file)
//   }

//   // ---------------------------
//   // Take Photo (trigger camera)
//   // ---------------------------
//   const handleTakePhoto = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

//   // ---------------------------
//   // Export Data
//   // ---------------------------
//   const handleExport = () => {
//     console.log("Exporting data:", formData)
//     alert("✅ Data exported successfully! (check console)")
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Dashboard Header */}
//       <UserDashboardHeader />

//       <main className="container mx-auto px-6 py-8">
//         <div className="max-w-full mx-auto">
//           <h1 className="text-2xl font-bold text-gray-900 mb-8">
//             Employee Info Selection
//           </h1>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* ------------------ FORM SECTION ------------------ */}
//             <div className="space-y-6">
//               {/* Name + Department */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   placeholder="Employee Name"
//                   value={formData.employeeName}
//                   onChange={(e) =>
//                     handleInputChange("employeeName", e.target.value)
//                   }
//                 />
//                 <Input
//                   placeholder="Department"
//                   value={formData.department}
//                   onChange={(e) =>
//                     handleInputChange("department", e.target.value)
//                   }
//                 />
//               </div>

//               {/* Roll + Blood Group */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   placeholder="Roll / Serial Number"
//                   value={formData.rollNumber}
//                   onChange={(e) =>
//                     handleInputChange("rollNumber", e.target.value)
//                   }
//                 />
//                 <Input
//                   placeholder="Blood Group"
//                   value={formData.bloodGroup}
//                   onChange={(e) =>
//                     handleInputChange("bloodGroup", e.target.value)
//                   }
//                 />
//               </div>

//               {/* DOB + Phone */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   placeholder="Date of Birth"
//                   value={formData.dateOfBirth}
//                   onChange={(e) =>
//                     handleInputChange("dateOfBirth", e.target.value)
//                   }
//                 />
//                 <Input
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     handleInputChange("phone", e.target.value)
//                   }
//                 />
//               </div>

//               {/* ✅ Bottom Action Buttons */}
//               <div className="flex gap-4 mt-6">
//                 {/* Upload Photo */}
//                 <label className="flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) =>
//                       handleFileChange(e.target.files?.[0] || null)
//                     }
//                   />
//                   ⬆️ Upload Photo
//                 </label>

//                 {/* Take Photo (hidden input trigger) */}
//                 <Button variant="outline" onClick={handleTakePhoto}>
//                   📷 Take Photo
//                 </Button>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   capture="environment" // back camera (for front use "user")
//                   ref={fileInputRef}
//                   onChange={(e) =>
//                     handleFileChange(e.target.files?.[0] || null)
//                   }
//                   style={{ display: "none" }}
//                 />

//                 {/* Export */}
//                 <Button
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
//                   onClick={handleExport}
//                 >
//                   ⬇️ Export
//                 </Button>
//               </div>

//               {/* ✅ Photo Preview */}
//               {photoPreview && (
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-600">📸 Captured Preview:</p>
//                   <Image
//                     src={photoPreview}
//                     alt="Preview"
//                     width={128}
//                     height={128}
//                     className="w-32 h-32 object-cover rounded-lg mt-2 border shadow"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* ------------------ PREVIEW SECTION ------------------ */}
//             <div className="space-y-6">
//               <div className="text-center mb-4">
//                 <span className="text-lg font-semibold text-gray-800">
//                   Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)
//                 </span>
//               </div>

//               <Card className="bg-white border-0 shadow-none">
//                 <div className="w-full mx-auto flex justify-center">
//                   <div
//                     className={
//                       cardOrientation === "vertical" ? "scale-90" : "scale-100"
//                     }
//                   >
//                     {cardOrientation === "vertical" ? (
//                       // ✅ Employee Card Props Mapping
//                       <EmployeeCard
//                         name={formData.employeeName || "Mark Marshal"}
//                         companyName={formData.companyName}
//                         address={formData.address}
//                         idCardType={formData.idCardType}
//                         employeeName={formData.employeeName || "Mark Marshal"}
//                         department={formData.department || "CSE"}
//                         employeeId={formData.rollNumber || "1233"}
//                         bloodGroup={formData.bloodGroup || "B+"}
//                         dob={formData.dateOfBirth || "12-12-2000"}
//                         phone={formData.phone || "+65-2131-XXXX"}
//                         logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//                         signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//                         profileUrl={formData.profileUrl}
//                         bgColor={formData.bgColor}
//                         qrData={formData.qrData}
//                         personImage={formData.profileUrl}
//                         logo="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//                         signature="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//                       />
//                     ) : (
//                       // ✅ Student Card Props Mapping
//                       <StudentCard
//                         instituteName={formData.companyName}
//                         address={formData.address}
//                         idCardType={formData.idCardType}
//                         studentName={formData.employeeName || "Mark Marshal"}
//                         department={formData.department || "CSE"}
//                         roll={formData.rollNumber || "1233"}
//                         bloodGroup={formData.bloodGroup || "B+"}
//                         dob={formData.dateOfBirth || "12-12-2000"}
//                         phone={formData.phone || "+65-2131-XXXX"}
//                         logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//                         signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//                         profileUrl={formData.profileUrl}
//                         bgColor={formData.bgColor}
//                         qrData={formData.qrData}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }












//? crope added but take photo not working into the desktop 


// "use client"

// import { useEffect, useRef, useState, useCallback } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import EmployeeCard from "@/components/layout/cards/EmployeCard"
// import StudentCard from "@/components/layout/cards/StudentCard"
// import { UserDashboardHeader } from "./UserDashboardHeader"
// import { useRouter } from "next/navigation"
// import Cropper from 'react-easy-crop'
// import Image from "next/image"

// type CroppedAreaPixels = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };
// // ✅ Image cropping utility functions
// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const img = document.createElement('img')
//     img.onload = () => resolve(img)
//     img.onerror = (error) => reject(new Error('Failed to load image: ' + error))
//     if (!url.startsWith('blob:')) img.crossOrigin = 'anonymous'
//     img.src = url
//   })

// const getCroppedImg = async (
//   imageSrc: string,
//   pixelCrop: { x: number; y: number; width: number; height: number }
// ): Promise<string> => {
//   const image = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')
//   if (!ctx) throw new Error('Could not get 2D context')

//   const safePixelCrop = {
//     x: Math.max(0, Math.min(pixelCrop.x, image.width)),
//     y: Math.max(0, Math.min(pixelCrop.y, image.height)),
//     width: Math.max(1, Math.min(pixelCrop.width, image.width - pixelCrop.x)),
//     height: Math.max(1, Math.min(pixelCrop.height, image.height - pixelCrop.y))
//   }

//   canvas.width = safePixelCrop.width
//   canvas.height = safePixelCrop.height

//   ctx.drawImage(
//     image,
//     safePixelCrop.x,
//     safePixelCrop.y,
//     safePixelCrop.width,
//     safePixelCrop.height,
//     0,
//     0,
//     safePixelCrop.width,
//     safePixelCrop.height
//   )

//   return canvas.toDataURL('image/jpeg', 0.9)
// }

// export default function EmployeeInformationPage() {
//   const router = useRouter()

//   const [formData, setFormData] = useState({
//     employeeName: "",
//     department: "",
//     rollNumber: "",
//     bloodGroup: "",
//     dateOfBirth: "",
//     phone: "",
//     cardQuantity: "",
//     companyName: "",
//     idCardType: "Employee",
//     address: "",
//     profileUrl: "https://via.placeholder.com/100",
//     bgColor: "#0f172a",
//     qrData: "",
//   })

//   const [imageSrc, setImageSrc] = useState<string | null>(null)
//   const [crop, setCrop] = useState({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState(1)
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
//     x: number
//     y: number
//     width: number
//     height: number
//   } | null>(null)
//   const [showCropper, setShowCropper] = useState(false)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [cardOrientation, setCardOrientation] = useState("horizontal")
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null)

//   const fileInputRef = useRef<HTMLInputElement | null>(null)

//   useEffect(() => {
//     const savedOrientation = sessionStorage.getItem("cardOrientation")
//     if (savedOrientation) setCardOrientation(savedOrientation)
//   }, [])

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleFileChange = (file: File | null) => {
//     if (!file) return
//     if (!file.type.startsWith('image/')) return alert('Select a valid image')
//     if (file.size > 10 * 1024 * 1024) return alert('Image < 10MB')

//     const imgUrl = URL.createObjectURL(file)
//     setImageSrc(imgUrl)
//     setShowCropper(true)
//     setCrop({ x: 0, y: 0 })
//     setZoom(1)
//     setCroppedAreaPixels(null)
//   }

//   const onCropComplete = useCallback(
//   (value: unknown, croppedAreaPixels: CroppedAreaPixels) => {
//     // Handle the value appropriately
//     if (typeof value === 'string') {
//       // Do something with the string value
//     } else if (typeof value === 'number') {
//       // Do something with the number value
//     } else {
//       // Handle other types or throw an error if necessary
//     }
//     setCroppedAreaPixels(croppedAreaPixels);
//   },
//   []
// );

//   const handleCropSave = async () => {
//     if (!imageSrc || !croppedAreaPixels) return alert('Select area to crop')
//     setIsProcessing(true)
//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
//       if (imageSrc.startsWith('blob:')) URL.revokeObjectURL(imageSrc)
//       if (photoPreview && photoPreview.startsWith('blob:')) URL.revokeObjectURL(photoPreview)
//       setPhotoPreview(croppedImage)
//       setFormData((prev) => ({ ...prev, profileUrl: croppedImage }))
//       setShowCropper(false)
//       setImageSrc(null)
//       setCrop({ x: 0, y: 0 })
//       setZoom(1)
//       setCroppedAreaPixels(null)
//     } catch (error) {
//       alert("Error cropping image")
//       console.error(error)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleCropCancel = () => {
//     if (imageSrc && imageSrc.startsWith('blob:')) URL.revokeObjectURL(imageSrc)
//     setShowCropper(false)
//     setImageSrc(null)
//     setCrop({ x: 0, y: 0 })
//     setZoom(1)
//     setCroppedAreaPixels(null)
//   }

//   const handleTakePhoto = () => {
//     fileInputRef.current?.click()
//   }

//   const handleExport = () => {
//     const requiredFields = ['employeeName', 'department', 'rollNumber']
//     const missingFields = requiredFields.filter(f => !formData[f as keyof typeof formData])
//     if (missingFields.length > 0) return alert(`Fill required fields: ${missingFields.join(', ')}`)
//     console.log("Exporting data:", formData)
//     alert("✅ Data exported! Check console")
//   }

//   useEffect(() => {
//     return () => {
//       if (imageSrc && imageSrc.startsWith('blob:')) URL.revokeObjectURL(imageSrc)
//       if (photoPreview && photoPreview.startsWith('blob:')) URL.revokeObjectURL(photoPreview)
//     }
//   }, [imageSrc, photoPreview])

//   return (
//     <div className="min-h-screen bg-background">
//       <UserDashboardHeader />

//       <main className="container mx-auto px-6 py-8">
//         <div className="max-w-full mx-auto">
//           <h1  className="text-2xl font-bold text-gray-900 mb-8">
//             Employee Info Selection
//           </h1>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Form Section */}
//             <div className="space-y-6">
//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   placeholder="Employee Name *"
//                   value={formData.employeeName}
//                   onChange={(e) => handleInputChange("employeeName", e.target.value)}
//                   className={!formData.employeeName ? "border-red-200" : ""}
//                 />
//                 <Input
//                   placeholder="Department *"
//                   value={formData.department}
//                   onChange={(e) => handleInputChange("department", e.target.value)}
//                   className={!formData.department ? "border-red-200" : ""}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   placeholder="Roll / Serial Number *"
//                   value={formData.rollNumber}
//                   onChange={(e) => handleInputChange("rollNumber", e.target.value)}
//                   className={!formData.rollNumber ? "border-red-200" : ""}
//                 />
//                 <Input
//                   placeholder="Blood Group"
//                   value={formData.bloodGroup}
//                   onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   type="date"
//                   placeholder="Date of Birth"
//                   value={formData.dateOfBirth}
//                   onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//                 />
//                 <Input
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={(e) => handleInputChange("phone", e.target.value)}
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-wrap gap-3 mt-6">
//                 <label className="flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//                   />
//                   ⬆️ Upload Photo
//                 </label>

//                 <Button variant="outline" onClick={handleTakePhoto}>📷 Take Photo</Button>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   capture="environment"
//                   ref={fileInputRef}
//                   onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//                   style={{ display: "none" }}
//                 />

//                 <Button
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
//                   onClick={handleExport}
//                 >
//                   ⬇️ Export
//                 </Button>
//               </div>

//               {/* Photo Preview */}
//               {photoPreview && (
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-600 mb-2">📸 Current Photo:</p>
//                   <div className="relative">
//                     <Image
//                       src={photoPreview}
//                       alt="Profile Preview"
//                       width={128}
//                       height={128}
//                       className="w-32 h-32 object-cover rounded-lg border shadow cursor-pointer"
//                       onClick={() => {
//                         setImageSrc(photoPreview)
//                         setShowCropper(true)
//                         setCrop({ x: 0, y: 0 })
//                         setZoom(1)
//                       }}
//                     />
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="absolute -top-2 left-29 w-6 h-6 rounded-full p-0"
//                       onClick={() => {
//                         if (photoPreview.startsWith('blob:')) URL.revokeObjectURL(photoPreview)
//                         setPhotoPreview(null)
//                         setFormData(prev => ({ ...prev, profileUrl: "https://via.placeholder.com/100" }))
//                       }}
//                     >
//                       ×
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Preview Section */}
//             <div className="space-y-6">
//               <div className="text-center mb-4">
//                 <span className="text-lg font-semibold text-gray-800">
//                   Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)
//                 </span>
//               </div>

//               <Card className="bg-white border-0 shadow-none">
//                 <div className="w-full mx-auto flex justify-center">
//                   <div className={cardOrientation === "vertical" ? "scale-90" : "scale-100"}>
//                     {cardOrientation === "vertical" ? (
//                       <EmployeeCard
//                         name={formData.employeeName || "Mark Marshal"}
//                         companyName={formData.companyName}
//                         address={formData.address}
//                         idCardType={formData.idCardType}
//                         employeeName={formData.employeeName || "Mark Marshal"}
//                         department={formData.department || "CSE"}
//                         employeeId={formData.rollNumber || "1233"}
//                         bloodGroup={formData.bloodGroup || "B+"}
//                         dob={formData.dateOfBirth || "12-12-2000"}
//                         phone={formData.phone || "+65-2131-XXXX"}
//                         logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//                         signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//                         profileUrl={formData.profileUrl}
//                         bgColor={formData.bgColor}
//                         qrData={formData.qrData}
//                         personImage={formData.profileUrl}
//                         logo="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//                         signature="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//                       />
//                     ) : (
//                       <StudentCard
//                         instituteName={formData.companyName}
//                         address={formData.address}
//                         idCardType={formData.idCardType}
//                         studentName={formData.employeeName || "Mark Marshal"}
//                         department={formData.department || "CSE"}
//                         roll={formData.rollNumber || "1233"}
//                         bloodGroup={formData.bloodGroup || "B+"}
//                         dob={formData.dateOfBirth || "12-12-2000"}
//                         phone={formData.phone || "+65-2131-XXXX"}
//                         logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//                         signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//                         profileUrl={formData.profileUrl}
//                         bgColor={formData.bgColor}
//                         qrData={formData.qrData}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Cropper Modal */}
//       {showCropper && imageSrc && (
//         <div className="fixed inset-0 bg-black/30 bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
//             <div className="p-4 border-b">
//               <h3 className="text-lg font-semibold">Crop Your Image</h3>
//               <p className="text-sm text-gray-600 mt-1">Adjust the crop area for your profile photo</p>
//             </div>

//             <div className="relative h-96 bg-gray-100">
//               <Cropper
//                 image={imageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 onCropChange={setCrop}
//                 onCropComplete={onCropComplete}
//                 onZoomChange={setZoom}
//                 // cropShape="square"
//                 showGrid={false}
//                 style={{ containerStyle: { width: '100%', height: '100%', backgroundColor: '#f3f4f6' } }}
//               />
//             </div>

//             <div className="p-4 border-t space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-2">Zoom: {Math.round(zoom * 100)}%</label>
//                 <input
//                   type="range"
//                   min={1}
//                   max={3}
//                   step={0.1}
//                   value={zoom}
//                   onChange={(e) => setZoom(parseFloat(e.target.value))}
//                   className="w-full"
//                 />
//               </div>

//               <div className="flex justify-end gap-3">
//                 <Button variant="outline" onClick={handleCropCancel} disabled={isProcessing}>Cancel</Button>
//                 <Button onClick={handleCropSave} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700 text-white">
//                   {isProcessing ? "Processing..." : "Apply Crop"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }





"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import EmployeeCard from "@/components/layout/cards/EmployeCard"
import StudentCard from "@/components/layout/cards/StudentCard"
import { UserDashboardHeader } from "./UserDashboardHeader"
import { useRouter, useSearchParams } from "next/navigation"
import Cropper from "react-easy-crop"
import Image from "next/image"

// ---------------------
// Utility for cropping
// ---------------------
type CroppedAreaPixels = { x: number; y: number; width: number; height: number }

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = document.createElement("img")
    img.onload = () => resolve(img)
    img.onerror = (error) => reject(new Error("Failed to load image: " + error))
    if (!url.startsWith("blob:")) img.crossOrigin = "anonymous"
    img.src = url
  })

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get 2D context")

  const safePixelCrop = {
    x: Math.max(0, Math.min(pixelCrop.x, image.width)),
    y: Math.max(0, Math.min(pixelCrop.y, image.height)),
    width: Math.max(1, Math.min(pixelCrop.width, image.width - pixelCrop.x)),
    height: Math.max(1, Math.min(pixelCrop.height, image.height - pixelCrop.y)),
  }

  canvas.width = safePixelCrop.width
  canvas.height = safePixelCrop.height

  ctx.drawImage(
    image,
    safePixelCrop.x,
    safePixelCrop.y,
    safePixelCrop.width,
    safePixelCrop.height,
    0,
    0,
    safePixelCrop.width,
    safePixelCrop.height
  )

  return canvas.toDataURL("image/jpeg", 0.9)
}

// ---------------------
// Main Component
// ---------------------
export default function EmployeeInformationPage() {
  const router = useRouter()
    const searchParams = useSearchParams();

  const role = searchParams.get("role");
  const batchCode = searchParams.get("batchCode");
  const rollSerial = searchParams.get("rollSerial");
  
  console.log("Role:", role);
  console.log("Batch Code:", batchCode);
  console.log("Roll Serial:", rollSerial);

  const [formData, setFormData] = useState({
    employeeName: "",
    department: "",
    rollNumber: "",
    bloodGroup: "",
    dateOfBirth: "",
    phone: "",
    cardQuantity: "",
    companyName: "",
    idCardType: "Employee",
    address: "",
    profileUrl: "https://i.ibb.co.com/ZzcCMzNx/3.webp",
    bgColor: "#0f172a",
    qrData: "",
  })

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null)
  const [showCropper, setShowCropper] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardOrientation, setCardOrientation] = useState("vertical")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  // Webcam states
  const [showWebcam, setShowWebcam] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const savedOrientation = sessionStorage.getItem("cardOrientation")
    if (savedOrientation) setCardOrientation(savedOrientation)
  }, [])

  // ---------------------
  // Form input change
  // ---------------------
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // ---------------------
  // File select / photo upload
  // ---------------------
  const handleFileChange = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith("image/")) return alert("Select a valid image")
    if (file.size > 10 * 1024 * 1024) return alert("Image < 10MB")

    const imgUrl = URL.createObjectURL(file)
    setImageSrc(imgUrl)
    setShowCropper(true)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
  }

  // ---------------------
  // Cropper events
  // ---------------------
  const onCropComplete = useCallback((_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return alert("Select area to crop")
    setIsProcessing(true)
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc)
      if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview)
      setPhotoPreview(croppedImage)
      setFormData((prev) => ({ ...prev, profileUrl: croppedImage }))
      setShowCropper(false)
      setImageSrc(null)
    } catch (error) {
      alert("Error cropping image")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCropCancel = () => {
    if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc)
    setShowCropper(false)
    setImageSrc(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
  }

  // ---------------------
  // Remove photo (new)
  // ---------------------
  const handleRemovePhoto = () => {
    if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview)
    if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc)

    setPhotoPreview(null)
    setImageSrc(null)
    setFormData((prev) => ({
      ...prev,
      profileUrl: "https://i.ibb.co.com/ZzcCMzNx/3.webp",
    }))
  }

  // ---------------------
  // Take Photo button click
  // ---------------------
  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      setShowWebcam(true)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      fileInputRef.current?.click()
    }
  }

  // ---------------------
  // Capture from webcam
  // ---------------------
  const handleCaptureFromWebcam = () => {
    if (!videoRef.current) return
    const video = videoRef.current
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imgData = canvas.toDataURL("image/jpeg", 0.9)

    setImageSrc(imgData)
    setShowCropper(true)
    setShowWebcam(false)

    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  const handleCloseWebcam = () => {
    setShowWebcam(false)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  // ---------------------
  // Export data
  // ---------------------
  const handleExport = () => {
    const requiredFields = ["employeeName", "department", "rollNumber"]
    const missingFields = requiredFields.filter((f) => !formData[f as keyof typeof formData])
    if (missingFields.length > 0) return alert(`Fill required fields: ${missingFields.join(", ")}`)
    console.log("Exporting data:", formData)
    alert("✅ Data exported! Check console")
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc)
      if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview)
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [imageSrc, photoPreview])

  // ---------------------
  // JSX
  // ---------------------
  return (
    <div className="min-h-screen bg-background">
      <UserDashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-full mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Employee Info Selection</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* ---------------- Form Section ---------------- */}
            <div className="space-y-6">
              {/* Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Employee Name *"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange("employeeName", e.target.value)}
                />
                <Input
                  placeholder="Department *"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Roll / Serial Number *"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                />
                <Input
                  placeholder="Blood Group"
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
                <Input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <label className="flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  />
                  ⬆️ Upload Photo
                </label>

                <Button variant="outline" onClick={handleTakePhoto}>
                  📷 Take Photo
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  style={{ display: "none" }}
                />

                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleExport}>
                  ⬇️ Export
                </Button>
              </div>

              {/* Photo Preview */}
              {photoPreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">📸 Current Photo:</p>
                  <div className="relative w-fit">
                    <Image
                      src={photoPreview}
                      alt="Profile Preview"
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover rounded-lg border shadow"
                    />
                    {/* Remove Button */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 rounded-full "
                      onClick={handleRemovePhoto}
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* ---------------- Preview Section ---------------- */}
            <div className="space-y-6">
              <div className="text-center mb-4">
                <span className="text-lg font-semibold text-gray-800">
                  Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)
                </span>
              </div>
              <Card className="bg-white border-0 shadow-none">
                <div className="w-full mx-auto flex justify-center">
                  <div className={cardOrientation === "vertical" ? "scale-90" : "scale-100"}>
                    {cardOrientation === "vertical" ? (
                      <EmployeeCard
                        name={formData.employeeName || "Mark Marshal"}
                        companyName={formData.companyName}
                        address={formData.address}
                        idCardType={formData.idCardType}
                        employeeName={formData.employeeName || "Mark Marshal"}
                        department={formData.department || "CSE"}
                        employeeId={formData.rollNumber || "1233"}
                        bloodGroup={formData.bloodGroup || "B+"}
                        dob={formData.dateOfBirth || "12-12-2000"}
                        phone={formData.phone || "+65-2131-XXXX"}
                        logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
                        signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
                        profileUrl={formData.profileUrl}
                        bgColor={formData.bgColor}
                        qrData={formData.qrData}
                        personImage={formData.profileUrl}
                        logo="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
                        signature="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
                      />
                    ) : (
                      <StudentCard
                        instituteName={formData.companyName}
                        address={formData.address}
                        idCardType={formData.idCardType}
                        studentName={formData.employeeName || "Mark Marshal"}
                        department={formData.department || "CSE"}
                        roll={formData.rollNumber || "1233"}
                        bloodGroup={formData.bloodGroup || "B+"}
                        dob={formData.dateOfBirth || "12-12-2000"}
                        phone={formData.phone || "+65-2131-XXXX"}
                        logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
                        signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
                        profileUrl={formData.profileUrl}
                        bgColor={formData.bgColor}
                        qrData={formData.qrData}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* ---------------- Cropper Modal ---------------- */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Crop Your Image</h3>
            </div>
            <div className="relative h-96 bg-gray-100">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={false}
              />
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={handleCropCancel} disabled={isProcessing}>
                Cancel
              </Button>
              <Button onClick={handleCropSave} disabled={isProcessing} className="bg-blue-600 text-white">
                {isProcessing ? "Processing..." : "Apply Crop"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Webcam Modal ---------------- */}
      {showWebcam && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <h3 className="text-lg font-semibold mb-4">📷 Capture Photo</h3>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={handleCloseWebcam}>
                Cancel
              </Button>
              <Button onClick={handleCaptureFromWebcam} className="bg-blue-600 text-white">
                Capture
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
