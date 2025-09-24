// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { Pencil } from "lucide-react"
// import CardPreview from "../_components/CardPreview"
// import { CardQuantityModal } from "../_components/quantity-modal"
// import { DashboardHeader } from "../_components/dashboard-header"
// import StudentCard from "@/components/layout/cards/StudentCard"
// import EmployeeCard from "@/components/layout/cards/EmployeCard"

// export default function InstituteTemplateSetupPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [cardOrientation, setCardOrientation] = useState("horizontal")
//   const [editingField, setEditingField] = useState<string | null>(null)

//   // Add state for custom labels
//   const [customLabels, setCustomLabels] = useState({
//     studentName: "Student Name",
//     department: "Department",
//     rollNumber: "Roll Number",
//     bloodGroup: "Blood Group",
//     dateOfBirth: "Date of Birth",
//     phone: "Phone"
//   })

//   const [formData, setFormData] = useState({
//     department: "",
//     rollNumber: "",
//     bloodGroup: "",
//     dateOfBirth: "",
//     phone: "",
//     studentName: "",
//     instituteName: "Eastern Mine School & College",
//     idCardType: "Student",
//     address: "21A/B mine union point, Singapore",
//     logoUrl: "",
//     signatureUrl: "",
//     profileUrl: "https://i.postimg.cc/Y0ydK27n/person.jpg",
//     bgColor: "#0f172a",
//     qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
//     whoseSign: "Principal"
//   })

//   useEffect(() => {
//     const savedOrientation = sessionStorage.getItem('cardOrientation')
//     if (savedOrientation) {
//       setCardOrientation(savedOrientation)
//     }
//   }, [])

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleLabelChange = (field: string, value: string) => {
//     setCustomLabels((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleFileUpload = (field: string, file: File | null) => {
//     if (!file) return
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, [field]: reader.result as string }))
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleGenerateProject = (quantity: number) => {
//     console.log("Creating project:", quantity)
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-background">
//         <DashboardHeader />

//         <main className="container mx-auto px-6 py-8">
//           <div className="max-w-full mx-auto">
//             <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Selection</h1>

//             <div className="grid lg:grid-cols-2 gap-8">
//               {/* Form Section */}
//               <div>
//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'studentName' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.studentName}
//                           onChange={(e) => handleLabelChange("studentName", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.studentName}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('studentName')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Student Name"
//                       value={formData.studentName}
//                       onChange={(e) => handleInputChange("studentName", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'department' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.department}
//                           onChange={(e) => handleLabelChange("department", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.department}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('department')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Department"
//                       value={formData.department}
//                       onChange={(e) => handleInputChange("department", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'rollNumber' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.rollNumber}
//                           onChange={(e) => handleLabelChange("rollNumber", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.rollNumber}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('rollNumber')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Roll/Serial Number"
//                       value={formData.rollNumber}
//                       onChange={(e) => handleInputChange("rollNumber", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'bloodGroup' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.bloodGroup}
//                           onChange={(e) => handleLabelChange("bloodGroup", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.bloodGroup}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('bloodGroup')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Blood Group"
//                       value={formData.bloodGroup}
//                       onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'dateOfBirth' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.dateOfBirth}
//                           onChange={(e) => handleLabelChange("dateOfBirth", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.dateOfBirth}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('dateOfBirth')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Date of Birth"
//                       value={formData.dateOfBirth}
//                       onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'phone' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.phone}
//                           onChange={(e) => handleLabelChange("phone", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.phone}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('phone')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="tel"
//                       placeholder="Type Phone Number"
//                       value={formData.phone}
//                       onChange={(e) => handleInputChange("phone", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-4 mt-8">
//                   <Button disabled className="flex-1 bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed p-4 text-md">Preview</Button>
//                   <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-4 text-md">Next</Button>
//                 </div>
//               </div>

//               {/* Right Preview Section */}
//               <div className="space-y-6">
//                 <div className="text-center mb-4">
//                   <span className="text-lg font-semibold text-gray-800">
//                     Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)
//                   </span>
//                 </div>

//                 <Card className="p-6 bg-white border-none shadow-lg">
//                   <div className="w-full mx-auto flex justify-center">
//                     <div className={cardOrientation === "vertical" ? "scale-90" : "scale-100"}>
//                       {cardOrientation === "vertical" ? (
//                         <EmployeeCard
//                           name={formData.studentName || "Mark Marshal"}
//                           companyName={formData.instituteName}
//                           address={formData.address}
//                           idCardType={formData.idCardType}
//                           employeeName={formData.studentName || "Mark Marshal"}
//                           department={formData.department || "CSE"}
//                           employeeId={formData.rollNumber || "1233"}
//                           bloodGroup={formData.bloodGroup || "B+"}
//                           dob={formData.dateOfBirth || "12-12-2000"}
//                           phone={formData.phone || "+65-2131-XXXX"}
//                           logoUrl={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
//                           signatureUrl={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
//                           profileUrl={formData.profileUrl}
//                           bgColor={formData.bgColor}
//                           qrData={formData.qrData}
//                           whoseSign={formData.whoseSign}
//                           personImage={formData.profileUrl}
//                           logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
//                           signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
//                           // Pass custom labels to the card component

//                         />
//                       ) : (
//                         <StudentCard
//                           instituteName={formData.instituteName}
//                           address={formData.address}
//                           idCardType={formData.idCardType}
//                           studentName={formData.studentName || "Mark Marshal"}
//                           department={formData.department || "CSE"}
//                           roll={formData.rollNumber || "1233"}
//                           bloodGroup={formData.bloodGroup || "B+"}
//                           dob={formData.dateOfBirth || "12-12-2000"}
//                           phone={formData.phone || "+65-2131-XXXX"}
//                           logoUrl={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
//                           signatureUrl={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
//                           profileUrl={formData.profileUrl}
//                           bgColor={formData.bgColor}
//                           qrData={formData.qrData}
//                           whoseSign={formData.whoseSign}
//                           // Pass custom labels to the card component

//                         />
//                       )}
//                     </div>
//                   </div>
//                 </Card>

//                 {/* Color Selection */}
//                 <div className="space-y-2">
//                   <p className="text-center text-sm font-medium text-gray-600">
//                     Select photo Background Color
//                   </p>
//                   <div className="flex justify-center gap-2">
//                     {["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7", "#ec4899"].map((color) => (
//                       <button
//                         key={color}
//                         className={`w-8 h-8 rounded-full border-2 transition-all ${
//                           formData.bgColor === color 
//                             ? 'border-gray-800 scale-110' 
//                             : 'border-gray-200 hover:border-gray-400'
//                         }`}
//                         style={{ backgroundColor: color }}
//                         onClick={() => handleInputChange("bgColor", color)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <CardQuantityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateProject} />
//     </>
//   )
// }


//? clodes first try 
// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { Pencil } from "lucide-react"
// import CardPreview from "../_components/CardPreview"
// import { CardQuantityModal } from "../_components/quantity-modal"
// import { DashboardHeader } from "../_components/dashboard-header"
// import StudentCard from "@/components/layout/cards/StudentCard"
// import EmployeeCard from "@/components/layout/cards/EmployeCard"

// export default function InstituteTemplateSetupPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [cardOrientation, setCardOrientation] = useState("horizontal")
//   const [editingField, setEditingField] = useState<string | null>(null)

//   // Add state for custom labels
//   const [customLabels, setCustomLabels] = useState({
//     studentName: "Student Name",
//     department: "Department",
//     rollNumber: "Roll Number",
//     bloodGroup: "Blood Group",
//     dateOfBirth: "Date of Birth",
//     phone: "Phone"
//   })

//   const [formData, setFormData] = useState({
//     department: "",
//     rollNumber: "",
//     bloodGroup: "",
//     dateOfBirth: "",
//     phone: "",
//     studentName: "",
//     instituteName: "Eastern Mine School & College",
//     idCardType: "Student",
//     address: "21A/B mine union point, Singapore",
//     logoUrl: "",
//     signatureUrl: "",
//     profileUrl: "https://i.postimg.cc/Y0ydK27n/person.jpg",
//     bgColor: "#0f172a",
//     qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
//     whoseSign: "Principal",
//     project: "",
//     type: "student"
//   })

//   // Load data from sessionStorage on component mount
//   useEffect(() => {
//     try {
//       // Get formData from sessionStorage
//       const sessionFormData = sessionStorage.getItem('formData')

//       if (sessionFormData) {
//         const parsedData = JSON.parse(sessionFormData)

//         // Set card orientation from session data
//         setCardOrientation(parsedData.cardOrientation || "horizontal")

//         // Update formData with sessionStorage data
//         setFormData(prev => ({
//           ...prev,
//           address: parsedData.address || prev.address,
//           bgColor: parsedData.bgColor || prev.bgColor,
//           bloodGroup: parsedData.bloodGroup || "",
//           department: parsedData.department || "",
//           dateOfBirth: parsedData.dob || "",
//           idCardType: parsedData.idCardType || prev.idCardType,
//           instituteName: parsedData.instituteName || prev.instituteName,
//           logoUrl: parsedData.logoUrl || "",
//           phone: parsedData.phone || "",
//           profileUrl: parsedData.profileUrl || prev.profileUrl,
//           project: parsedData.project || "",
//           qrData: parsedData.qrData || prev.qrData,
//           rollNumber: parsedData.roll || "",
//           signatureUrl: parsedData.signatureUrl || "",
//           type: parsedData.type || prev.type,
//           whoseSign: parsedData.whoseSign || prev.whoseSign
//         }))

//         console.log("Loaded formData from session:", parsedData)
//       }
//     } catch (error) {
//       console.error("Error loading session data:", error)
//     }
//   }, [])

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleLabelChange = (field: string, value: string) => {
//     setCustomLabels((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleFileUpload = (field: string, file: File | null) => {
//     if (!file) return
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, [field]: reader.result as string }))
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleGenerateProject = (quantity: number) => {
//     console.log("Creating project:", quantity)
//   }

//   // Dynamic card rendering based on type and orientation from session storage
//   const renderCard = () => {
//     const cardProps = {
//       name: formData.studentName || "Mark Marshal",
//       instituteName: formData.instituteName,
//       address: formData.address,
//       idCardType: formData.idCardType,
//       department: formData.department || "CSE",
//       bloodGroup: formData.bloodGroup || "B+",
//       dob: formData.dateOfBirth || "12-12-2000",
//       phone: formData.phone || "+65-2131-XXXX",
//       logoUrl: formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
//       signatureUrl: formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
//       profileUrl: formData.profileUrl,
//       bgColor: formData.bgColor,
//       qrData: formData.qrData,
//       whoseSign: formData.whoseSign
//     }

//     if (formData.type === "student") {
//       if (cardOrientation === "vertical") {
//         return (
//           <EmployeeCard
//             {...cardProps}
//             employeeName={formData.studentName || "Mark Marshal"}
//             employeeId={formData.rollNumber || "1233"}
//             companyName={formData.instituteName}
//             personImage={formData.profileUrl}
//             logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
//             signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
//           />
//         )
//       } else {
//         return (
//           <StudentCard
//             {...cardProps}
//             studentName={formData.studentName || "Mark Marshal"}
//             roll={formData.rollNumber || "1233"}
//           />
//         )
//       }
//     } else if (formData.type === "employee") {
//       return (
//         <EmployeeCard
//           {...cardProps}
//           employeeName={formData.studentName || "Mark Marshal"}
//           employeeId={formData.rollNumber || "1233"}
//           companyName={formData.instituteName}
//           personImage={formData.profileUrl}
//           logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
//           signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
//         />
//       )
//     }

//     // Default fallback
//     return (
//       <StudentCard
//         {...cardProps}
//         studentName={formData.studentName || "Mark Marshal"}
//         roll={formData.rollNumber || "1233"}
//       />
//     )
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-background">
//         <DashboardHeader />

//         <main className="container mx-auto px-6 py-8">
//           <div className="max-w-full mx-auto">
//             <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Selection</h1>

//             <div className="grid lg:grid-cols-2 gap-8">
//               {/* Form Section */}
//               <div>
//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'studentName' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.studentName}
//                           onChange={(e) => handleLabelChange("studentName", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.studentName}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('studentName')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Student Name"
//                       value={formData.studentName}
//                       onChange={(e) => handleInputChange("studentName", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'department' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.department}
//                           onChange={(e) => handleLabelChange("department", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.department}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('department')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Department"
//                       value={formData.department}
//                       onChange={(e) => handleInputChange("department", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'rollNumber' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.rollNumber}
//                           onChange={(e) => handleLabelChange("rollNumber", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.rollNumber}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('rollNumber')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Roll/Serial Number"
//                       value={formData.rollNumber}
//                       onChange={(e) => handleInputChange("rollNumber", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'bloodGroup' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.bloodGroup}
//                           onChange={(e) => handleLabelChange("bloodGroup", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.bloodGroup}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('bloodGroup')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Blood Group"
//                       value={formData.bloodGroup}
//                       onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'dateOfBirth' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.dateOfBirth}
//                           onChange={(e) => handleLabelChange("dateOfBirth", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.dateOfBirth}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('dateOfBirth')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="text"
//                       placeholder="Type Date of Birth"
//                       value={formData.dateOfBirth}
//                       onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'phone' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.phone}
//                           onChange={(e) => handleLabelChange("phone", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.phone}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('phone')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       type="tel"
//                       placeholder="Type Phone Number"
//                       value={formData.phone}
//                       onChange={(e) => handleInputChange("phone", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-4 mt-8">
//                   <Button disabled className="flex-1 bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed p-4 text-md">Preview</Button>
//                   <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-4 text-md">Next</Button>
//                 </div>
//               </div>

//               {/* Right Preview Section */}
//               <div className="space-y-6">
//                 <div className="text-center mb-4">
//                   <span className="text-lg font-semibold text-gray-800">
//                     Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)
//                   </span>
//                 </div>

//                 <Card className="p-6 bg-white border-none shadow-lg">
//                   <div className="w-full mx-auto flex justify-center">
//                     <div className={cardOrientation === "vertical" ? "scale-90" : "scale-100"}>
//                       {renderCard()}
//                     </div>
//                   </div>
//                 </Card>

//                 {/* Color Selection */}
//                 <div className="space-y-2">
//                   <p className="text-center text-sm font-medium text-gray-600">
//                     Select photo Background Color
//                   </p>
//                   <div className="flex justify-center gap-2">
//                     {["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7", "#ec4899"].map((color) => (
//                       <button
//                         key={color}
//                         className={`w-8 h-8 rounded-full border-2 transition-all ${
//                           formData.bgColor === color 
//                             ? 'border-gray-800 scale-110' 
//                             : 'border-gray-200 hover:border-gray-400'
//                         }`}
//                         style={{ backgroundColor: color }}
//                         onClick={() => handleInputChange("bgColor", color)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <CardQuantityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateProject} />
//     </>
//   )
// }


//? with input field and fields value is not stored into sesion storage 
// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { Pencil } from "lucide-react"
// import CardPreview from "../_components/CardPreview"
// import { CardQuantityModal } from "../_components/quantity-modal"
// import { DashboardHeader } from "../_components/dashboard-header"
// import StudentCard from "@/components/layout/cards/StudentCard"
// import EmployeeCard from "@/components/layout/cards/EmployeCard"

// export default function InstituteTemplateSetupPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [cardOrientation, setCardOrientation] = useState("horizontal")
//   const [editingField, setEditingField] = useState<string | null>(null)

//   // Add state for custom labels - Name field is static, others are editable
//   const [customLabels, setCustomLabels] = useState({
//     studentName: "Name", // Static field - cannot be changed
//     department: "Department",
//     rollNumber: "Roll Number",
//     bloodGroup: "Blood Group",
//     dateOfBirth: "Date of Birth",
//     phone: "Phone"
//   })

//   const [formData, setFormData] = useState({
//     department: "",
//     rollNumber: "",
//     bloodGroup: "",
//     dateOfBirth: "",
//     phone: "",
//     studentName: "",
//     instituteName: "Eastern Mine School & College",
//     idCardType: "Student",
//     address: "21A/B mine union point, Singapore",
//     logoUrl: "",
//     signatureUrl: "",
//     profileUrl: "https://i.postimg.cc/Y0ydK27n/person.jpg",
//     bgColor: "#0f172a",
//     qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
//     whoseSign: "Principal",
//     project: "",
//     type: "student"
//   })

//   // Load data from sessionStorage on component mount
//   useEffect(() => {
//     try {
//       // Get formData from sessionStorage
//       const sessionFormData = sessionStorage.getItem('formData')

//       if (sessionFormData) {
//         const parsedData = JSON.parse(sessionFormData)

//         // Set card orientation from session data
//         setCardOrientation(parsedData.cardOrientation || "horizontal")

//         // Update formData with sessionStorage data
//         setFormData(prev => ({
//           ...prev,
//           address: parsedData.address || prev.address,
//           bgColor: parsedData.bgColor || prev.bgColor,
//           bloodGroup: parsedData.bloodGroup || "",
//           department: parsedData.department || "",
//           dateOfBirth: parsedData.dob || "",
//           idCardType: parsedData.idCardType || prev.idCardType,
//           instituteName: parsedData.instituteName || prev.instituteName,
//           logoUrl: parsedData.logoUrl || "",
//           phone: parsedData.phone || "",
//           profileUrl: parsedData.profileUrl || prev.profileUrl,
//           project: parsedData.project || "",
//           qrData: parsedData.qrData || prev.qrData,
//           rollNumber: parsedData.roll || "",
//           signatureUrl: parsedData.signatureUrl || "",
//           type: parsedData.type || prev.type,
//           whoseSign: parsedData.whoseSign || prev.whoseSign
//         }))

//         console.log("Loaded formData from session:", parsedData)
//       }
//     } catch (error) {
//       console.error("Error loading session data:", error)
//     }
//   }, [])

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleLabelChange = (field: string, value: string) => {
//     setCustomLabels((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleFileUpload = (field: string, file: File | null) => {
//     if (!file) return
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, [field]: reader.result as string }))
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleGenerateProject = (quantity: number) => {
//     // Generate response in required format
//     const response = {
//       "name": formData.studentName,
//       "payload": [
//         {
//           "fieldName": customLabels.department,
//           "value": formData.department
//         },
//         {
//           "fieldName": customLabels.rollNumber,
//           "value": formData.rollNumber
//         },
//         {
//           "fieldName": customLabels.bloodGroup,
//           "value": formData.bloodGroup
//         },
//         {
//           "fieldName": customLabels.dateOfBirth,
//           "value": formData.dateOfBirth
//         },
//         {
//           "fieldName": customLabels.phone,
//           "value": formData.phone
//         }
//       ]
//     }

//     console.log("Creating project with quantity:", quantity)
//     console.log("Response format:", JSON.stringify(response, null, 2))

//     // You can send this response to your API or handle it as needed
//     // Example: await submitFormData(response, quantity)
//   }

//   // Dynamic card rendering based on type and orientation from session storage
//   const renderCard = () => {
//     const cardProps = {
//       name: formData.studentName || "",
//       instituteName: formData.instituteName,
//       address: formData.address,
//       idCardType: formData.idCardType,
//       department: formData.department || "",
//       bloodGroup: formData.bloodGroup || "",
//       dob: formData.dateOfBirth || "",
//       phone: formData.phone || "",
//       logoUrl: formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
//       signatureUrl: formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
//       profileUrl: formData.profileUrl,
//       bgColor: formData.bgColor,
//       qrData: formData.qrData,
//       whoseSign: formData.whoseSign
//     }

//     if (formData.type === "student") {
//       if (cardOrientation === "vertical") {
//         return (
//           <EmployeeCard
//             {...cardProps}
//             employeeName={formData.studentName || ""}
//             employeeId={formData.rollNumber || ""}
//             companyName={formData.instituteName}
//             personImage={formData.profileUrl}
//             logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
//             signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
//             customLabels={customLabels}
//           />
//         )
//       } else {
//         return (
//           <StudentCard
//             {...cardProps}
//             studentName={formData.studentName || "john doe"}
//             roll={formData.rollNumber || ""}
//             customLabels={customLabels}
//           />
//         )
//       }
//     } else if (formData.type === "employee") {
//       return (
//         <EmployeeCard
//           {...cardProps}
//           employeeName={formData.studentName || "John Doe"}
//           employeeId={formData.rollNumber || ""}
//           companyName={formData.instituteName}
//           personImage={formData.profileUrl}
//           logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
//           signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
//           customLabels={customLabels}
//         />
//       )
//     }

//     // Default fallback
//     return (
//       <StudentCard
//         {...cardProps}
//         studentName={formData.studentName || "John Doe"}
//         roll={formData.rollNumber || ""}
//         customLabels={customLabels}
//       />
//     )
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-background">
//         <DashboardHeader />

//         <main className="container mx-auto px-6 py-8">
//           <div className="max-w-full mx-auto">
//             <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Selection</h1>
//             {/* <CardPreview/> */}

//             <div className="grid lg:grid-cols-2 gap-8">
//               {/* Form Section */}
//               <div>
//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {/* Name field is static - no edit button */}
//                       <label className="block text-base font-medium text-gray-800">
//                         {customLabels.studentName}
//                       </label>
//                       <span className="text-xs text-gray-500 ml-2">(Fixed)</span>
//                     </div>
//                     <Input
//                       hidden
//                       type="text"
//                       placeholder="Type Name"
//                       value={formData.studentName}
//                       onChange={(e) => handleInputChange("studentName", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'department' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.department}
//                           onChange={(e) => handleLabelChange("department", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.department}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('department')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       hidden
//                       type="text"
//                       placeholder={`Type ${customLabels.department}`}
//                       value={formData.department}
//                       onChange={(e) => handleInputChange("department", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'rollNumber' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.rollNumber}
//                           onChange={(e) => handleLabelChange("rollNumber", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.rollNumber}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('rollNumber')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       hidden
//                       type="text"
//                       placeholder={`Type ${customLabels.rollNumber}`}
//                       value={formData.rollNumber}
//                       onChange={(e) => handleInputChange("rollNumber", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'bloodGroup' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.bloodGroup}
//                           onChange={(e) => handleLabelChange("bloodGroup", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.bloodGroup}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('bloodGroup')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       hidden
//                       type="text"
//                       placeholder={`Type ${customLabels.bloodGroup}`}
//                       value={formData.bloodGroup}
//                       onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-5 mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'dateOfBirth' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.dateOfBirth}
//                           onChange={(e) => handleLabelChange("dateOfBirth", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.dateOfBirth}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('dateOfBirth')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       hidden
//                       type="text"
//                       placeholder={`Type ${customLabels.dateOfBirth}`}
//                       value={formData.dateOfBirth}
//                       onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       {editingField === 'phone' ? (
//                         <Input
//                           type="text"
//                           value={customLabels.phone}
//                           onChange={(e) => handleLabelChange("phone", e.target.value)}
//                           onBlur={() => setEditingField(null)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') setEditingField(null)
//                           }}
//                           autoFocus
//                           className="h-8"
//                         />
//                       ) : (
//                         <>
//                           <label className="block text-base font-medium text-gray-800">
//                             {customLabels.phone}
//                           </label>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-6 w-6"
//                             onClick={() => setEditingField('phone')}
//                           >
//                             <Pencil className="h-3 w-3" />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                     <Input
//                       hidden
//                       type="tel"
//                       placeholder={`Type ${customLabels.phone}`}
//                       value={formData.phone}
//                       onChange={(e) => handleInputChange("phone", e.target.value)}
//                       className="w-full bg-gray-100 py-6 px-4 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 {/* Add/Remove Field Section */}
//                 {/* <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                   <h3 className="text-md font-semibold text-gray-800 mb-3">Customize Form Fields</h3>
//                   <p className="text-sm text-gray-600 mb-3">Click the pencil icon next to any field label to rename it. The &quot;Name&quot; field cannot be changed.</p>


//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     <div className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                       <span>Editable Fields: Department, Roll Number, Blood Group, Date of Birth, Phone</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-red-500 rounded-full"></span>
//                       <span>Fixed Field: Name (cannot be changed)</span>
//                     </div>
//                   </div>
//                 </div> */}

//                 <div className="flex gap-4 mt-8">
//                   <Button disabled className="flex-1 bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed p-4 text-md">Preview</Button>
//                   <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-4 text-md">Next</Button>
//                 </div>
//               </div>

//               {/* Right Preview Section */}
//               <div className="space-y-6">
//                 <div className="text-center mb-4">
//                   <span className="text-lg font-semibold text-gray-800">
//                     Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)
//                   </span>
//                 </div>

//                 <Card className="p-6 bg-white border-none shadow-lg">
//                   <div className="w-full mx-auto flex justify-center">
//                     <div className={cardOrientation === "vertical" ? "scale-90" : "scale-100"}>
//                       {renderCard()}
//                     </div>
//                   </div>
//                 </Card>

//                 {/* Color Selection */}
//                 {/* <div className="space-y-2">
//                   <p className="text-center text-sm font-medium text-gray-600">
//                     Select photo Background Color
//                   </p>
//                   <div className="flex justify-center gap-2">
//                     {["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7", "#ec4899"].map((color) => (
//                       <button
//                         key={color}
//                         className={`w-8 h-8 rounded-full border-2 transition-all ${
//                           formData.bgColor === color 
//                             ? 'border-gray-800 scale-110' 
//                             : 'border-gray-200 hover:border-gray-400'
//                         }`}
//                         style={{ backgroundColor: color }}
//                         onClick={() => handleInputChange("bgColor", color)}
//                       />
//                     ))}
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <CardQuantityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateProject} />
//     </>
//   )
// }



"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import { CardQuantityModal } from "../_components/quantity-modal"
import { DashboardHeader } from "../_components/dashboard-header"
import StudentCard from "@/components/layout/cards/StudentCard"
import EmployeeCard from "@/components/layout/cards/EmployeCard"
import { useCreateProjectMutation } from "@/lib/feature/Project/projectApi";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function InstituteTemplateSetupPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardOrientation, setCardOrientation] = useState("")
  const [editingField, setEditingField] = useState<string | null>(null)

  // Add state for custom labels - Name field is static, others are editable
  const [customLabels, setCustomLabels] = useState({
    studentName: "Name", // Static field - cannot be changed
    department: "Department",
    rollNumber: "Roll Number",
    employeeId: "Employee ID",
    bloodGroup: "Blood Group",
    dateOfBirth: "Date of Birth",
    phone: "Phone"
  })

  const [formData, setFormData] = useState({
    department: "",
    rollNumber: "",
    bloodGroup: "",
    dateOfBirth: "",
    phone: "",
    studentName: "",
    instituteName: "Eastern Mine School & College",
    idCardType: "Student",
    address: "21A/B mine union point, Singapore",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://i.postimg.cc/Y0ydK27n/person.jpg",
    bgColor: "#0f172a",
    qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
    whoseSign: "Principal",
    project: "",
    type: "student"
  })

  // ✅ Hook for creating project
  const [createProject] =
    useCreateProjectMutation();

  // Load data from sessionStorage on component mount
  useEffect(() => {
    try {
      // Get formData from sessionStorage
      const sessionFormData = sessionStorage.getItem('formData')

      if (sessionFormData) {
        const parsedData = JSON.parse(sessionFormData)

        // Set card orientation from session data
        setCardOrientation(parsedData.cardOrientation || "horizontal")

        // Update formData with sessionStorage data
        setFormData(prev => ({
          ...prev,
          address: parsedData.address || prev.address,
          bgColor: parsedData.bgColor || prev.bgColor,
          bloodGroup: parsedData.bloodGroup || "",
          department: parsedData.department || "",
          dateOfBirth: parsedData.dob || "",
          idCardType: parsedData.idCardType || prev.idCardType,
          instituteName: parsedData.instituteName || prev.instituteName,
          logoUrl: parsedData.logoUrl || "",
          phone: parsedData.phone || "",
          profileUrl: parsedData.profileUrl || prev.profileUrl,
          project: parsedData.project || "",
          qrData: parsedData.qrData || prev.qrData,
          rollNumber: parsedData.roll || "",
          signatureUrl: parsedData.signatureUrl || "",
          type: parsedData.type || prev.type,
          whoseSign: parsedData.whoseSign || prev.whoseSign
        }))

        console.log("Loaded formData from session:", parsedData)
      }
    } catch (error) {
      console.error("Error loading session data:", error)
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLabelChange = (field: string, value: string) => {
    setCustomLabels((prev) => ({ ...prev, [field]: value }))
  }

  // const handleFileUpload = (field: string, file: File | null) => {
  //   if (!file) return
  //   const reader = new FileReader()
  //   reader.onloadend = () => {
  //     setFormData((prev) => ({ ...prev, [field]: reader.result as string }))
  //   }
  //   reader.readAsDataURL(file)
  // }

  // const handleGenerateProject = (quantity: number) => {

  //   const response = {
  //     "name": formData.studentName,
  //     "payload": [
  //       {
  //         "fieldName": customLabels.department,
  //         "value": formData.department
  //       },
  //       {
  //         "fieldName": customLabels.rollNumber,
  //         "value": formData.rollNumber
  //       },
  //       {
  //         "fieldName": customLabels.bloodGroup,
  //         "value": formData.bloodGroup
  //       },
  //       {
  //         "fieldName": customLabels.dateOfBirth,
  //         "value": formData.dateOfBirth
  //       },
  //       {
  //         "fieldName": customLabels.phone,
  //         "value": formData.phone
  //       }
  //     ]
  //   }

  //   console.log("Creating project with quantity:", quantity)
  //   console.log("Response format:", JSON.stringify(response, null, 2))


  //   try {

  //     const existingFormData = sessionStorage.getItem('formData')
  //     let updatedFormData: FormData = {
  //       responseFormat: {
  //         name: "",
  //         payload: []
  //       },
  //       projectQuantity: 0
  //     }

  //     if (existingFormData) {
  //       updatedFormData = JSON.parse(existingFormData)
  //     }


  //     updatedFormData.responseFormat = response
  //     updatedFormData.projectQuantity = quantity


  //     sessionStorage.setItem('formData', JSON.stringify(updatedFormData))

  //     console.log("Saved to sessionStorage:", updatedFormData)

  //   } catch (error) {
  //     console.error("Error saving to sessionStorage:", error)
  //   }

  // }

    const { user } = useSelector(
      (state: RootState) => state.auth
    );

  // ✅ Final function to call API
  const handleGenerateProject = async (quantity: number) => {
    try {
      if (!user || !user.userId) {
        console.error("❌ User is not logged in or userId is missing.");
        return;
      }
      const payload = {
        userId: user.userId, // TODO: replace with logged-in user's id
        projectName: `${formData.instituteName} ID Project`,
        templateId: "68b7582aaa0bc46f0acfb675", // TODO: replace with selected template id
        institutionName: formData.instituteName,
        cardType: formData.idCardType,
        address: formData.address,
        contactPhone: formData.phone,
        institutionLogoUrl:
          formData.logoUrl ||
          "https://i.ibb.co.com/Y765FrW0/education-logo-and-minimal-school-badge-design-template-vector.jpg",
        institutionSignUrl: formData.signatureUrl || "https://i.ibb.co.com/vxmHjprY/signpic.png",
        signRoleName: formData.whoseSign,
        additionalFields: ["Class", "Section", "Roll"], // you can build from customLabels if dynamic
        cardQuantity: quantity,
      };

      console.log("Sending payload:", payload);

      await createProject(payload).unwrap();

      console.log("✅ Project created!");
    } catch (err) {
      console.error("❌ Failed to create project:", err);
    }
  };

  // Dynamic card rendering based on type and orientation from session storage
  const renderCard = () => {
    const cardProps = {
      name: formData.studentName || "",
      instituteName: formData.instituteName,
      address: formData.address,
      idCardType: formData.idCardType,
      department: formData.department || "",
      bloodGroup: formData.bloodGroup || "",
      dob: formData.dateOfBirth || "",
      phone: formData.phone || "",
      logoUrl: formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
      signatureUrl: formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
      profileUrl: formData.profileUrl,
      bgColor: formData.bgColor,
      qrData: formData.qrData,
      whoseSign: formData.whoseSign
    }

    if (formData.type === "student") {
      if (cardOrientation === "vertical") {
        return (
          <EmployeeCard
            {...cardProps}
            employeeName={formData.studentName || ""}
            employeeId={formData.rollNumber || ""}
            companyName={formData.instituteName}
            personImage={formData.profileUrl}
            logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
            signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
            customLabels={customLabels}
          />
        )
      } else {
        return (
          <StudentCard
            {...cardProps}
            studentName={formData.studentName || "john doe"}
            roll={formData.rollNumber || ""}
            customLabels={customLabels}
          />
        )
      }
    } else if (formData.type === "employee") {
      return (
        <EmployeeCard
          {...cardProps}
          employeeName={formData.studentName || "John Doe"}
          employeeId={formData.rollNumber || ""}
          companyName={formData.instituteName}
          personImage={formData.profileUrl}
          logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
          signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
          customLabels={customLabels}
        />
      )
    }

    // Default fallback
    return (
      <StudentCard
        {...cardProps}
        studentName={formData.studentName || "John Doe"}
        roll={formData.rollNumber || ""}
        customLabels={customLabels}
      />
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-6 py-8">
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Selection</h1>
            {/* <CardPreview/> */}

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {/* Name field is static - no edit button */}
                      <label className="block text-base font-medium text-gray-800">
                        {customLabels.studentName}
                      </label>
                      <span className="text-xs text-gray-500 ml-2">(Fixed)</span>
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder="Type Name"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange("studentName", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'department' ? (
                        <Input
                          type="text"
                          value={customLabels.department}
                          onChange={(e) => handleLabelChange("department", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.department}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('department')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.department}`}
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'rollNumber' ? (
                        <Input
                          type="text"
                          value={customLabels.rollNumber || customLabels.employeeId}
                          onChange={(e) => handleLabelChange("rollNumber", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.rollNumber || customLabels.employeeId}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('rollNumber')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.rollNumber || customLabels.employeeId}`}
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'bloodGroup' ? (
                        <Input
                          type="text"
                          value={customLabels.bloodGroup}
                          onChange={(e) => handleLabelChange("bloodGroup", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.bloodGroup}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('bloodGroup')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.bloodGroup}`}
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'dateOfBirth' ? (
                        <Input
                          type="text"
                          value={customLabels.dateOfBirth}
                          onChange={(e) => handleLabelChange("dateOfBirth", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.dateOfBirth}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('dateOfBirth')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.dateOfBirth}`}
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'phone' ? (
                        <Input
                          type="text"
                          value={customLabels.phone}
                          onChange={(e) => handleLabelChange("phone", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.phone}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('phone')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="tel"
                      placeholder={`Type ${customLabels.phone}`}
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                </div>

                {/* Add/Remove Field Section */}
                {/* <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Customize Form Fields</h3>
                  <p className="text-sm text-gray-600 mb-3">Click the pencil icon next to any field label to rename it. The &quot;Name&quot; field cannot be changed.</p>
                  
            
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Editable Fields: Department, Roll Number, Blood Group, Date of Birth, Phone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Fixed Field: Name (cannot be changed)</span>
                    </div>
                  </div>
                </div> */}

                <div className="flex gap-4 mt-8">
                  <Button disabled className="flex-1 bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed p-4 text-md">Preview</Button>
                  <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-4 text-md">Next</Button>
                </div>
              </div>

              {/* Right Preview Section */}
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">
                    Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)
                  </span>
                </div>

                <Card className="p-6 bg-white border-none shadow-lg">
                  <div className="w-full mx-auto flex justify-center">
                    <div className={cardOrientation === "vertical" ? "scale-90" : "scale-100"}>
                      {renderCard()}
                    </div>
                  </div>
                </Card>

                {/* Color Selection */}
                {/* <div className="space-y-2">
                  <p className="text-center text-sm font-medium text-gray-600">
                    Select photo Background Color
                  </p>
                  <div className="flex justify-center gap-2">
                    {["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7", "#ec4899"].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          formData.bgColor === color 
                            ? 'border-gray-800 scale-110' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleInputChange("bgColor", color)}
                      />
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </main>
      </div>

      <CardQuantityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateProject} />
    </>
  )
}