"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { Card } from "@/types/inedx"

interface EditCardProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Card>) => void
  initialData: Partial<Card>
  projectAdditionalFields: string[] // ✅ fixed: array of strings
}

export function EditCard({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  projectAdditionalFields,
}: EditCardProps) {
  const [form, setForm] = useState<Partial<Card>>(initialData)

  useEffect(() => {
    if (isOpen) {
      // Merge existing values with project fields
      const mergedFields =
        projectAdditionalFields?.map((fieldName) => {
          const existing = initialData.additionalfieldValues?.find(
            (f) => f.fieldName === fieldName
          )
          return {
            fieldName,
            fieldValue: existing?.fieldValue || "",
          }
        }) || []

      setForm({
        ...initialData,
        additionalfieldValues: mergedFields,
      })
    }
  }, [isOpen, initialData, projectAdditionalFields])

  // const handleChange = (key: keyof Card, value: any) => {
  const handleChange = <K extends keyof Card>(key: K, value: Card[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleFieldChange = (index: number, value: string) => {
    const updated = [...(form.additionalfieldValues || [])]
    updated[index] = { ...updated[index], fieldValue: value }
    setForm((prev) => ({ ...prev, additionalfieldValues: updated }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload: Partial<Card> = {
      ...form,
      _id: form._id || undefined,
      setBy: "owner",
    }
    console.log("Payload:", payload)

    onSubmit(payload)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {initialData?._id ? "Edit Card" : "Create Card"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Serial / Roll Number */}
          <div className="space-y-1">
            <Label>Serial / Roll Number</Label>
            <Input
              type="number"
              value={form.serialOrRollNumber || ""}
              onChange={(e) => handleChange("serialOrRollNumber", Number(e.target.value))}
              className="bg-gray-100"
            />
          </div>

          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-gray-100"
            />
          </div>

          {/* Personal Photo URL */}
          <div className="space-y-1">
            <Label>Personal Photo URL</Label>
            <Input
              value={form.personalPhotoUrl || ""}
              onChange={(e) => handleChange("personalPhotoUrl", e.target.value)}
              className="bg-gray-100"
            />
          </div>

          {/* Dynamic Additional Fields */}
          {form.additionalfieldValues?.map((field, idx) => (
            <div key={idx} className="space-y-1">
              <Label>{field.fieldName}</Label>
              <Input
                value={field.fieldValue}
                onChange={(e) => handleFieldChange(idx, e.target.value)}
                className="bg-gray-100"
              />
            </div>
          ))}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
            >
              {initialData?._id ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
