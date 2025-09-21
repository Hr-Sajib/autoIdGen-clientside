// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { DashboardHeader } from "../_components/dashboard-header"
// import EmployeeCard from "@/components/layout/cards/EmployeCard"
// import { CardQuantityModal } from "../_components/quantity-modal"
// import { useRouter } from "next/navigation"
// import StudentCard from "@/components/layout/cards/StudentCard"

// export default function EmployeeInformationPage() {
//   const router = useRouter()
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [cardOrientation, setCardOrientation] = useState("vertical")

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
//     logoUrl: "",
//     signatureUrl: "",
//     profileUrl: "https://via.placeholder.com/100",
//     bgColor: "#0f172a",
//     qrData: "",
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

//   const handleFileUpload = (field: string, file: File | null) => {
//     if (!file) return
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, [field]: reader.result as string }))
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleGenerateCards = (quantity: number) => {
//     console.log("Generating cards:", quantity)
//     // here you can post formData to backend or save
//     router.push("/dashboard/company-template-setup")
//   }

//   const colors = ["#0f172a", "#22c55e", "#06b6d4", "#8b5cf6", "#ec4899"]

//   return (
//     <>
//       <div className="min-h-screen bg-background">
//         <DashboardHeader />

//         <main className="container mx-auto px-6 py-8">
//           <div className="max-w-full mx-auto">
//             <h1 className="text-2xl font-bold text-gray-900 mb-8">Employee Info Selection</h1>

//             <div className="grid lg:grid-cols-2 gap-8">
//               {/* Form Section */}
//               <div className="space-y-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input
//                     placeholder="Employee Name"
//                     value={formData.employeeName}
//                     onChange={(e) => handleInputChange("employeeName", e.target.value)}
//                   />
//                   <Input
//                     placeholder="Department"
//                     value={formData.department}
//                     onChange={(e) => handleInputChange("department", e.target.value)}
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <Input
//                     placeholder="Roll / Serial Number"
//                     value={formData.rollNumber}
//                     onChange={(e) => handleInputChange("rollNumber", e.target.value)}
//                   />
//                   <Input
//                     placeholder="Blood Group"
//                     value={formData.bloodGroup}
//                     onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <Input
//                     placeholder="Date of Birth"
//                     value={formData.dateOfBirth}
//                     onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//                   />
//                   <Input
//                     placeholder="Phone Number"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                   />
//                 </div>

//                 {/* File Uploads */}
//                 <div className="flex gap-4">
//                   <label className="cursor-pointer">
//                     <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50">⬆️ Logo</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => handleFileUpload("logoUrl", e.target.files?.[0] || null)}
//                     />
//                   </label>
//                   <label className="cursor-pointer">
//                     <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50">👤 Profile</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => handleFileUpload("profileUrl", e.target.files?.[0] || null)}
//                     />
//                   </label>
//                   <label className="cursor-pointer">
//                     <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50">✍️ Signature</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => handleFileUpload("signatureUrl", e.target.files?.[0] || null)}
//                     />
//                   </label>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 mt-6">
//                   <Button variant="outline" className="flex-1">Previous</Button>
//                   <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
//                 </div>
//               </div>

//               {/* Preview Section */}
//               {/* <div className="space-y-6">
//                 <Card className="p-6 bg-white">
//                   <EmployeeCard
//                     companyName="{form.instituteName}"
//                     address="{form.address}"
//                     idCardType="{form.idCardType}"
//                     employeeName="{form.instituteName}"
//                     department="{form.department}"
//                     employeeId="{form.roll}"
//                     bloodGroup="{form.bloodGroup}"
//                     dob="{form.dob}"
//                     phone="{form.phone}"
//                     // logoUrl="{form.logoUrl}"
//                     // signatureUrl="{form.signatureUrl}"
//                     // profileUrl="{form.profileUrl}"
//                     logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//                     signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//                     profileUrl="https://i.postimg.cc/Y0ydK27n/person.jpg"
//                     bgColor="{form.bgColor}"
//                     qrData="{form.qrData}" />
//                 </Card>

//                 <div className="flex justify-center gap-2">
//                   {colors.map((color) => (
//                     <button
//                       key={color}
//                       className="w-6 h-6 rounded-full border"
//                       style={{ backgroundColor: color }}
//                       onClick={() => handleInputChange("bgColor", color)}
//                     />
//                   ))}
//                 </div>
//               </div> */}


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
//                           name={formData.employeeName || "Mark Marshal"}
//                           companyName={formData.companyName}
//                           address={formData.address}
//                           idCardType={formData.idCardType}
//                           employeeName={formData.employeeName || "Mark Marshal"}
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
//                           personImage={formData.profileUrl}
//                           logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
//                           signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
//                           // Pass custom labels to the card component
                          
//                         />
//                       ) : (
//                         <StudentCard
//                           instituteName={formData.companyName}
//                           address={formData.address}
//                           idCardType={formData.idCardType}
//                           studentName={formData.employeeName || "Mark Marshal"}
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

//       <CardQuantityModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onGenerate={handleGenerateCards}
//       />
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

interface FormData {
  responseFormat: {
    name: string;
    payload: {
        fieldName: string;
        value: string;
    }[];
  };
  projectQuantity: number;
}

export default function EmployeeInformationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardOrientation, setCardOrientation] = useState("vertical")
  const [editingField, setEditingField] = useState<string | null>(null)
  
  const [customLabels, setCustomLabels] = useState({
    employeeName: "Name",
    studentName: "Name",
    department: "Department",
    employeeId: "Employee ID",
    rollNumber: "Employee ID",
    bloodGroup: "Blood Group", 
    dateOfBirth: "Date of Birth",
    phone: "Phone"
  })

  const [formData, setFormData] = useState({
    department: "",
    employeeId: "",
    bloodGroup: "",
    dateOfBirth: "",
    phone: "",
    employeeName: "",
    companyName: "TechCorp Limited",
    idCardType: "Employee ID",
    address: "21A/B Tech Park, Singapore",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://i.postimg.cc/Y0ydK27n/person.jpg",
    bgColor: "#0f172a",
    qrData: "ENG/EMP001/B+/12121990/+65-2131-XXXX",
    whoseSign: "CEO",
    project: "",
    type: "employee"
  })

  useEffect(() => {
    try {
      const sessionFormData = sessionStorage.getItem('formData')
      
      if (sessionFormData) {
        const parsedData = JSON.parse(sessionFormData)
        
        setCardOrientation(parsedData.cardOrientation || "vertical")
        
        setFormData(prev => ({
          ...prev,
          address: parsedData.address || prev.address,
          bgColor: parsedData.bgColor || prev.bgColor,
          bloodGroup: parsedData.bloodGroup || "",
          department: parsedData.department || "",
          dateOfBirth: parsedData.dob || "",
          idCardType: parsedData.idCardType || prev.idCardType,
          companyName: parsedData.companyName || prev.companyName,
          logoUrl: parsedData.logoUrl || "",
          phone: parsedData.phone || "",
          profileUrl: parsedData.profileUrl || prev.profileUrl,
          project: parsedData.project || "",
          qrData: parsedData.qrData || prev.qrData,
          employeeId: parsedData.employeeId || "",
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

  const handleGenerateProject = (quantity: number) => {
    const response = {
      "name": formData.employeeName,
      "payload": [
        {
          "fieldName": customLabels.department,
          "value": formData.department
        },
        {
          "fieldName": customLabels.employeeId,
          "value": formData.employeeId
        },
        {
          "fieldName": customLabels.bloodGroup,
          "value": formData.bloodGroup
        },
        {
          "fieldName": customLabels.dateOfBirth,
          "value": formData.dateOfBirth
        },
        {
          "fieldName": customLabels.phone,
          "value": formData.phone
        }
      ]
    }
    
    console.log("Creating employee project with quantity:", quantity)
    console.log("Response format:", JSON.stringify(response, null, 2))
    
    try {
      const existingFormData = sessionStorage.getItem('formData')
      let updatedFormData: FormData = {
        responseFormat: {
          name: "",
          payload: []
        },
        projectQuantity: 0
      }
      
      if (existingFormData) {
        updatedFormData = JSON.parse(existingFormData)
      }
      
      updatedFormData.responseFormat = response
      updatedFormData.projectQuantity = quantity
      
      sessionStorage.setItem('formData', JSON.stringify(updatedFormData))
      
      console.log("Saved to sessionStorage:", updatedFormData)
      
    } catch (error) {
      console.error("Error saving to sessionStorage:", error)
    }
  }

  const renderCard = () => {
    const cardProps = {
      name: formData.employeeName || "",
      companyName: formData.companyName,
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

    if (cardOrientation === "horizontal") {
      return (
        <StudentCard
          instituteName={formData.companyName}
          address={formData.address}
          idCardType={formData.idCardType}
          studentName={formData.employeeName || ""}
          department={formData.department || ""}
          roll={formData.employeeId || ""}
          bloodGroup={formData.bloodGroup || ""}
          dob={formData.dateOfBirth || ""}
          phone={formData.phone || ""}
          logoUrl={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
          signatureUrl={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
          profileUrl={formData.profileUrl}
          bgColor={formData.bgColor}
          qrData={formData.qrData}
          whoseSign={formData.whoseSign}
          customLabels={{
            studentName: customLabels.employeeName,
            department: customLabels.department,
            rollNumber: customLabels.employeeId,
            bloodGroup: customLabels.bloodGroup,
            dateOfBirth: customLabels.dateOfBirth,
            phone: customLabels.phone
          }}
        />
      )
    } else {
      return (
        <EmployeeCard
          {...cardProps}
          employeeName={formData.employeeName || ""}
          employeeId={formData.employeeId || ""}
          personImage={formData.profileUrl}
          logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
          signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
          customLabels={customLabels}
        />
      )
    }
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-6 py-8">
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Employee Contact Info Selection</h1>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-base font-medium text-gray-800">
                        {customLabels.employeeName}
                      </label>
                      <span className="text-xs text-gray-500 ml-2">(Fixed)</span>
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder="Type Name"
                      value={formData.employeeName}
                      onChange={(e) => handleInputChange("employeeName", e.target.value)}
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
                      {editingField === 'employeeId' ? (
                        <Input
                          type="text"
                          value={customLabels.employeeId}
                          onChange={(e) => handleLabelChange("employeeId", e.target.value)}
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
                            {customLabels.employeeId}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('employeeId')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.employeeId}`}
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange("employeeId", e.target.value)}
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
                
                <div className="flex gap-4 mt-8">
                  <Button disabled className="flex-1 bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed p-4 text-md">Preview</Button>
                  <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-4 text-md">Next</Button>
                </div>
              </div>

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
              </div>
            </div>
          </div>
        </main>
      </div>

      <CardQuantityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateProject} />
    </>
  )
}