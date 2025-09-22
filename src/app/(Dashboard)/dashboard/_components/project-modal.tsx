"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (projectName: string) => void
}

export function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
  const router = useRouter()
  const [projectName, setProjectName] = useState("")

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (projectName.trim()) {
  //     onSubmit(projectName.trim())
  //     setProjectName("")
  //     onClose()
  //     router.push('/dashboard/select-card')
  //   }
  // }

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (projectName.trim()) {
    const finalName = projectName.trim()
    onSubmit(finalName)
    setProjectName("")
    onClose()

    // ✅ Pass project name via query param
    router.push(`/dashboard/select-card?projectName=${encodeURIComponent(finalName)}`)
  }
}

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      {/* Modal container */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Create New Project
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name
            </label>
            <Input
              type="text"
              placeholder="Enter your project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full h-11"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition disabled:opacity-50"
            disabled={!projectName.trim()}
            onClick={handleSubmit}
          >
            Create Project
          </Button>
        </form>
      </div>
    </div>
  )
}
