"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  initialData?: {
    name?: string
    department?: string
    roll?: string
    bloodGroup?: string
    dob?: string
    phone?: string
  }
}

export function EditModal({ isOpen, onClose, onSubmit, initialData }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    department: initialData?.department || "",
    roll: initialData?.roll || "",
    bloodGroup: initialData?.bloodGroup || "",
    dob: initialData?.dob || "",
    phone: initialData?.phone || "",
  })

  // Sync initial data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData?.name || "",
        department: initialData?.department || "",
        roll: initialData?.roll || "",
        bloodGroup: initialData?.bloodGroup || "",
        dob: initialData?.dob || "",
        phone: initialData?.phone || "",
      })
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      {/* Modal container */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Student/Employee Form Submission
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Student Name
            </label>
            <Input
              placeholder="Type Here"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department
            </label>
            <Input
              placeholder="Type Here"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Roll / Serial Number
            </label>
            <Input
              placeholder="Type Here"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              className="bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Blood Group
            </label>
            <Input
              placeholder="Type Here"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date of Birth
            </label>
            <Input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <Input
              placeholder="Type Here"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-100"
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Done
          </Button>
        </form>
      </div>
    </div>
  )
}
