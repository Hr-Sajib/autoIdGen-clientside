"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import CardPreview from "../_components/CardPreview"
import { CardQuantityModal } from "../_components/quantity-modal"
import { DashboardHeader } from "../_components/dashboard-header"
import StudentCard from "@/components/layout/cards/StudentCard"

export default function InstituteTemplateSetupPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    department: "",
    rollNumber: "",
    bloodGroup: "",
    dateOfBirth: "",
    phone: "",
    studentName: "",
    instituteName: "",
    idCardType: "",
    address: "",
    logoUrl: "",
    signatureUrl: "",
    bgColor: "#0f172a", // default dark navy
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

  const handleGenerateProject = (quantity: number) => {
    console.log("Creating project:", quantity)
    // Here you would typically handle the project creation logic
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Selection</h1>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Student Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Student Name"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange("studentName", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Department
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Department"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Roll / Serial Number
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Roll/Serial Number"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Blood Group
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Blood Group"
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Date of Birth
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      placeholder="Type Phone Number"
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

              {/* Right Preview Section */}
              <div className="space-y-6">
                {/* <div className="text-right">
                  <span className="text-sm font-medium text-gray-700">Preview</span>
                </div> */}

                <Card className="p-6 bg-white border-none">
                  {/* <CardPreview
                    instituteName={formData.instituteName}
                    idCardType={formData.idCardType}
                    logoUrl={formData.logoUrl}
                    signatureUrl={formData.signatureUrl}
                    bgColor={formData.bgColor}
                  /> */}
                  <div className="w-full mx-auto">
                    <StudentCard
                      instituteName="{form.instituteName}"
                      address="{form.address}"
                      idCardType="{form.idCardType}"
                      studentName="{form.instituteName}"
                      department="{form.department}"
                      roll="{form.roll}"
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
                      qrData="{form.qrData}"
                    />
                  </div>
                </Card>

                {/* Color Selection */}
                <div className="flex justify-center gap-2">
                  {["#0f172a", "#22c55e", "#06b6d4", "#8b5cf6", "#ec4899"].map((color) => (
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

      <CardQuantityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateProject} />
    </>
  )
}
