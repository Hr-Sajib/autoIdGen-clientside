'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LucideCopy, LucideEdit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useGetMyProjectQuery } from "@/lib/feature/Project/projectApi"

export function ProjectOverview() {
  const { data, isLoading, isError } = useGetMyProjectQuery(undefined)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  console.log(data)

  // API gives { success, message, data: [...] }
const projects = data?.data ?? []
  console.log("Projects data:", projects)
  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)

      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  if (isLoading) {
    return <p className="p-6 text-muted-foreground">Loading projects...</p>
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load projects</p>
  }

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground">All Projects</CardTitle>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input placeholder="Search" className="pl-10 w-64 border border-gray-200" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-b-blue-600 border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Project Name</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Institution</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Card Type</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Total Cards</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Batch Code</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: any) => (
                <tr key={project._id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4 font-medium text-foreground">{project.projectName}</td>
                  <td className="py-4 px-4 text-foreground">{project.institutionName}</td>
                  <td className="py-4 px-4 text-foreground">{project.cardType}</td>
                  <td className="py-4 px-4 text-foreground">{project.cardQuantity}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{project.batchId}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleCopy(project.batchId, project._id)}
                      >
                        {copiedId === project._id ? (
                          <span className="text-green-600 text-xs">✔</span>
                        ) : (
                          <LucideCopy />
                        )}
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {/* Edit icon */}
                      <Link href={`/dashboard/projects/${project._id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <LucideEdit />
                        </Button>
                      </Link>
                      {/* Delete icon */}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first ID card project</p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
