"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import CardPreview from "../_components/CardPreview"
import { useRouter } from "next/navigation"
import StudentCard from "@/components/layout/cards/StudentCard"
import { DashboardHeader } from "../_components/dashboard-header"
import { LucideSignature, LucideUpload, LucideUser2 } from "lucide-react"

export default function InstituteTemplateSetupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    instituteName: "Eastern Mine School & College",
    idCardType: "Student",
    address: "21A/B mine union point, Singapore",
    department: "",
    roll: "",
    bloodGroup: "",
    dob: "",
    phone: "",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://via.placeholder.com/100",
    bgColor: "#0f172a",
    qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
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
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex flex-col md:flex-row justify-between gap-10 p-8">
        {/* ===== Left Form Section ===== */}
        <div className="flex-1 max-w-xl space-y-6">
          <h2 className="text-xl font-bold">ID Card Template Setup</h2>

          <div className="space-y-4">
            <Input
              name="instituteName"
              value={form.instituteName}
              onChange={handleChange}
              placeholder="Type Institute Name"
              className="bg-gray-100 py-6 px-4 rounded-lg"
            />
            <Input
              name="idCardType"
              value={form.idCardType}
              onChange={handleChange}
              placeholder="Type Student"
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
              name="roll"
              value={form.roll}
              onChange={handleChange}
              placeholder="Type Roll"
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
                  <LucideUpload /> Institution Logo
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
            <Button variant="secondary" disabled={!form.instituteName || !form.idCardType}>
              Preview
            </Button>
            <Button onClick={handleContinue} className="bg-blue-600">Next</Button>
          </div>
        </div>

        {/* ===== Right Preview Section ===== */}
        <div className="pr-32">
          {/* <CardPreview
          instituteName={form.instituteName}
          idCardType={form.idCardType}
          logoUrl={form.logoUrl}
          signatureUrl={form.signatureUrl}
          profileUrl={form.profileUrl}
          bgColor={form.bgColor}
        /> */}
          <StudentCard
            instituteName={form.instituteName}
            address={form.address}
            idCardType={form.idCardType}
            studentName={form.instituteName}
            department={form.department}
            roll={form.roll}
            bloodGroup={form.bloodGroup}
            dob={form.dob}
            phone={form.phone}
            logoUrl={form.logoUrl}
            signatureUrl={form.signatureUrl}
            profileUrl={form.profileUrl}
            // logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
            // signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
            // profileUrl="https://i.postimg.cc/Y0ydK27n/person.jpg"
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
