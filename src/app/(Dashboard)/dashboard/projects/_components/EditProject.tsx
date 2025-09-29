"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, X } from "lucide-react"

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
    additionalFields?: { _id?: string; fieldName: string; defaultValue: string }[] // store as array of objects
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

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

  const handleAdditionalFieldsNameChange = (index: number, value: string) => {
    const updatedFields = [...formData.additionalFields]
    updatedFields[index] = { ...updatedFields[index], fieldName: value }
    setFormData({ ...formData, additionalFields: updatedFields })
  }

  const handleAdditionalFieldsChange = (index: number, value: string) => {
    const updatedFields = [...formData.additionalFields]
    updatedFields[index] = { ...updatedFields[index], defaultValue: value }
    setFormData({ ...formData, additionalFields: updatedFields })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // If backend expects string: join values
    const payload = {
      ...formData,
      additionalFields: formData.additionalFields.map(f => (typeof f === "string" ? f : {
        fieldName: f.fieldName,
        defaultValue: f.defaultValue,
      })),
    }
    onSubmit(payload)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-scaleIn 
  max-h-[90vh] overflow-y-auto">        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Batch ID */}
          <div className="space-y-1">
            <label htmlFor="batchId" className="text-sm font-medium text-gray-700">Batch ID</label>
            <Input
              id="batchId"
              name="batchId"
              value={formData.batchId}
              onChange={handleChange}
              placeholder="Batch ID"
              className='bg-gray-100'
            />
          </div>

          {/* Project Name */}
          <div className="space-y-1">
            <label htmlFor="projectName" className="text-sm font-medium text-gray-700">Project Name</label>
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Project Name"
              className='bg-gray-100'
            />
          </div>

          {/* Institution Name */}
          <div className="space-y-1">
            <label htmlFor="institutionName" className="text-sm font-medium text-gray-700">Institution Name</label>
            <Input
              id="institutionName"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              placeholder="Institution Name"
              className='bg-gray-100'
            />
          </div>

          {/* Institution Logo URL */}
          <div className="space-y-1">
            <label htmlFor="institutionLogoUrl" className="text-sm font-medium text-gray-700">Institution Logo URL</label>
            <Input
              id="institutionLogoUrl"
              name="institutionLogoUrl"
              value={formData.institutionLogoUrl}
              onChange={handleChange}
              placeholder="Institution Logo URL"
              className='bg-gray-100'
            />
          </div>

          {/* Institution Sign URL */}
          <div className="space-y-1">
            <label htmlFor="signUrl" className="text-sm font-medium text-gray-700">Institution Sign URL</label>
            <Input
              id="signUrl"
              name="signUrl"
              value={formData.institutionSignUrl.signUrl}
              onChange={handleSignChange}
              placeholder="Institution Sign URL"
              className='bg-gray-100'
            />
          </div>

          {/* Sign Role Name */}
          <div className="space-y-1">
            <label htmlFor="roleName" className="text-sm font-medium text-gray-700">Sign Role Name</label>
            <Input
              id="roleName"
              name="roleName"
              value={formData.institutionSignUrl.roleName}
              onChange={handleSignChange}
              placeholder="Sign Role Name"
              className='bg-gray-100'
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className='bg-gray-100'
            />
          </div>

          {/* Card Quantity */}
          <div className="space-y-1">
            <label htmlFor="cardQuantity" className="text-sm font-medium text-gray-700">Card Quantity</label>
            <Input
              id="cardQuantity"
              type="number"
              name="cardQuantity"
              value={formData.cardQuantity}
              onChange={handleChange}
              placeholder="Card Quantity"
              className='bg-gray-100'
            />
          </div>

          {/* Card Type */}
          <div className="space-y-1">
            <label htmlFor="cardType" className="text-sm font-medium text-gray-700">Card Type</label>
            <Input
              id="cardType"
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              placeholder="Card Type"
              className='bg-gray-100'
            />
          </div>

          {/* Additional Fields */}
          {formData.additionalFields.map((field, index) => (
            <div key={field._id || index} className="space-y-2">
              <div className="flex items-center gap-2">
                {editingIndex === index ? (
                  <Input
                    value={field.fieldName}
                    onChange={(e) => handleAdditionalFieldsNameChange(index, e.target.value)}
                    onBlur={() => setEditingIndex(null)} // exit edit mode on blur
                    placeholder="Enter field name"
                    className="bg-white"
                    autoFocus
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-700">
                    {field.fieldName}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setEditingIndex(index)}
                  className="p-1 rounded hover:bg-gray-200 transition"
                >
                  <Pencil className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <Input
                value={field.defaultValue}
                onChange={(e) => handleAdditionalFieldsChange(index, e.target.value)}
                placeholder={`Enter ${field.fieldName}`}
                className="bg-gray-100"
              />
            </div>
          ))}

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
