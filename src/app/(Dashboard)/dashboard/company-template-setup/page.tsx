"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LucideSignature, LucideUpload, LucideUser2 } from "lucide-react"
import EmployeeCard from "@/components/layout/cards/EmployeCard"

export default function CompanyTemplateSetupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    companyName: "ABC Group of Companies",
    idCardType: "Employee",
    address: "21A/B mine union point, Singapore",
    department: "",
    employeeId: "",
    bloodGroup: "",
    dob: "",
    phone: "",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://via.placeholder.com/100", // demo profile
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

  const handleContinue = () => {
    router.push("/dashboard/employee-information")
  }

  const colors = ["#0f172a", "#0ea5e9", "#3b82f6", "#06b6d4", "#9333ea", "#ec4899"]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row justify-between gap-10 p-8">
        {/* ===== Left Form Section ===== */}
        <div className="flex-1 max-w-xl space-y-6">
          <h2 className="text-xl font-bold">ID Card Template Setup</h2>

          <div className="space-y-4">
            <Input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Type Company Name"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />
            <Input
              name="idCardType"
              value={form.idCardType}
              onChange={handleChange}
              placeholder="Type Employee"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Type Address"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />
            <Input
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Type Department"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />
            <Input
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              placeholder="Type Employee ID"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />
            <Input
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              placeholder="Type Blood Group"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />
            <Input
              name="dob"
              value={form.dob}
              onChange={handleChange}
              placeholder="Type Date of Birth"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Type Phone"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />

            {/* Upload Buttons */}
            <div className="flex gap-4 pt-2">
              <label className="cursor-pointer">
                <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2">
                  <LucideUpload /> Company Logo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "logoUrl")}
                  className="hidden"
                />
              </label>

              <label className="cursor-pointer">
                <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2">
                  <LucideUser2 /> Profile Photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profileUrl")}
                  className="hidden"
                />
              </label>

              <label className="cursor-pointer">
                <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2">
                  <LucideSignature /> Signature
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "signatureUrl")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <Button variant="secondary" disabled={!form.companyName || !form.idCardType}>
              Preview
            </Button>
            <Button onClick={handleContinue} className="bg-blue-600">
              Next
            </Button>
          </div>
        </div>

        {/* ===== Right Preview Section ===== */}
        <div className="pr-32">
          <EmployeeCard
            companyName={form.companyName}
            address={form.address}
            idCardType={form.idCardType}
            employeeName={form.employeeName}
            department={form.department}
            employeeId={form.employeeId}
            bloodGroup={form.bloodGroup}
            dob={form.dob}
            phone={form.phone}
            logoUrl={form.logoUrl}
            signatureUrl={form.signatureUrl}
            profileUrl={form.profileUrl}
            bgColor={form.bgColor}
            qrData={form.qrData}
          />

          {/* Color Picker */}
          <div className="flex gap-2 mt-4">
            <p className="text-xs text-gray-500">Select photo Background Color</p>
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setForm({ ...form, bgColor: c })}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
