'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LucideEdit, Trash2, Loader2, LucideDownload } from "lucide-react"
import { DashboardHeader } from "../../../_components/dashboard-header"
import { EditCard } from "../../_components/EditCard"
import { useGetSpecificProjectQuery, useUpdateProjectMutation } from "@/lib/feature/Project/projectApi"
import { useCreateCardMutation, useDeleteCardMutation, useGetCardByBatchIdQuery, useUpdateCardMutation } from "@/lib/feature/Card/cardApi"
import { useParams } from "next/navigation"
import { Card, CardRow, Project } from "@/types/inedx"
import { EditProject } from "../../_components/EditProject"
import Image from "next/image"
import { downloadBulkExport } from "@/utils/bulkExport"

export default function ViewDetailsPage() {
  const params = useParams()
  const id = params?.id as string

  const { data: projectData, isLoading: projectLoading, error: projectError } = useGetSpecificProjectQuery(id)
  const [updateProject] = useUpdateProjectMutation()
  const project = projectData?.data

  const batchId = project?.batchId ?? ""; // always a string
  console.log("Batch ID:", batchId);

  const { data: cardData, isLoading: cardLoading } = useGetCardByBatchIdQuery(batchId, {
    skip: !project?.batchId, // safe: hook order stays the same
  });

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  const [cards, setCards] = useState<(CardRow)[]>([])
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)


  useEffect(() => {
    if (!project) return

    // create empty rows based on cardQuantity
    const rows = Array.from({ length: project.cardQuantity }, (_, i) => ({
      serialOrRollNumber: i + 1,
      serialStr: (i + 1).toString().padStart(2, "0"),
      batchId: project.batchId,
      name: "",
      status: "Pending" as const,
      additionalFields: {} as Record<string, string>,
      _id: "",
      setBy: "",
      personalPhotoUrl: "",
      additionalfieldValues: [] as Card["additionalfieldValues"],
    }))

    cardData?.data?.forEach((card: Card) => {
      const index = card.serialOrRollNumber - 1
      if (!rows[index]) return

      const fields: Record<string, string> = {}
      card.additionalfieldValues?.forEach((f) => {
        fields[f.fieldName] = f.fieldValue
      })

      rows[index] = {
        ...card,
        serialStr: card.serialOrRollNumber.toString().padStart(2, "0"),
        status: "Pending" as const,
        additionalFields: fields,
      }
    })

    setCards(rows)
  }, [cardData, project])



  const [search, setSearch] = useState("")
  const [editCardModalOpen, setEditCardModalOpen] = useState(false)
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)

  const handleEditProject = () => setEditProjectModalOpen(true)
  const handleProjectUpdate = async (formData: Project) => {
    if (!project?._id) return
    try {
      await updateProject({ id: project._id, data: formData }).unwrap()
      setEditProjectModalOpen(false)
    } catch (err) {
      console.error("Failed to update project", err)
    }
  }

  const handleEditCard = (card: Card) => {
    setSelectedCard(card)
    setEditCardModalOpen(true)
  }

  const handleUpdate = async (formData: Partial<Card>) => {
    try {
      if (selectedCard?._id) {
        // Update existing card
        await updateCard({ id: selectedCard._id, data: formData }).unwrap()
      } else {
        // Create new card
        await createCard({ ...formData, batchId: project?.batchId }).unwrap()
      }
      setEditCardModalOpen(false)
    } catch (error) {
      console.error("Failed to save card", error)
    }
  }

  const handleDeleteCard = async (card: Card) => {
    if (!card._id) return; // safety check
    try {
      await deleteCard(card._id).unwrap(); // pass ID directly

      // Remove card from local state to update UI immediately
      setCards((prev) => prev.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Failed to delete card", error);
    }
  };

  const handleDownloadCard = (card: Card) => {
    if (!card.cardImageUrl) {
      console.error("No card image available");
      return;
    }

    // Open the card image in a new tab
    const newWindow = window.open(card.cardImageUrl, "_blank");
    if (newWindow) {
      newWindow.document.title = `${card.name || card.serialOrRollNumber}-ID-Card`; // sets the tab title
      // Optional: Create an image element with download attribute
      const img = newWindow.document.createElement("img");
      img.src = card.cardImageUrl;
      img.alt = `${card.name || card.serialOrRollNumber} ID Card`;
      img.style.maxWidth = "100%";
      newWindow.document.body.style.margin = "0";
      newWindow.document.body.style.display = "flex";
      newWindow.document.body.style.justifyContent = "center";
      newWindow.document.body.style.alignItems = "center";
      newWindow.document.body.style.height = "100vh";
      newWindow.document.body.appendChild(img);
    } else {
      console.error("Failed to open new window for card download");
    }
  };

  if (projectLoading) return <div className="p-6">Loading project...</div>
  if (projectError) return <div className="p-6 text-red-500">Failed to load project</div>


  // const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    // setLoading(true);
    await downloadBulkExport(project.batchId)
    // setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="p-6 space-y-6">
        {/* Project Info */}
        {project && (
          <div className="flex items-center gap-6 border rounded-lg p-4 bg-white shadow-sm">
            <Image
              src={project.institutionLogoUrl}
              alt="Institution Logo"
              width={100}
              height={100}
              className="w-16 h-16 object-contain" />
            <div>
              <h2 className="text-xl font-bold">{project.projectName}</h2>
              <p className="text-gray-600">{project.institutionName}</p>
              <p className="text-sm text-gray-500">
                Batch: <span className="font-medium">{project.batchId}</span> | Cards:{" "}
                <span className="font-medium">{project.cardQuantity}</span> | Type:{" "}
                <span className="font-medium">{project.cardType}</span>
              </p>
              <p className="text-sm text-gray-500">Contact: {project.contactPhone} | Address: {project.address}</p>
            </div>
            {project.institutionSignUrl?.signUrl && (
              <div className="ml-auto text-center">
                <Image
                  src={project.institutionSignUrl.signUrl}
                  alt="Sign"
                  width={100}
                  height={100}
                  className="w-20 h-12 object-contain" />
                <p className="text-xs text-gray-500">{project.institutionSignUrl.roleName}</p>
              </div>
            )}
            <div>
              Edit
              <LucideEdit className="cursor-pointer" onClick={() => handleEditProject()} />
            </div>
          </div>
        )}

        {/* Search + Export */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Student Details</h2>
          <div className="flex gap-2">
            <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-60 bg-gray-100" />
            <Button
              onClick={handleExport}
              variant="outline">
              {/* {loading ? "Preparing..." : "Export"} */}
              Export
            </Button>

          </div>
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-700 font-medium">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Batch Code</th>
                <th className="px-4 py-2 border-b">Name</th>
                {project?.additionalFields?.map((field: string, idx: number) => (
                  <th key={idx} className="px-4 py-2 border-b">{field}</th>
                ))}
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cardLoading ? (
                <tr>
                  <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center py-6">
                    <Loader2 className="animate-spin mx-auto h-6 w-6 text-gray-500" />
                  </td>
                </tr>
              ) : cards.length > 0 ? (
                cards.map((card, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{card.serialStr}</td>
                    <td className="px-4 py-2 border-b">{card.batchId}</td>
                    <td className="px-4 py-2 border-b">{card.name || "-"}</td>
                    {project?.additionalFields?.map((field: string, i: number) => (
                      <td key={i} className="px-4 py-2 border-b">{card.additionalFields[field] || "-"}</td>
                    ))}
                    <td className="px-4 py-2 border-b">{card.status}</td>
                    <td className="px-4 py-2 border-b flex gap-3">
                      <button onClick={() => handleEditCard(card)}>
                        <LucideEdit size={18} className="text-gray-700 hover:text-indigo-600" />
                      </button>
                      <button onClick={() => handleDeleteCard(card)}>
                        <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                      </button>
                      <button onClick={() => handleDownloadCard(card)}>
                        <LucideDownload size={18} className="text-gray-700 hover:text-indigo-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center text-gray-500 py-6">
                    No student records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedCard && (
          <EditCard
            isOpen={editCardModalOpen}
            onClose={() => setEditCardModalOpen(false)}
            onSubmit={handleUpdate}
            initialData={selectedCard}
            projectAdditionalFields={project?.additionalFields || []}
          />

        )}

        {project && (
          <EditProject
            isOpen={editProjectModalOpen}
            onClose={() => setEditProjectModalOpen(false)}
            onSubmit={handleProjectUpdate}
            initialData={project}
          />
        )}
      </div>
    </div>
  )
}
