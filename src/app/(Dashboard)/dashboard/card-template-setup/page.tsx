"use client"

import React, { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import StudentCard from "@/components/layout/cards/StudentCard"
import { DashboardHeader } from "../_components/dashboard-header"
import { LucideSignature, LucideUpload, Edit3, X } from "lucide-react"
import EmployeeCard from "@/components/layout/cards/EmployeCard"
import { toast } from "sonner"
import imageUpload from "@/utils/imageUpload"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Signature Customization Modal Component
const SignatureCustomizationModal = ({
  isOpen,
  onClose,
  onSave,
  initialImage
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (processedImage: string) => void;
  initialImage: string | null;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (initialImage && isOpen) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = initialImage;
      img.onload = () => setImage(img);
    }
  }, [initialImage, isOpen]);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.filter = `
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
    `;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    setPreview(canvas.toDataURL("image/jpeg"));
  }, [image, brightness, contrast, saturation]);

  const handleSave = async () => {
    if (!preview) return;

    try {
      toast.loading("Uploading image...")

      const response = await fetch(preview);
      const blob = await response.blob();
      const file = new File([blob], "signature.jpg", { type: "image/jpeg" });

      const uploadedUrl = await imageUpload(file);

      toast.dismiss()
      if (uploadedUrl) {
        onSave(uploadedUrl);
        onClose();
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 space-y-4 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Customize Signature</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Edited Preview"
            className="mt-4 max-w-xs rounded shadow mx-auto block"
          />
        )}

        <div className="space-y-2">
          <label>
            Exposure (Brightness): {brightness}%
            <input
              type="range"
              min="50"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label>
            Contrast: {contrast}%
            <input
              type="range"
              min="50"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label>
            Saturation: {saturation}%
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save
          </Button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

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
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [tempSignatureImage, setTempSignatureImage] = useState<string | null>(null);

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

      // If it's a signature upload, show customization modal first
      if (field === "signatureUrl") {
        const reader = new FileReader();
        reader.onload = (event) => {
          setTempSignatureImage(event.target?.result as string);
          setShowSignatureModal(true);
        };
        reader.readAsDataURL(file);
        return;
      }

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
        let message = "Error uploading image!"

        if (error instanceof Error) {
          message = error.message
        }

        toast.dismiss()
        toast.error(message, {
          duration: 6000,
          className: "bg-red-600 text-white font-semibold shadow-lg",
        })
      }
    }
  }

  const handleSignatureSave = (processedImageUrl: string) => {
    setForm({ ...form, signatureUrl: processedImageUrl });
    setTempSignatureImage(null);
  };

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

  const requiredFields = [
    "instituteName",
    "idCardType",
    "address",
    "whoseSign",
    "logoUrl",
    "signatureUrl",
  ];

  // if (selectedCard === "Student") {
  //   requiredFields.push("department", "roll", "bloodGroup", "dob", "phone");
  // } else if (selectedCard === "Employee") {
  //   requiredFields.push("department", "employeeId", "bloodGroup", "dob", "phone");
  // }

  // Previous button
  const handlePrevious = () => {
    sessionStorage.setItem("formData", JSON.stringify(form))
    router.push(`/dashboard/select-card?project=${project}`)
  }

  // Next button
  const handleNext = () => {
    // Check required fields
    const missingFields = requiredFields.filter((field) => !form[field] || form[field].toString().trim() === "");

    if (missingFields.length > 0) {
      // Show toaster with first missing field
      toast.error(`Please fill out the ${missingFields[0]} field.`, {
        duration: 4000,
        className: "bg-red-600 text-white font-semibold shadow-lg",
      });
      return; // stop proceeding
    }

    // If all fields are filled
    sessionStorage.setItem("formData", JSON.stringify(form));
    router.push(`/dashboard/card-information?project=${project}`);
  }

  const colors = ["#ffffff" ,"#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7"]

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
                        <Edit3 size={20} className="text-gray-600" />
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
                {form.cardOrientation === "vertical" ? (
                  <EmployeeCard
                    name="Name"
                    companyName={form.instituteName || "Example Company"}
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
                    whoseSign={form.whoseSign}
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

      <SignatureCustomizationModal
        isOpen={showSignatureModal}
        onClose={() => {
          setShowSignatureModal(false);
          setTempSignatureImage(null);
        }}
        onSave={handleSignatureSave}
        initialImage={tempSignatureImage}
      />
    </div>
  )
}