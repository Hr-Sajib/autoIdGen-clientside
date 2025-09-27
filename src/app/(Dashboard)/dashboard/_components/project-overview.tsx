'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, LucideCopy, LucideFolderOpen, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { projectApi, useCreateProjectMutation, useDeleteProjectMutation, useGetMyProjectQuery, useGetSpecificProjectQuery } from "@/lib/feature/Project/projectApi"
import { Project } from "@/types/inedx"
import { useAppDispatch } from "@/lib/hooks"
import { toast } from "sonner"

export function ProjectOverview() {
  const { data, isLoading, isError } = useGetMyProjectQuery(undefined)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [copyingId, setCopyingId] = useState<string | null>(null)

  const [deleteProject] = useDeleteProjectMutation()
  const [createProject] = useCreateProjectMutation()
  const dispatch = useAppDispatch()

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

  const handleCopyProject = async (projectId: string) => {
    setCopyingId(projectId)
    try {
      // 1. fetch project by id
      const res = await dispatch(
        projectApi.endpoints.getSpecificProject.initiate(projectId)
      ).unwrap()

      // console.log("Original project:", res)

      const original = res?.data
      if (!original) {
        alert("❌ Project not found")
        return
      }

      // 2. Build payload for new project
      const payload = {
        userId: original.userId,
        projectName: `${original.projectName} (Copy)`,
        templateId: original.templateId,
        institutionName: original.institutionName,
        institutionLogoUrl: original.institutionLogoUrl,
        institutionSignUrl: original.institutionSignUrl.signUrl,
        signRoleName: original.institutionSignUrl.roleName,
        cardType: original.cardType,
        cardQuantity: original.cardQuantity,
        address: original.address,
        personPhotoBGColorCode: original.personPhotoBGColorCode,
        // batchId: Math.floor(1000 + Math.random() * 9000), // new random batch
        additionalFields: original.additionalFields || [],
      }

      // 3. Create new project
      await createProject(payload).unwrap()

      toast.success("✅ Project copied successfully")
    } catch (err) {
      console.error("Failed to copy project:", err)
      toast.error("❌ Failed to copy project. Please try again.")
    } finally {
      setCopyingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this project?")
    if (!confirmDelete) return

    try {
      setDeletingId(id)
      await deleteProject(id).unwrap()
      setDeletingId(null)
    } catch (err) {
      console.error("Failed to delete project:", err)
      setDeletingId(null)
      alert("Failed to delete project. Please try again.")
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
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Institution/Company</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Card Type</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Total Cards</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Batch Code</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: Project) => (
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
                        onClick={() => handleCopy(project.batchId.toString(), project._id)}
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
                          <LucideFolderOpen />
                        </Button>
                      </Link>
                      {/* Copy Project icon */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleCopyProject(project._id)}
                        disabled={copyingId === project._id}
                      >
                        {copyingId === project._id ? (
                          <Loader2 className="animate-spin h-4 w-4 text-blue-600" />
                        ) : (
                          <LucideCopy />
                        )}
                      </Button>
                      {/* Delete icon */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDelete(project._id)}
                        disabled={deletingId === project._id}
                      >
                        <Trash2 className={deletingId === project._id ? "animate-pulse" : ""} />
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
