"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export default function TemplateSetupPage() {
  const [instituteName, setInstituteName] = useState("")
  const [cardType, setCardType] = useState("")
  const [address, setAddress] = useState("")
  const [selectedColor, setSelectedColor] = useState("#1e3a8a")

  const colorOptions = [
    "#000000", // Black
    "#059669", // Green
    "#3b82f6", // Blue
    "#06b6d4", // Cyan
    "#10b981", // Emerald
    "#8b5cf6", // Purple
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="font-semibold text-blue-600">AutoIDGen</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                </svg>
                Dashboard
              </div>
            </div>

            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">R</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">ID Card Template Setup</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name</label>
                <Input
                  type="text"
                  placeholder="Type Institute Name"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID card Type</label>
                <Input
                  type="text"
                  placeholder="Type Student/Employee"
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <Textarea
                  placeholder="Type Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-24 resize-none"
                />
              </div>

              {/* Upload Sections */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Button variant="outline" className="w-full h-12 border-dashed bg-transparent">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Institution Logo
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full h-12 border-dashed bg-transparent">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Signature
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Preview
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Next</Button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <div className="text-right">
                <span className="text-sm font-medium text-gray-700">Preview</span>
              </div>

              <Card className="p-6 bg-white">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto">
                  <img
                    src="/student-id-card-template-with-photo-placeholder.jpg"
                    alt="ID Card Preview"
                    className="w-full h-auto"
                  />
                </div>
              </Card>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select photo Background Color</label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? "border-gray-400" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Profile Icon */}
              <div className="flex justify-end">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">R</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-4">
        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </Button>
      </footer>
    </div>
  )
}
