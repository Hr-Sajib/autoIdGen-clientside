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
import Loading from "@/app/loading"
import { useRouter } from "next/navigation"

export function ProjectOverview() {
  const router = useRouter()
  const { data, isLoading, isError } = useGetMyProjectQuery(undefined)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [copyingId, setCopyingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const [deleteProject] = useDeleteProjectMutation()
  const [createProject] = useCreateProjectMutation()
  const dispatch = useAppDispatch()

  const projects = data?.data ?? []

  // Filter projects based on search term
  const filteredProjects = projects.filter((project: Project) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    const projectName = project.projectName?.toLowerCase() || ""
    const institutionName = project.institutionName?.toLowerCase() || ""
    const batchCode = project.batchId?.toString().toLowerCase() || ""

    return projectName.includes(searchLower) ||
      institutionName.includes(searchLower) ||
      batchCode.includes(searchLower)
  })

  const handleCopy = async (text: string, id: string) => {
    if (typeof window === "undefined" || !navigator?.clipboard) {
      console.error("Clipboard API not available")
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
      console.log("Copied successfully:", text)
    } catch (err) {
      console.error("❌ Failed to copy text:", err)
      toast.error("Failed to copy batch ID")
    }
  }

  const handleCopyProject = async (projectId: string) => {
    setCopyingId(projectId)
    try {
      const res = await dispatch(
        projectApi.endpoints.getSpecificProject.initiate(projectId)
      ).unwrap()

      const original = res?.data
      if (!original) {
        toast.error("Project not found")
        return
      }

      const payload = {
        userId: original.userId,
        projectName: `${original.projectName} (Copy)`,
        templateId: original.templateId,
        institutionName: original.institutionName,
        institutionLogoUrl: original.institutionLogoUrl,
        institutionSignUrl: {
          roleName: original.institutionSignUrl.roleName,
          signUrl: original.institutionSignUrl.signUrl,
        },
        cardType: original.cardType,
        cardQuantity: original.cardQuantity,
        address: original.address,
        personPhotoBGColorCode: original.personPhotoBGColorCode,
        additionalFields: original.additionalFields || [],
      }

      await createProject(payload).unwrap()
      toast.success("Project copied successfully")
    } catch (err) {
      console.error("Failed to copy project:", err)
      toast.error("Failed to copy project. Please try again.")
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
      toast.success("Project deleted successfully")
    } catch (err) {
      console.error("Failed to delete project:", err)
      toast.error("Failed to delete project. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }






  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <p className="p-4 sm:p-6 text-red-500 text-center text-sm sm:text-base">Failed to load projects</p>
  }

  return (
    <Card className="bg-background border-border w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">All Projects</CardTitle>
          <div className="relative w-full sm:w-64">
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
            <Input
              placeholder="Search projects..."
              className="pl-10 w-full border border-gray-200 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop: Table Layout */}
        <div className="hidden sm:block overflow-x-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b-2 border-blue-600">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Project Name</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Institution</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Card Type</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Total Cards</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Batch Code</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project: Project) => (
                <tr
                  key={project._id}
                  className="border-b border-border hover:bg-muted/50 cursor-pointer"
                  onClick={() => router.push(`/dashboard/projects/${project._id}/edit`)}
                >
                  <td className="py-4 px-4 text-sm text-foreground">{project.projectName}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{project.institutionName}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{project.cardType}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{project.cardQuantity}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-foreground">{project.batchId}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={(e) => {
                          e.stopPropagation() // prevent row click
                          handleCopy(project.batchId.toString(), project._id)
                        }}
                      >
                        {copiedId === project._id ? (
                          <span className="text-green-600 text-xs">✔</span>
                        ) : (
                          <LucideCopy size={16} />
                        )}
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopyProject(project._id)
                        }}
                        disabled={copyingId === project._id}
                      >
                        {copyingId === project._id ? (
                          <Loader2 className="animate-spin h-4 w-4 text-blue-600" />
                        ) : (
                          <LucideCopy size={16} />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(project._id)
                        }}
                        disabled={deletingId === project._id}
                      >
                        <Trash2 size={16} className={deletingId === project._id ? "animate-pulse" : ""} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card Layout */}
        <div className="sm:hidden space-y-4">
          {filteredProjects.map((project: Project) => (
            <Card key={project._id} className="border-border bg-white">
              <Link href={`/dashboard/projects/${project._id}/edit`}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm text-foreground">{project.projectName}</h3>
                        <p className="text-xs text-muted-foreground">{project.institutionName}</p>
                      </div>
                      <div className="flex gap-1"> 

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
                            <LucideCopy size={14} />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDelete(project._id)}
                          disabled={deletingId === project._id}
                        >
                          <Trash2 size={14} className={deletingId === project._id ? "animate-pulse" : ""} />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-foreground">
                      <div>
                        <span className="font-medium">Card Type:</span> {project.cardType}
                      </div>
                      <div>
                        <span className="font-medium">Total Cards:</span> {project.cardQuantity}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Batch Code:</span> {project.batchId}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopy(project.batchId.toString(), project._id)}
                        >
                          {copiedId === project._id ? (
                            <span className="text-green-600 text-xs">✔</span>
                          ) : (
                            <LucideCopy size={12} />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Empty State: No Search Results */}
        {filteredProjects.length === 0 && projects.length > 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your search terms</p>
          </div>
        )}

        {/* Empty State: No Projects */}
        {projects.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No projects yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Get started by creating your first ID card project</p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1 sm:px-4 sm:py-2">
              <svg className="mr-1 sm:mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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