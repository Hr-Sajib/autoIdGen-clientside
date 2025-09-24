"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import StudentCard from "@/components/layout/cards/StudentCard"
import { DashboardHeader } from "../_components/dashboard-header"
import { LucideSignature, LucideUpload } from "lucide-react"
import EmployeeCard from "@/components/layout/cards/EmployeCard"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CompanyTemplateSetupPage() {
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
    profileUrl: "https://i.ibb.co.com/ZzcCMzNx/3.webp",
    bgColor: "#0f172a",
    qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
    whoseSign: '',
    cardOrientation: "vertical", // Employee default is vertical
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

  const handleContinue = () => {
    // Final data with project and type information
    const finalData = {
      ...form,
      project: "hello",
      type: "employee",
    }

    // Save data to sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(finalData))

    // Redirect to employee information page
    router.push("/dashboard/employee-information")
  }

  const colors = ["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7"]

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      
      <div className="px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Form Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Employee ID Card Template Setup
              </h1>
            </div>

            <div className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Company Name
                </label>
                <Input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Type Company Name"
                  className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* ID Card Type */}

              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">ID card Type</Label>
                <Select
                  value={form.idCardType}
                  onValueChange={(value) => setForm({ ...form, idCardType: value })}
                >
                  <SelectTrigger className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900">
                    <SelectValue placeholder="Select Card Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="Student">Student</SelectItem> */}
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company Address */}
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Company Address
                </label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Type Company Address"
                  className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Whose Sign */}
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Whose sign
                </label>
                <Input
                  name="whoseSign"
                  value={form.whoseSign}
                  onChange={handleChange}
                  placeholder="CEO/Manager"
                  className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Upload Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="cursor-pointer flex-1">
                    <div className="h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
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
                    <div className="h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                      <LucideSignature size={20} className="text-gray-600" />
                      <span className="text-gray-700 text-xl font-medium">Signature</span>
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
                  className="flex-1 h-14 text-gray-600 border-gray-300 rounded-xl text-lg font-medium hover:bg-gray-50"
                  disabled={!form.companyName || !form.idCardType}
                >
                  Preview
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="flex-1 h-14 bg-[#4A61E4] hover:bg-[#4A61E6] text-white text-lg rounded-xl font-medium"
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
                    onClick={() => setForm({ ...form, cardOrientation: "horizontal" })}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      form.cardOrientation === "horizontal"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Horizontal
                  </button>
                  <button
                    onClick={() => setForm({ ...form, cardOrientation: "vertical" })}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      form.cardOrientation === "vertical"
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
              {form.cardOrientation === "vertical" ? (
                <EmployeeCard
                  name="John Doe"
                  companyName={form.companyName || "TechCorp Limited"}
                  address={form.address || "21A/B Tech Park, Singapore"}
                  idCardType={form.idCardType || "Employee ID"}
                  employeeName="John Doe"
                  department="Engineering"
                  employeeId="EMP001"
                  bloodGroup="B+"
                  dob="12-12-1990"
                  phone="+65-2131-XXXX"
                  logoUrl={form.logoUrl}
                  signatureUrl={form.signatureUrl}
                  profileUrl={form.profileUrl}
                  bgColor={form.bgColor}
                  qrData={form.qrData}
                  whoseSign={form.whoseSign || "CEO"}
                  personImage={form.profileUrl}
                  logo={form.logoUrl}
                  signature={form.signatureUrl}
                />
              ) : (
                <StudentCard
                  instituteName={form.companyName || "TechCorp Limited"}
                  address={form.address || "21A/B Tech Park, Singapore"}
                  idCardType={form.idCardType || "Employee ID"}
                  studentName="John Doe"
                  department="Engineering"
                  roll="EMP001"
                  bloodGroup="B+"
                  dob="12-12-1990"
                  phone="+65-2131-XXXX"
                  logoUrl={form.logoUrl}
                  signatureUrl={form.signatureUrl}
                  profileUrl={form.profileUrl}
                  bgColor={form.bgColor}
                  qrData={form.qrData}
                  whoseSign={form.whoseSign || "CEO"}
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