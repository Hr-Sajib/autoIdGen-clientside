"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CompanyTemplateSetupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    companyName: "",
    idCardType: "",
    address: "",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://via.placeholder.com/100", // demo profile
    bgColor: "#0f172a", // default dark blue
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
    router.push("/dashboard/student-information")
  }

  const colors = ["#0f172a", "#0ea5e9", "#3b82f6", "#06b6d4", "#9333ea", "#ec4899"]

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 p-8">
      {/* ===== Left Form Section ===== */}
      <div className="flex-1 max-w-md space-y-6">
        <h2 className="text-xl font-bold">ID Card Template Setup</h2>

        <div className="space-y-4">
          <Input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Type Company Name"
          />
          <Input
            name="idCardType"
            value={form.idCardType}
            onChange={handleChange}
            placeholder="Type Student/Employee"
          />
          <Input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Type Address"
          />

          {/* Upload Buttons */}
          <div className="flex gap-4">
            <label className="cursor-pointer">
              <span className="px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2">
                ⬆️ Institution Logo
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
                ✍️ Signature
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

        <div className="flex gap-4">
          <Button variant="secondary" disabled={!form.companyName || !form.idCardType}>
            Preview
          </Button>
          <Button onClick={handleContinue}>Next</Button>
        </div>
      </div>

      {/* ===== Right Preview Section ===== */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold">Preview</h3>

        {/* Card Preview */}
        <div className="w-64 h-[400px] bg-white rounded-xl shadow-lg overflow-hidden relative border">
          {/* Header wave shape */}
          <div
            className="h-24 relative flex items-center justify-center"
            style={{ backgroundColor: form.bgColor }}
          >
            {form.logoUrl && (
              <img
                src={form.logoUrl}
                alt="Logo"
                className="absolute top-3 left-3 w-12 h-12 object-cover"
              />
            )}
            <h1 className="text-white text-xs font-bold text-center px-4">
              {form.companyName || "Company Name"}
            </h1>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center -mt-10">
            <img
              src={form.profileUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow"
            />
            <h2 className="mt-2 text-sm font-bold text-gray-800">Mark Marshal</h2>
            <p className="text-xs text-gray-500">{form.idCardType || "Student"}</p>
          </div>

          {/* Details */}
          <div className="px-6 mt-4 text-xs text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Department:</span> CSE
            </p>
            <p>
              <span className="font-semibold">Roll:</span> 123
            </p>
            <p>
              <span className="font-semibold">Blood Group:</span> B+
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span> 12-12-2000
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +8801234XXXX
            </p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-3 w-full px-4 flex flex-col items-center">
            {form.signatureUrl && (
              <img
                src={form.signatureUrl}
                alt="Signature"
                className="w-16 h-8 object-contain mb-1"
              />
            )}
            <p className="text-[10px] text-gray-500">Principal Signature</p>
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex gap-2">
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
  )
}
