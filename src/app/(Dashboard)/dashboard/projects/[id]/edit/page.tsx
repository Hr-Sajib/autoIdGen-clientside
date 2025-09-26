'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LucideEdit, Trash2, Loader2, LucideDownload, Search } from "lucide-react"
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
    pollingInterval: 5000,
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
      status: "",
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
        name: card.name,
        status: card.status,
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
      newWindow.document.title = `${card.serialOrRollNumber || batchId}-ID-Card`; // sets the tab title
      // Optional: Create an image element with download attribute
      const img = newWindow.document.createElement("img");
      img.src = card.cardImageUrl;
      img.alt = `${card.serialOrRollNumber} ID Card`;
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
        {/* Project Info Card */}
        {project && (
          <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <Image src={project.institutionLogoUrl} alt="Logo" width={100} height={100} className="w-20 h-20 object-contain rounded-lg border" />
            <div className="flex-1 space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">{project.projectName}</h2>
              <p className="text-gray-600">{project.institutionName}</p>
              <p className="text-gray-500 text-sm">
                Batch: <span className="font-medium">{project.batchId}</span> | Cards: <span className="font-medium">{project.cardQuantity}</span> | Type: <span className="font-medium">{project.cardType}</span>
              </p>
              <p className="text-gray-500 text-sm">Contact: {project.contactPhone} | Address: {project.address}</p>
            </div>
            {project.institutionSignUrl?.signUrl && (
              <div className="text-center">
                <Image src={project.institutionSignUrl.signUrl} alt="Sign" width={100} height={50} className="object-contain rounded-md border" />
                <p className="text-xs text-gray-500">{project.institutionSignUrl.roleName}</p>
              </div>
            )}
            <button className="ml-auto text-indigo-600 hover:text-indigo-800 flex items-center gap-1" onClick={handleEditProject}>
              <LucideEdit /> Edit Project
            </button>
          </div>
        )}

        {/* Search + Export */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search by Roll, Name, etc."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gray-100"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button onClick={handleExport} variant="outline" className="bg-white hover:bg-gray-100 hover:text-gray-800">
            Export All
          </Button>
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 border-b">Sr.</th>
                <th className="px-4 py-3 border-b">Batch</th>
                <th className="px-4 py-3 border-b">Name</th>
                {project?.additionalFields?.map((field: string, idx: number) => (
                  <th key={idx} className="px-4 py-3 border-b">{field}</th>
                ))}
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Actions</th>
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
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 border-b">{card.serialStr}</td>
                    <td className="px-4 py-2 border-b">{card.batchId}</td>
                    <td className="px-4 py-2 border-b">{card.name}</td>
                    {project?.additionalFields?.map((field: string, i: number) => (
                      <td key={i} className="px-4 py-2 border-b">{card.additionalFields[field] || "-"}</td>
                    ))}
                    <td className="px-4 py-2 border-b">
                      {card.status === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      ) : card.status === "generated" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Generated
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <>
                        <button onClick={() => handleEditCard(card)} className="p-1 hover:bg-indigo-100 rounded">
                          <LucideEdit size={18} className="text-indigo-600" />
                        </button>
                        {card._id ? (
                          <>
                            <button onClick={() => handleDeleteCard(card)} className="p-1 hover:bg-red-100 rounded">
                              <Trash2 size={18} className="text-red-600" />
                            </button>
                            <button
                              onClick={() => handleDownloadCard(card)}
                              disabled={card.status.toLowerCase() === "pending"}
                              className={`p-1 rounded ${card.status.toLowerCase() === "pending"
                                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                              <LucideDownload size={18} />
                            </button>
                          </>
                        ) : (
                          // <span className="text-gray-500">—</span>
                          null
                        )}
                      </>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center py-6 text-gray-500">
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
