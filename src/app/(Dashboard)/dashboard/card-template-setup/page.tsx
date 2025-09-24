"use client"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import StudentCard from "@/components/layout/cards/StudentCard"
import { DashboardHeader } from "../_components/dashboard-header"
import { LucideSignature, LucideUpload } from "lucide-react"
import EmployeeCard from "@/components/layout/cards/EmployeCard"
import { toast } from "sonner"
import imageUpload from "@/utils/imageUpload"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InstituteTemplateSetupPage() {
  const router = useRouter()


  const searchParams = useSearchParams()
  // Get projectName from query param OR session storage
  const queryProjectName = searchParams.get("project")
  const savedFormData = sessionStorage.getItem("formData")
  const sessionProjectName = savedFormData ? JSON.parse(savedFormData).project : null
  const projectName = queryProjectName || sessionProjectName || ""

  const [selectedCard, setSelectedCard] = useState<"Student" | "Employee" | null>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const card = sessionStorage.getItem("selectedCard");
    if (card === "Student" || card === "Employee") {
      setSelectedCard(card);

      const savedFormData = sessionStorage.getItem("formData");
      const parsedData = savedFormData ? JSON.parse(savedFormData) : {};

      if (card === "Student") {
        setForm({
          project: parsedData.project || "",
          instituteName: parsedData.instituteName || "",
          idCardType: parsedData.idCardType || "Student",
          address: parsedData.address || "",
          department: parsedData.department || "",
          roll: parsedData.roll || "",
          bloodGroup: parsedData.bloodGroup || "",
          dob: parsedData.dob || "",
          phone: parsedData.phone || "",
          logoUrl: parsedData.logoUrl || "",
          signatureUrl: parsedData.signatureUrl || "",
          profileUrl: parsedData.profileUrl,
          bgColor: parsedData.bgColor || "#0f172a",
          qrData: parsedData.qrData,
          whoseSign: parsedData.whoseSign || "",
          cardOrientation: parsedData.cardOrientation || "horizontal",
        });
      } else if (card === "Employee") {
        setForm({
          project: parsedData.project || "",
          instituteName: parsedData.instituteName || "", // can be companyName
          idCardType: parsedData.idCardType || "Employee",
          address: parsedData.address || "",
          department: parsedData.department || "",
          employeeId: parsedData.employeeId || "",
          bloodGroup: parsedData.bloodGroup || "",
          dob: parsedData.dob || "",
          phone: parsedData.phone || "",
          logoUrl: parsedData.logoUrl || "",
          signatureUrl: parsedData.signatureUrl || "",
          profileUrl: parsedData.profileUrl,
          bgColor: parsedData.bgColor || "#0f172a",
          qrData: parsedData.qrData,
          whoseSign: parsedData.whoseSign || "",
          cardOrientation: parsedData.cardOrientation || "horizontal",
        });
      }
    }
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      try {
        toast.loading("Uploading image...")

        const uploadedUrl = await imageUpload(file)

        toast.dismiss() // remove loading
        if (uploadedUrl) {
          setForm({ ...form, [field]: uploadedUrl })
          toast.success("Image uploaded successfully!", { duration: 4000 })
        } else {
          toast.error("Failed to upload image", {
            duration: 6000,
            className: "bg-red-600 text-white font-semibold shadow-lg",
          })
        }
      } catch (error) {
        toast.dismiss()
        toast.error("Error uploading image!", {
          duration: 6000,
          className: "bg-red-600 text-white font-semibold shadow-lg",
        })
      }
    }
  }

  // Load saved form on mount
  useEffect(() => {
    if (savedFormData) {
      setForm((prev: any) => {
        const parsed = JSON.parse(savedFormData)
        return {
          ...prev,
          ...parsed,
          cardOrientation: parsed.cardOrientation || "horizontal", // ✅ fallback here
        }
      })
    }
  }, [])

  // Always ensure project is set
  const project = projectName || "Project"

  // Previous button
  const handlePrevious = () => {
    sessionStorage.setItem("formData", JSON.stringify(form))
    router.push(`/dashboard/select-card?project=${project}`)
  }

  // Next button
  const handleNext = () => {
    sessionStorage.setItem("formData", JSON.stringify(form))
    router.push(`/dashboard/card-information?project=${project}`)
  }

  const colors = ["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7"]

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Form Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  ID Card Template Setup
                </h1>
              </div>

              <div className="space-y-6">
                {/* Institute Name */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-700">
                    {selectedCard === "Employee" ? "Company Name" : "Institute Name"}
                  </label>
                  <Input
                    name="instituteName"
                    value={form.instituteName}
                    onChange={handleChange}
                    placeholder={
                      selectedCard === "Employee" ? "Type Company Name" : "Type Institute Name"}
                    className="mt-1 h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
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
                      {selectedCard === "Employee" ? (
                        <SelectItem value="Employee">Employee</SelectItem>
                      ) : (
                        <SelectItem value="Student">Student</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-700">
                    Address
                  </label>
                  <Input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Type Address"
                    className="mt-1 h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
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
                    placeholder="Whose sign"
                    className="mt-1 h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                {/* Upload Buttons */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="cursor-pointer flex-1">
                      <div className="mt-1 h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                        <LucideUpload size={20} className="text-gray-600" />
                        <span className="text-gray-700 text-xl font-medium">Institution Logo</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "logoUrl")}
                        className="hidden"
                      />
                    </label>

                    <label className="cursor-pointer flex-1">
                      <div className="mt-1 h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
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
                    className="flex-1 h-14 text-gray-600 border-gray-300 rounded-xl text-lg font-medium hover:bg-gray-100 hover:text-gray-900"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
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
                      onClick={() => {
                        const updatedForm = { ...form, cardOrientation: "horizontal" }
                        setForm(updatedForm)
                        sessionStorage.setItem("formData", JSON.stringify(updatedForm))
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${form.cardOrientation === "horizontal"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Horizontal
                    </button>
                    <button
                      onClick={() => {
                        const updatedForm = { ...form, cardOrientation: "vertical" }
                        setForm(updatedForm)
                        sessionStorage.setItem("formData", JSON.stringify(updatedForm))
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${form.cardOrientation === "vertical"
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
                {/* {selectedCard === "Employee" ? ( */}
                {form.cardOrientation === "vertical" ? (
                  <EmployeeCard
                    name="Name"
                    companyName={form.instituteName || "SM Technology, bdCalling IT Ltd."}
                    address={form.address || "21A/B mine union point, Singapore"}
                    idCardType={form.idCardType || "Employee"}
                    employeeName="Name"
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
                    whoseSign={form.whoseSign || "General Manager"}
                    personImage={form.profileUrl}
                    logo={form.logoUrl}
                    signature={form.signatureUrl}
                  />
                ) : (
                  <StudentCard
                    instituteName={form.instituteName || "Milestone School & College, Singapore"}
                    address={form.address || "21A/B mine union point, Singapore"}
                    idCardType={form.idCardType || "Student"}
                    studentName="Name"
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
                    whoseSign={form.whoseSign || "Principal"}
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
                      className={`w-8 h-8 rounded-full border-2 transition-all ${form.bgColor === color
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
      </main>
    </div>
  )
}
