"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { Card } from "@/types/inedx"
import { toast } from "sonner"
import imageUpload from "@/utils/imageUpload"

interface EditCardProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Card>) => void
  initialData: Partial<Card>
  projectAdditionalFields: string[] // Aligned with parent component
}

export function EditCard({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  projectAdditionalFields,
}: EditCardProps) {
  const [form, setForm] = useState<Partial<Card>>(initialData)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (isOpen) {
      // Merge existing values with project fields
      const mergedFields = projectAdditionalFields.map((fieldName) => {
        const existing = initialData.additionalfieldValues?.find(
          (f) => f.fieldName === fieldName
        )
        return {
          fieldName,
          fieldValue: existing?.fieldValue || "", // No defaultValue since parent passes string array
        }
      })

      setForm({
        ...initialData,
        additionalfieldValues: mergedFields,
      })
      setErrors({}) // Reset errors when modal opens
    }
  }, [isOpen, initialData])

  const handleChange = <K extends keyof Card>(key: K, value: Card[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const handleFieldChange = (index: number, value: string) => {
    const updated = [...(form.additionalfieldValues || [])]
    updated[index] = { ...updated[index], fieldValue: value }
    setForm((prev) => ({ ...prev, additionalfieldValues: updated }))
    setErrors((prev) => ({ ...prev, [`field-${index}`]: "" }))
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast.loading("Uploading image...", { id: "upload" });

    const url = await imageUpload(file);
    if (url) {
      handleChange("personalPhotoUrl", url);
      toast.success("Image uploaded successfully!", { id: "upload" });
    } else {
      toast.error("Failed to upload image.", { id: "upload" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    // Validate Serial/Roll Number
    if (!form.serialOrRollNumber || form.serialOrRollNumber <= 0) {
      newErrors.serialOrRollNumber = "Serial/Roll Number must be a positive number"
    }

    // Validate Name
    if (!form.name?.trim()) {
      newErrors.name = "Name is required"
    }

    // Optional Additional Fields Validation
    form.additionalfieldValues?.forEach((field, idx) => {
      if (field.fieldValue?.trim()) { // Only validate if user filled something
        if (field.fieldName === "Contact no.") {
          const phoneRegex = /^(0|\+)[0-9X-]{7,}$/
          if (!phoneRegex.test(field.fieldValue)) {
            newErrors[`field-${idx}`] = "Invalid phone number format (e.g., 01XXXXXXX)"
          }
        } else if (field.fieldName === "Date of Birth") {
          const dateRegex = /^[0-9a-zA-Z/-]+$/
          if (!dateRegex.test(field.fieldValue)) {
            newErrors[`field-${idx}`] = "Invalid date format (e.g., DD/MM/YYYY)"
          }
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please correct the errors in the form", {
        duration: 4000,
        className: "bg-red-600 text-white font-semibold rounded-lg shadow-lg",
      })
      return
    }

    const payload: Partial<Card> = {
      ...form,
      _id: form._id || undefined,
      name: form.name?.trim(),
      personalPhotoUrl: form.personalPhotoUrl?.trim(),
      additionalfieldValues: form.additionalfieldValues?.map((field) => ({
        fieldName: field.fieldName,
        fieldValue: field.fieldValue.trim(),
        setBy: "owner",
      })),
    }
    console.dir({ submittedPayload: payload }, { depth: null })

    onSubmit(payload)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-5">
          {initialData?._id ? "Edit Card" : "Create Card"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Serial / Roll Number */}
          <div className="space-y-1.5">
            <Label htmlFor="serialOrRollNumber" className="text-sm font-medium text-gray-700">
              Serial / Roll Number
            </Label>
            <Input
              id="serialOrRollNumber"
              type="number"
              value={form.serialOrRollNumber || ""}
              onChange={(e) => handleChange("serialOrRollNumber", Number(e.target.value))}
              className={`bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-colors ${errors.serialOrRollNumber ? "border-red-500" : ""
                }`}
              placeholder="Enter serial or roll number"
            />
            {errors.serialOrRollNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.serialOrRollNumber}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-colors ${errors.name ? "border-red-500" : ""
                }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Personal Photo URL */}
          <div className="space-y-1.5">
            <Label htmlFor="personalPhotoUrl" className="text-sm font-medium text-gray-700">
              Personal Photo (Optional)
            </Label>

            {/* Preview uploaded image */}
            {form.personalPhotoUrl && (
              <img
                src={form.personalPhotoUrl}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-lg mb-2 border border-gray-200"
              />
            )}

            <Input
              id="personalPhotoUrl"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-colors"
            />
          </div>

          {/* Dynamic Additional Fields */}
          {form.additionalfieldValues?.map((field, idx) => (
            <div key={idx} className="space-y-1.5">
              <Label htmlFor={`field-${idx}`} className="text-sm font-medium text-gray-700">
                {projectAdditionalFields[idx] || field.fieldName}
              </Label>
              <Input
                id={`field-${idx}`}
                value={field.fieldValue}
                onChange={(e) => handleFieldChange(idx, e.target.value)}
                className={`bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-colors ${errors[`field-${idx}`] ? "border-red-500" : ""
                  }`}
                placeholder={`Enter ${projectAdditionalFields[idx]?.toLowerCase() || field.fieldName.toLowerCase()}`}
              />
              {errors[`field-${idx}`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`field-${idx}`]}</p>
              )}
            </div>
          ))}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
            >
              {initialData?._id ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}