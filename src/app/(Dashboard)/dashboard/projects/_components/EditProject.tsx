"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface EditProjectProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: {
    _id: string
    userId: string
    templateId: string
    batchId: number
    projectName: string
    institutionName: string
    institutionLogoUrl: string
    institutionSignUrl: { signUrl: string; roleName: string }
    cardQuantity: number
    cardType: string
    address: string
    contactPhone: string
    additionalFields: string // backend expects string
  }) => void
  initialData?: {
    _id?: string
    userId?: string
    templateId?: string
    batchId?: number
    projectName?: string
    institutionName?: string
    institutionLogoUrl?: string
    institutionSignUrl?: { signUrl: string; roleName: string }
    cardQuantity?: number
    cardType?: string
    address?: string
    contactPhone?: string
    additionalFields?: string[] // store internally as array
  }
}

export function EditProject({ isOpen, onClose, onSubmit, initialData }: EditProjectProps) {
  const [formData, setFormData] = useState({
    _id: initialData?._id || "",
    userId: initialData?.userId || "",
    templateId: initialData?.templateId || "",
    batchId: initialData?.batchId || 0,
    projectName: initialData?.projectName || "",
    institutionName: initialData?.institutionName || "",
    institutionLogoUrl: initialData?.institutionLogoUrl || "",
    institutionSignUrl: initialData?.institutionSignUrl || { signUrl: "", roleName: "" },
    cardQuantity: initialData?.cardQuantity || 0,
    cardType: initialData?.cardType || "",
    address: initialData?.address || "",
    contactPhone: initialData?.contactPhone || "",
    additionalFields: initialData?.additionalFields || [],
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        _id: initialData?._id || "",
        userId: initialData?.userId || "",
        templateId: initialData?.templateId || "",
        batchId: initialData?.batchId || 0,
        projectName: initialData?.projectName || "",
        institutionName: initialData?.institutionName || "",
        institutionLogoUrl: initialData?.institutionLogoUrl || "",
        institutionSignUrl: initialData?.institutionSignUrl || { signUrl: "", roleName: "" },
        cardQuantity: initialData?.cardQuantity || 0,
        cardType: initialData?.cardType || "",
        address: initialData?.address || "",
        contactPhone: initialData?.contactPhone || "",
        additionalFields: initialData?.additionalFields || [],
      })
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "cardQuantity" || name === "batchId" ? Number(value) : value,
    })
  }

  const handleSignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      institutionSignUrl: { ...formData.institutionSignUrl, [name]: value },
    })
  }

  const handleAdditionalFieldsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(",").map(f => f.trim())
    setFormData({ ...formData, additionalFields: values })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Convert additionalFields to string for backend
    const payload = {
      ...formData,
      additionalFields: formData.additionalFields.join(", "),
    }
    onSubmit(payload)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="userId" value={formData.userId} onChange={handleChange} placeholder="User ID" />
          <Input name="templateId" value={formData.templateId} onChange={handleChange} placeholder="Template ID" />
          <Input name="batchId" value={formData.batchId} onChange={handleChange} placeholder="Batch ID" />
          <Input name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Project Name" />
          <Input name="institutionName" value={formData.institutionName} onChange={handleChange} placeholder="Institution Name" />
          <Input name="institutionLogoUrl" value={formData.institutionLogoUrl} onChange={handleChange} placeholder="Institution Logo URL" />
          <Input name="signUrl" value={formData.institutionSignUrl.signUrl} onChange={handleSignChange} placeholder="Institution Sign URL" />
          <Input name="roleName" value={formData.institutionSignUrl.roleName} onChange={handleSignChange} placeholder="Sign Role Name" />
          <Input name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="Contact Phone" />
          <Input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <Input type="number" name="cardQuantity" value={formData.cardQuantity} onChange={handleChange} placeholder="Card Quantity" />
          <Input name="cardType" value={formData.cardType} onChange={handleChange} placeholder="Card Type" />
          <Input
            name="additionalFields"
            value={formData.additionalFields.join(", ")}
            onChange={handleAdditionalFieldsChange}
            placeholder="Additional Fields (comma separated)"
          />

          <Button
            type="submit"
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}
