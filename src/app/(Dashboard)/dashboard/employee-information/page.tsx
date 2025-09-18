"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DashboardHeader } from "../_components/dashboard-header"
import EmployeeCard from "@/components/layout/cards/EmployeCard"
import { CardQuantityModal } from "../_components/quantity-modal"
import { useRouter } from "next/navigation"

export default function EmployeeInformationPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://via.placeholder.com/100",
    bgColor: "#0f172a",
    qrData: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, [field]: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleGenerateCards = (quantity: number) => {
    console.log("Generating cards:", quantity)
    // here you can post formData to backend or save
    router.push("/dashboard/company-template-setup")
  }

  const colors = ["#0f172a", "#22c55e", "#06b6d4", "#8b5cf6", "#ec4899"]

  return (
    <>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-6 py-8">
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Employee Info Selection</h1>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Employee Name"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange("employeeName", e.target.value)}
                  />
                  <Input
                    placeholder="Department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Roll / Serial Number"
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
                    placeholder="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                {/* File Uploads */}
                <div className="flex gap-4">
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50">⬆️ Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("logoUrl", e.target.files?.[0] || null)}
                    />
                  </label>
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50">👤 Profile</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("profileUrl", e.target.files?.[0] || null)}
                    />
                  </label>
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50">✍️ Signature</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("signatureUrl", e.target.files?.[0] || null)}
                    />
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex-1">Previous</Button>
                  <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="space-y-6">
                <Card className="p-6 bg-white">
                  <EmployeeCard
                    companyName="{form.instituteName}"
                    address="{form.address}"
                    idCardType="{form.idCardType}"
                    employeeName="{form.instituteName}"
                    department="{form.department}"
                    employeeId="{form.roll}"
                    bloodGroup="{form.bloodGroup}"
                    dob="{form.dob}"
                    phone="{form.phone}"
                    // logoUrl="{form.logoUrl}"
                    // signatureUrl="{form.signatureUrl}"
                    // profileUrl="{form.profileUrl}"
                    logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
                    signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
                    profileUrl="https://i.postimg.cc/Y0ydK27n/person.jpg"
                    bgColor="{form.bgColor}"
                    qrData="{form.qrData}" />
                </Card>

                <div className="flex justify-center gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color }}
                      onClick={() => handleInputChange("bgColor", color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <CardQuantityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerateCards}
      />
    </>
  )
}
