




"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LucideSignature, LucideUpload } from "lucide-react"

import StudentCard from "@/components/layout/cards/StudentCard"
import EmployeeCard from "@/components/layout/cards/EmployeCard"

export default function CompanyTemplateSetupPage() {
  const [cardOrientation, setCardOrientation] = useState("vertical") // horizontal (student) or vertical (employee)
  const router = useRouter()
  const [form, setForm] = useState({
    companyName: "",
    idCardType: "",
    address: "",
    department: "",
    employeeId: "",
    bloodGroup: "",
    dob: "",
    phone: "",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://via.placeholder.com/100",
    bgColor: "#0f172a",
    qrData: "ABC Group/Sales/1233/B+/+65-2131-XXXX",
    employeeName: "John Marshal",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0])
      setForm({ ...form, [field]: fileUrl })
    }
  }

  const handleOrientationChange = (orientation: string) => {
    setCardOrientation(orientation)
    sessionStorage.setItem('cardOrientation', orientation) // Save to sessionStorage
    console.log("Set cardOrientation to:", orientation) // Debug log
  }

  const handleContinue = () => {
    // Optionally, ensure orientation is saved before navigating
    sessionStorage.setItem('cardOrientation', cardOrientation)
    router.push("/dashboard/employee-information")
  }

  const colors = ["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7", "#ec4899"]

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Form Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                ID Card Template Setup
              </h1>
            </div>

            <div className="space-y-6">
              {/* Company Name */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-gray-900">
                  Company Name
                </label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Type Company Name"
                  className="w-full mt-2 px-4 h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                />
              </div>

              {/* ID Card Type */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-gray-900">
                  ID card Type
                </label>
                <input
                  name="idCardType"
                  value={form.idCardType}
                  onChange={handleChange}
                  placeholder="Type Student/Employee"
                  className="w-full mt-2 px-4 h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                />
              </div>

              {/* Address */}
              <div className="space-y-3">
                <label className="text-base font-semibold text-gray-900">
                  Address
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Type Address"
                  className="w-full mt-2 px-4 h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                />
              </div>

              {/* Upload Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="cursor-pointer flex-1">
                    <div className="h-14 px-2 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                      <LucideUpload size={20} className="text-gray-600" />
                      <span className="text-gray-700 text-xl font-medium">Company Logo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "logoUrl")}
                      className="hidden"
                    />
                  </label>

                  <label className="cursor-pointer flex-1">
                    <div className="h-14 px-2 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                      <LucideSignature size={20} className="text-gray-600" />
                      <span className="text-gray-700 text-xl font-medium">Signature</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "signatureUrl")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  className="flex-1 text-xl h-14 text-gray-600 border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                  disabled={!form.companyName || !form.idCardType}
                >
                  Preview
                </Button>
                <Button
                  onClick={handleContinue}
                  className="flex-1 text-xl h-14 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl font-medium"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Right Preview Section */}
          <div className="flex flex-col items-center justify-start">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Preview
              </h2>

              {/* Orientation Toggle */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-lg flex">
                  <button
                    onClick={() => handleOrientationChange("horizontal")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      cardOrientation === "horizontal"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Horizontal
                  </button>
                  <button
                    onClick={() => handleOrientationChange("vertical")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      cardOrientation === "vertical"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Vertical
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              {cardOrientation === "vertical" ? (
                // Vertical - Show Employee Card
                <EmployeeCard
                  name="Mark Marshal"
                  companyName={form.companyName || "Eastern Mine School & College"}
                  address={form.address || "21A/B mine union point, Singapore"}
                  idCardType={form.idCardType || "Company ID"}
                  employeeName="Mark Marshal"
                  department="CSE"
                  employeeId="1233"
                  bloodGroup="B+"
                  dob="12-12-2000"
                  phone="+65-2131-XXXX"
                  logoUrl={form.logoUrl}
                  signatureUrl={form.signatureUrl}
                  profileUrl={form.profileUrl}
                  bgColor={form.bgColor}
                  qrData={form.qrData}
                  personImage={form.profileUrl}
                  logo={form.logoUrl}
                  signature={form.signatureUrl}
                />
              ) : (
                // Horizontal - Show Student Card
                <StudentCard
                  instituteName={form.companyName || "Eastern Mine Awesome Beautiful School & College, Singapore"}
                  address={form.address || "21A/B mine union point, Singapore"}
                  idCardType={form.idCardType || "Company"}
                  studentName="Mark Marshal"
                  department="CSE"
                  roll="1233"
                  bloodGroup="B+"
                  dob="12-12-2000"
                  phone="+65-2131-XXXX"
                  logoUrl={form.logoUrl}
                  signatureUrl={form.signatureUrl}
                  profileUrl={form.profileUrl}
                  bgColor={form.bgColor}
                  qrData={form.qrData}
                />
              )}
            </div>

            {/* Color Picker */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-gray-600 font-medium">
                Select photo Background Color
              </p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setForm({ ...form, bgColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      form.bgColor === color
                        ? 'border-gray-800 scale-110'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}