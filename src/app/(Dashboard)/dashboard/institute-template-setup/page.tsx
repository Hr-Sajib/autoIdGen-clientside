"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CardPreview from "../_components/CardPreview"
import { useRouter } from "next/navigation"

export default function InstituteTemplateSetupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    instituteName: "",
    idCardType: "",
    address: "",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://via.placeholder.com/100",
    bgColor: "#0f172a",
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
            name="instituteName"
            value={form.instituteName}
            onChange={handleChange}
            placeholder="Type Institute Name"
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
          <Button variant="secondary" disabled={!form.instituteName || !form.idCardType}>
            Preview
          </Button>
          <Button onClick={handleContinue}>Next</Button>
        </div>
      </div>

      {/* ===== Right Preview Section ===== */}
      <div>
        <CardPreview
          instituteName={form.instituteName}
          idCardType={form.idCardType}
          logoUrl={form.logoUrl}
          signatureUrl={form.signatureUrl}
          profileUrl={form.profileUrl}
          bgColor={form.bgColor}
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
  )
}
