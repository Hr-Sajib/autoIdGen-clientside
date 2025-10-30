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
      {/* <header className="bg-[#4A61E4] md:bg-white/90 border-b sticky top-0 z-40 border-gray-200"> */}
      <header className="bg-[#4A61E4] md:bg-white/90  sticky top-0 z-30 md:z-40 ">



        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile: Show AutoIDGen branding */}
            <div className="hidden  items-center gap-2 ml-4 md:ml-12">
              <Link href="/" className="flex items-center text-[#4A61E4] space-x-2 font-bold text-lg">
                <span><BiIdCard size={30} /></span>
                <span className="text-[20px]">AutoIDGen</span>
              </Link>
            </div>

            {/* Desktop: Show Dashboard title */}
            <h1 className="md:hidden pl-12 text-white text-xl font-bold">Dashboard</h1>
            <h1 className="hidden md:block text-2xl font-bold text-gray-900">Dashboard</h1>


            {/* Mobile menu icon placeholder (handled by Sidebar component) */}
            <div className="md:hidden w-10"></div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="hover:border-white bg-white flex items-center justify-center hover:bg-[#4A61E4] text-[#4A61E4] hover:text-white text-xs md:text-base font-bold border md:border-2 border-[#4A61E4] p-0 md:px-2">
              <Plus className="mr-0 h-2 w-2 bg-[#4A61E4] hover:bg-white rounded-2xl text-white md:bg-transparent md:hover:bg-[#4A61E4] md:text-[#4A61E4]" />
              New Project
            </Button>
          </div>

          {/* Mobile: Dashboard navigation buttons */}
          {/* <div className="md:hidden mt-4 flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </div> */}
          
        </div>
      </header>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateProject} />
    </>
  )
}
