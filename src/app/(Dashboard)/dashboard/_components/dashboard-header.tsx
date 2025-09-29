"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Home } from "lucide-react"
import { CreateProjectModal } from "./project-modal"
import Link from "next/link"
import { BiIdCard } from "react-icons/bi"

export function DashboardHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateProject = (projectName: string) => {
    // console.log("Creating project:", projectName)
    // Here you would typically handle the project creation logic
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile: Show AutoIDGen branding */}
            <div className="md:hidden flex items-center gap-2 ml-12">
              <Link href="/" className="flex items-center text-[#4A61E4] space-x-2 font-bold text-lg">
                <span><BiIdCard size={30} /></span>
                <span className="text-[20px]">AutoIDGen</span>
              </Link>
            </div>

            {/* Desktop: Show Dashboard title */}
            <h1 className="hidden md:block text-2xl font-bold text-gray-900">Dashboard</h1>

            {/* Mobile menu icon placeholder (handled by Sidebar component) */}
            <div className="md:hidden w-10"></div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-bold border-2 border-blue-600">
              <Plus className="mr-0 h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Mobile: Dashboard navigation buttons */}
          <div className="md:hidden mt-4 flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateProject} />
    </>
  )
}
