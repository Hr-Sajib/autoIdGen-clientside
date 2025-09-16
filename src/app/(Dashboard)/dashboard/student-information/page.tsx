"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import CardPreview from "../_components/CardPreview"
import { CardQuantityModal } from "../_components/quantity-modal"

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
  const [quantity, setQuantity] = useState("")

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
      <div className="min-h-screen bg-white">
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
                  </svg>
                  Dashboard
                </div>
              </div>

              {/* Mobile menu icon */}
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
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Selection</h1>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Student Name
                      <svg className="inline w-4 h-4 ml-1 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Student Name"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange("studentName", e.target.value)}
                      className="w-full bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Department
                      <svg className="inline w-4 h-4 ml-1 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Department"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full bg-gray-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Roll / Serial Number
                      <svg className="inline w-4 h-4 ml-1 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Roll/Serial Number"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      className="w-full bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Blood Group
                      <svg className="inline w-4 h-4 ml-1 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Blood Group"
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                      className="w-full bg-gray-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Date of Birth
                      <svg className="inline w-4 h-4 ml-1 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </label>
                    <Input
                      type="text"
                      placeholder="Type Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-800 mb-2">
                      Phone
                      <svg className="inline w-4 h-4 ml-1 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </label>
                    <Input
                      type="tel"
                      placeholder="Type Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button disabled className="flex-1 bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed">Preview</Button>
                  <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
                </div>
              </div>

              {/* Right Preview Section */}
              <div className="space-y-6">
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700">Preview</span>
                </div>

                <Card className="p-6 bg-white">
                  <CardPreview
                    instituteName={formData.instituteName}
                    idCardType={formData.idCardType}
                    logoUrl={formData.logoUrl}
                    signatureUrl={formData.signatureUrl}
                    bgColor={formData.bgColor}
                  />
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
