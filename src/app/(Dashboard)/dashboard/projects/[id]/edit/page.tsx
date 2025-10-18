
// 'use client'

// import { useState, useEffect } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { LucideEdit, Trash2, Loader2, LucideDownload, Search, User } from "lucide-react"
// import { DashboardHeader } from "../../../_components/dashboard-header"
// import { EditCard } from "../../_components/EditCard"
// import { useGetSpecificProjectQuery, useUpdateProjectMutation } from "@/lib/feature/Project/projectApi"
// import { useCreateCardMutation, useDeleteCardMutation, useGetCardByBatchIdQuery, useUpdateCardMutation } from "@/lib/feature/Card/cardApi"
// import { useParams } from "next/navigation"
// import { Card, CardRow, Project } from "@/types/inedx"
// import { EditProject } from "../../_components/EditProject"
// import Image from "next/image"
// import { downloadBulkExport } from "@/utils/bulkExport"
// import Loading from "@/app/loading"
// import ExportLoading from "../../../_components/ExportLoading"
// import Link from "next/link"
// import UserQRCode from "@/components/layout/UserQRCode"

// export default function ViewDetailsPage() {
//   const [loading, setLoading] = useState(false);
//   const [cards, setCards] = useState<(CardRow)[]>([])
//   const [search, setSearch] = useState("")
//   const [editCardModalOpen, setEditCardModalOpen] = useState(false)
//   const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null)

//   const params = useParams()
//   const id = params?.id as string

//   const { data: projectData, isLoading: projectLoading, error: projectError } = useGetSpecificProjectQuery(id)
//   const [updateProject] = useUpdateProjectMutation()
//   const project = projectData?.data

//   const batchId = project?.batchId ?? "";
//   const { data: cardData, isLoading: cardLoading } = useGetCardByBatchIdQuery(batchId, {
//     skip: !project?.batchId,
//   });

//   console.log("debugging ========================", cardData);

//   const [createCard] = useCreateCardMutation()
//   const [updateCard] = useUpdateCardMutation()
//   const [deleteCard] = useDeleteCardMutation()

//   // Calculate card statistics
//   const cardStats = {
//     total: project?.cardQuantity || 0,
//     generated: cards.filter(card => card.status === "generated").length,
//     processing: cards.filter(card => card.status === "processing").length,
//     unfilled: 0
//   }
//   // Unfilled = Total - (Generated + Processing)
//   cardStats.unfilled = cardStats.total - (cardStats.generated + cardStats.processing)

//   useEffect(() => {
//     if (!project) return

//     const rows = Array.from({ length: project.cardQuantity }, (_, i) => {
//       const additionalFieldsObj: Record<string, string> = {};
//       project.additionalFields.forEach((field: any) => {
//         additionalFieldsObj[field.fieldName] = field.defaultValue;
//       });

//       return {
//         serialOrRollNumber: i + 1,
//         serialStr: (i + 1).toString().padStart(2, "0"),
//         batchId: project.batchId,
//         name: "",
//         status: "",
//         additionalFields: additionalFieldsObj,
//         _id: "",
//         setBy: "",
//         personalPhotoUrl: "",
//         additionalfieldValues: [] as Card["additionalfieldValues"],
//       }
//     })


//     // console.log("second mile=========", project);

//     cardData?.data?.forEach((card: Card) => {
//       const index = card.serialOrRollNumber - 1
//       if (!rows[index]) return

//       const fields: Record<string, string> = {}
//       card.additionalfieldValues?.forEach((f) => {
//         fields[f.fieldName] = f.fieldValue
//       })

//       rows[index] = {
//         ...card,
//         serialStr: card.serialOrRollNumber.toString().padStart(2, "0"),
//         name: card.name,
//         status: card.status,
//         additionalFields: fields,
//       }
//     })

//     setCards(rows)
//   }, [cardData, project])

//   const filteredCards = cards.filter((card) => {
//     if (!search) return true

//     const searchLower = search.toLowerCase()
//     const name = card.name?.toLowerCase() || ""
//     const serialStr = card.serialStr?.toLowerCase() || ""
//     const serialNumber = card.serialOrRollNumber?.toString().toLowerCase() || ""

//     return name.includes(searchLower) ||
//       serialStr.includes(searchLower) ||
//       serialNumber.includes(searchLower)
//   })

//   const handleEditProject = () => setEditProjectModalOpen(true)
//   const handleProjectUpdate = async (formData: Project) => {
//     if (!project?._id) return
//     try {
//       await updateProject({ id: project._id, data: formData }).unwrap()
//       setEditProjectModalOpen(false)
//     } catch (err) {
//       console.error("Failed to update project", err)
//     }
//   }

//   const handleEditCard = (card: Card) => {
//     setSelectedCard(card)
//     setEditCardModalOpen(true)
//   }

//   const handleUpdate = async (formData: Partial<Card>) => {
//     try {
//       if (selectedCard?._id) {
//         await updateCard({ id: selectedCard._id, data: formData }).unwrap()
//       } else {
//         await createCard({ ...formData, batchId: project?.batchId }).unwrap()
//       }
//       setEditCardModalOpen(false)
//     } catch (error) {
//       console.error("Failed to save card", error)
//     }
//   }

//   const handleDeleteCard = async (card: Card) => {
//     if (!card._id) return;
//     try {
//       await deleteCard(card._id).unwrap();
//       setCards((prev) => prev.filter((c) => c._id !== card._id));
//     } catch (error) {
//       console.error("Failed to delete card", error);
//     }
//   };

//   const handleDownloadCard = async (card: Card) => {
//     if (!card.cardImageUrl) return;

//     try {
//       const res = await fetch(card.cardImageUrl);
//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${card.serialOrRollNumber || card.batchId}-ID-Card.jpg`;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Failed to download card", err);
//     }
//   };

//   if (projectLoading) return <Loading />
//   if (projectError) return <div className="p-4 sm:p-6 text-red-500 text-center text-sm sm:text-base">Failed to load project</div>
//   if (loading) return <ExportLoading />

//   const handleExport = async () => {
//     setLoading(true);
//     await downloadBulkExport(project.batchId)
//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />

//       <div className="p-4 sm:p-6 lg:p-8 space-y-6">
//         {/* Project Info Card */}
//         {project && (
//           <div>


// {/* {
//   JSON.stringify(cardData, null, 2)
// } */}


//             {/* Card Statistics */}
//             <div className="mb-5 grid grid-cols-2 md:grid-cols-4 gap-4">
//               {/* Total Cards */}
//               <div className="rounded-lg p-4 sm:p-5 text-black shadow-md">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium opacity-90">Total Cards</p>
//                     <p className="text-2xl sm:text-3xl font-bold mt-1">{cardStats.total}</p>
//                   </div>
//                   <div className="bg-white/20 rounded-full p-2 sm:p-3">
//                     <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Generated Cards */}
//               <div className="rounded-lg p-4 sm:p-5 text-black shadow-md">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium opacity-90">Generated</p>
//                     <p className="text-2xl sm:text-3xl font-bold mt-1">{cardStats.generated}</p>
//                   </div>
//                   <div className="bg-white/20 rounded-full p-2 sm:p-3">
//                     <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Processing Cards */}
//               <div className="rounded-lg p-4 sm:p-5 text-black shadow-md">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium opacity-90">Processing</p>
//                     <p className="text-2xl sm:text-3xl font-bold mt-1">{cardStats.processing}</p>
//                   </div>
//                   <div className="bg-white/20 rounded-full p-2 sm:p-3">
//                     <svg className="w-5 h-5 sm:w-6 sm:h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Unfilled Cards */}
//               <div className="rounded-lg p-4 sm:p-5 text-black shadow-md">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs sm:text-sm font-medium opacity-90">Unfilled</p>
//                     <p className="text-2xl sm:text-3xl font-bold mt-1">{cardStats.unfilled}</p>
//                   </div>
//                   <div className="bg-white/20 rounded-full p-2 sm:p-3">
//                     <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Project Info */}
//             <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
//               <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
//                 <Image
//                   src={project.institutionLogoUrl}
//                   alt="Logo"
//                   width={80}
//                   height={80}
//                   className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border"
//                 />
//                 <div className="flex-1 space-y-1 text-center sm:text-left">
//                   <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{project.projectName}</h2>
//                   <p className="text-sm sm:text-base text-gray-600">{project.institutionName}</p>
//                   <p className="text-xs sm:text-sm text-gray-500">
//                     Batch: <span className="font-medium">{project.batchId}</span> | Cards: <span className="font-medium">{project.cardQuantity}</span> | Type: <span className="font-medium">{project.cardType}</span>
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-500">Address: {project.address}</p>
//                 </div>
//               </div>
//               <div>
//                 {/* <Link href={`/user?batchCode=${project.batchId}`} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
//                   <User className="w-4 h-4" /> View Users
//                 </Link> */}
//                  <Link href={`/user?batchCode=${project?.batchId}`} className="flex flex-col items-center gap-2 text-indigo-600 hover:text-indigo-800">
//                 <UserQRCode batchId={project.batchId || ""} />
//               </Link>
//               </div>
//               {project.institutionSignUrl?.signUrl && (
//                 <div className="text-center">
//                   <Image
//                     src={project.institutionSignUrl.signUrl}
//                     alt="Sign"
//                     width={80}
//                     height={40}
//                     className="object-contain rounded-md border w-20 h-10 sm:w-24 sm:h-12"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">{project.institutionSignUrl.roleName}</p>
//                 </div>
//               )}
//               <Button
//                 onClick={handleEditProject}
//                 variant="ghost"
//                 className="w-full sm:w-auto text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 text-sm sm:text-base"
//               >
//                 <LucideEdit size={16} /> Edit Project
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Search + Export */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <div className="relative w-full sm:w-64">
//             <Input
//               placeholder="Search by ID serial, Name..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 bg-gray-100 text-sm sm:text-base"
//             />
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           </div>
//           <Button
//             onClick={handleExport}
//             variant="outline"
//             className="w-full sm:w-auto bg-white hover:bg-gray-100 hover:text-gray-800 text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
//           >
//             {/* Export All */}

//             Bulk Export
//           </Button>
//         </div>

//         {/* Desktop: Table Layout with Horizontal Scroll */}
//         <div className="hidden sm:block rounded-xl border border-gray-100 shadow-sm bg-white overflow-x-auto">
//           <table className="min-w-full text-left text-gray-700">
//             <thead className="bg-gray-100 sticky top-0 z-10">
//               <tr>
//                 <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Sr.</th>
//                 <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Batch</th>
//                 <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Name</th>
//                 {project?.additionalFields?.map((field: any, idx: number) => (
//                   <th key={idx} className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">{field.fieldName}</th>
//                 ))}
//                 <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Status</th>
//                 <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cardLoading ? (
//                 <tr>
//                   <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center py-12">
//                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
//                   </td>
//                 </tr>
//               ) : filteredCards.length > 0 ? (
//                 filteredCards.map((card, idx) => (
//                   <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200 transition-colors`}>
//                     <td className="px-4 py-3 border-b text-sm whitespace-nowrap">{card.serialStr}</td>
//                     <td className="px-4 py-3 border-b text-sm whitespace-nowrap">{card.batchId}</td>
//                     <td className="px-4 py-3 border-b text-sm whitespace-nowrap">{card.name}</td>
//                     {project?.additionalFields?.map((field: any, i: number) => (
//                       <td key={i} className="px-4 py-3 border-b text-sm whitespace-nowrap">{card.additionalFields[field.fieldName] || "-"}</td>
//                     ))}
//                     <td className="px-4 py-3 border-b whitespace-nowrap">
//                       {card.status === "processing" ? (
//                         <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                           Processing
//                         </span>
//                       ) : card.status === "generated" ? (
//                         <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
//                           Generated
//                         </span>
//                       ) : (
//                         <span className="text-gray-500 text-xs">-</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 border-b whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <Button
//                           onClick={() => handleEditCard(card)}
//                           variant="ghost"
//                           size="sm"
//                           className="h-9 w-9 p-0 hover:bg-indigo-100"
//                         >
//                           <LucideEdit size={16} className="text-indigo-600" />
//                         </Button>
//                         {card._id && (
//                           <>
//                             <Button
//                               onClick={() => handleDeleteCard(card)}
//                               variant="ghost"
//                               size="sm"
//                               className="h-9 w-9 p-0 hover:bg-red-100"
//                             >
//                               <Trash2 size={16} className="text-red-600" />
//                             </Button>
//                             <Button
//                               onClick={() => handleDownloadCard(card)}
//                               variant="ghost"
//                               size="sm"
//                               className={`h-9 w-9 p-0 ${card.status.toLowerCase() === "processing"
//                                 ? "text-gray-400 cursor-not-allowed bg-gray-100"
//                                 : "text-gray-700 hover:bg-gray-100"
//                                 }`}
//                               disabled={card.status.toLowerCase() === "processing"}
//                             >
//                               <LucideDownload size={16} />
//                             </Button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : cards.length > 0 && search ? (
//                 <tr>
//                   <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center py-12">
//                     <div className="flex flex-col items-center space-y-3">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                         <Search className="h-6 w-6 text-gray-400" />
//                       </div>
//                       <div className="text-center">
//                         <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1">No results found</h3>
//                         <p className="text-sm text-gray-500">No student records found matching &quot;{search}&quot;</p>
//                         <p className="text-xs sm:text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 <tr>
//                   <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center py-12">
//                     <div className="flex flex-col items-center space-y-3">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                         <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1">No student records</h3>
//                         <p className="text-sm text-gray-500">Start adding students to see them listed here</p>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile: Card Layout */}
//         <div className="sm:hidden space-y-4">
//           {cardLoading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
//             </div>
//           ) : filteredCards.length > 0 ? (
//             filteredCards.map((card, idx) => (
//               <div key={idx} className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium text-sm text-gray-800">{card.name}</h3>
//                       <p className="text-xs text-gray-500">Sr. {card.serialStr} | Batch: {card.batchId}</p>
//                     </div>
//                     <div className="flex gap-1">
//                       <Button
//                         onClick={() => handleEditCard(card)}
//                         variant="ghost"
//                         size="sm"
//                         className="h-8 w-8 p-0 hover:bg-indigo-100"
//                       >
//                         <LucideEdit size={14} className="text-indigo-600" />
//                       </Button>
//                       {card._id && (
//                         <>
//                           <Button
//                             onClick={() => handleDeleteCard(card)}
//                             variant="ghost"
//                             size="sm"
//                             className="h-8 w-8 p-0 hover:bg-red-100"
//                           >
//                             <Trash2 size={14} className="text-red-600" />
//                           </Button>
//                           <Button
//                             onClick={() => handleDownloadCard(card)}
//                             variant="ghost"
//                             size="sm"
//                             className={`h-8 w-8 p-0 ${card.status.toLowerCase() === "processing"
//                               ? "text-gray-400 cursor-not-allowed bg-gray-100"
//                               : "text-gray-700 hover:bg-gray-100"
//                               }`}
//                             disabled={card.status.toLowerCase() === "processing"}
//                           >
//                             <LucideDownload size={14} />
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
//                     {project?.additionalFields?.map((field: any, i: number) => (
//                       <div key={i}>
//                         <span className="font-medium">{field.fieldName}:</span> {card.additionalFields[field.fieldName] || "-"}
//                       </div>
//                     ))}
//                     <div>
//                       <span className="font-medium">Status:</span>{" "}
//                       {card.status === "processing" ? (
//                         <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                           Processing
//                         </span>
//                       ) : card.status === "generated" ? (
//                         <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
//                           Generated
//                         </span>
//                       ) : (
//                         <span className="text-gray-500">-</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : cards.length > 0 && search ? (
//             <div className="text-center py-8">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <Search className="h-6 w-6 text-gray-400" />
//               </div>
//               <h3 className="text-base font-medium text-gray-700 mb-1">No results found</h3>
//               <p className="text-sm text-gray-500">No student records found matching &quot;{search}&quot;</p>
//               <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms</p>
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-base font-medium text-gray-700 mb-1">No student records</h3>
//               <p className="text-sm text-gray-500">Start adding students to see them listed here</p>
//             </div>
//           )}
//         </div>

//         {selectedCard && (
//           <EditCard
//             isOpen={editCardModalOpen}
//             onClose={() => setEditCardModalOpen(false)}
//             onSubmit={handleUpdate}
//             initialData={selectedCard}
//             personPhotoBGColorCode={project?.personPhotoBGColorCode}
//             projectAdditionalFields={project?.additionalFields.map((f: any) => f.fieldName) || []}
//           />
//         )}

//         {project && (
//           <EditProject
//             isOpen={editProjectModalOpen}
//             onClose={() => setEditProjectModalOpen(false)}
//             onSubmit={handleProjectUpdate}
//             initialData={project}
//           />
//         )}
//       </div>
//     </div>
//   )
// }



'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LucideEdit, Trash2, Loader2, LucideDownload, Search, User } from "lucide-react"
import { DashboardHeader } from "../../../_components/dashboard-header"
import { EditCard } from "../../_components/EditCard"
import { useGetSpecificProjectQuery, useUpdateProjectMutation } from "@/lib/feature/Project/projectApi"
import { useCreateCardMutation, useDeleteCardMutation, useGetCardByBatchIdQuery, useUpdateCardMutation } from "@/lib/feature/Card/cardApi"
import { useParams } from "next/navigation"
import { Card, CardRow, Project } from "@/types/inedx"
import { EditProject } from "../../_components/EditProject"
import Image from "next/image"
import { downloadBulkExport } from "@/utils/bulkExport"
import Loading from "@/app/loading"
import ExportLoading from "../../../_components/ExportLoading"
import Link from "next/link"
import UserQRCode from "@/components/layout/UserQRCode"

export default function ViewDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<(CardRow)[]>([])
  const [search, setSearch] = useState("")
  const [editCardModalOpen, setEditCardModalOpen] = useState(false)
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const params = useParams()
  const id = params?.id as string

  const { data: projectData, isLoading: projectLoading, error: projectError } = useGetSpecificProjectQuery(id)
  const [updateProject] = useUpdateProjectMutation()
  const project = projectData?.data

  const batchId = project?.batchId ?? "";
  const { data: cardData, isLoading: cardLoading } = useGetCardByBatchIdQuery(batchId, {
    skip: !project?.batchId,
  });

  console.log("debugging ========================", cardData);

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  // Calculate card statistics
  const cardStats = {
    total: project?.cardQuantity || 0,
    generated: cards.filter(card => card.status === "generated").length,
    processing: cards.filter(card => card.status === "processing").length,
    unfilled: 0
  }
  // Unfilled = Total - (Generated + Processing)
  cardStats.unfilled = cardStats.total - (cardStats.generated + cardStats.processing)

  useEffect(() => {
    if (!project) return

    // Direct mapping - শুধুমাত্র API থেকে যা আসে তাই display করো
    if (cardData?.data && cardData.data.length > 0) {
      const mappedCards = cardData.data.map((card: any) => {
        const fields: Record<string, string> = {}
        card.additionalfieldValues?.forEach((f: any) => {
          fields[f.fieldName] = f.fieldValue
        })

        return {
          ...card,
          serialOrRollNumber: card.uniqueNumber,
          serialStr: card.uniqueNumber.toString().padStart(2, "0"),
          name: card.name,
          status: card.status,
          additionalFields: fields,
          batchId: card.batchId,
        }
      })

      console.log("Mapped cards:", mappedCards);
      setCards(mappedCards)
    } else {
      // যদি কোনো card না থাকে, তাহলে empty array set করো
      setCards([])
    }
  }, [cardData, project])

  const filteredCards = cards.filter((card) => {
    if (!search) return true

    const searchLower = search.toLowerCase()
    const name = card.name?.toLowerCase() || ""
    const serialStr = card.serialStr?.toLowerCase() || ""
    const serialNumber = card.serialOrRollNumber?.toString().toLowerCase() || ""

    return name.includes(searchLower) ||
      serialStr.includes(searchLower) ||
      serialNumber.includes(searchLower)
  })

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
        await updateCard({ id: selectedCard._id, data: formData }).unwrap()
      } else {
        await createCard({ ...formData, batchId: project?.batchId }).unwrap()
      }
      setEditCardModalOpen(false)
    } catch (error) {
      console.error("Failed to save card", error)
    }
  }

  const handleDeleteCard = async (card: Card) => {
    if (!card._id) return;
    try {
      await deleteCard(card._id).unwrap();
      setCards((prev) => prev.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Failed to delete card", error);
    }
  };

  const handleDownloadCard = async (card: Card) => {
    if (!card.cardImageUrl) return;

    try {
      const res = await fetch(card.cardImageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${card.serialOrRollNumber || card.batchId}-ID-Card.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download card", err);
    }
  };

  if (projectLoading) return <Loading />
  if (projectError) return <div className="p-4 sm:p-6 text-red-500 text-center text-sm sm:text-base">Failed to load project</div>
  if (loading) return <ExportLoading />

  const handleExport = async () => {
    setLoading(true);
    await downloadBulkExport(project.batchId)
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Project Info Card */}
        {project && (
          <div>
            {/* Card Statistics */}
            <div className="mb-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Total Cards */}
              <div className="rounded-lg p-4 sm:p-5 text-black shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium opacity-90">Total Cards</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1">{cardStats.total}</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-2 sm:p-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Generated Cards */}
              <div className="rounded-lg p-4 sm:p-5 text-black shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium opacity-90">Generated</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1">{cardStats.generated}</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-2 sm:p-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Processing Cards */}
              <div className="rounded-lg p-4 sm:p-5 text-black shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium opacity-90">Processing</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1">{cardStats.processing}</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-2 sm:p-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Unfilled Cards */}
              <div className="rounded-lg p-4 sm:p-5 text-black shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium opacity-90">Unfilled</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1">{cardStats.unfilled}</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-2 sm:p-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                <Image
                  src={project.institutionLogoUrl}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border"
                />
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{project.projectName}</h2>
                  <p className="text-sm sm:text-base text-gray-600">{project.institutionName}</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Batch: <span className="font-medium">{project.batchId}</span> | Cards: <span className="font-medium">{project.cardQuantity}</span> | Type: <span className="font-medium">{project.cardType}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">Address: {project.address}</p>
                </div>
              </div>
              <div>
                <Link href={`/user?batchCode=${project?.batchId}`} className="flex flex-col items-center gap-2 text-indigo-600 hover:text-indigo-800">
                  <UserQRCode batchId={project.batchId || ""} />
                </Link>
              </div>
              {project.institutionSignUrl?.signUrl && (
                <div className="text-center">
                  <Image
                    src={project.institutionSignUrl.signUrl}
                    alt="Sign"
                    width={80}
                    height={40}
                    className="object-contain rounded-md border w-20 h-10 sm:w-24 sm:h-12"
                  />
                  <p className="text-xs text-gray-500 mt-1">{project.institutionSignUrl.roleName}</p>
                </div>
              )}
              <Button
                onClick={handleEditProject}
                variant="ghost"
                className="w-full sm:w-auto text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 text-sm sm:text-base"
              >
                <LucideEdit size={16} /> Edit Project
              </Button>
            </div>
          </div>
        )}

        {/* Search + Export */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search by ID serial, Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gray-100 text-sm sm:text-base"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <Button
            onClick={handleExport}
            variant="outline"
            className="w-full sm:w-auto bg-white hover:bg-gray-100 hover:text-gray-800 text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
          >
            Bulk Export
          </Button>
        </div>

        {/* Desktop: Table Layout with Horizontal Scroll */}
        <div className="hidden sm:block rounded-xl border border-gray-100 shadow-sm bg-white overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Sr.</th>
                <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Batch</th>
                <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Name</th>
                {project?.additionalFields?.map((field: any, idx: number) => (
                  <th key={idx} className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">{field.fieldName}</th>
                ))}
                <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Status</th>
                <th className="px-4 py-3 border-b text-sm font-semibold text-muted-foreground whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cardLoading ? (
                <tr>
                  <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredCards.length > 0 ? (
                filteredCards.map((card, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200 transition-colors`}>
                    <td className="px-4 py-3 border-b text-sm whitespace-nowrap">{card.serialStr}</td>
                    <td className="px-4 py-3 border-b text-sm whitespace-nowrap">{card.batchId}</td>
                    <td className="px-4 py-3 border-b text-sm whitespace-nowrap">{card.name}</td>
                    {project?.additionalFields?.map((field: any, i: number) => (
                      <td key={i} className="px-4 py-3 border-b text-sm whitespace-nowrap">{card.additionalFields[field.fieldName] || "-"}</td>
                    ))}
                    <td className="px-4 py-3 border-b whitespace-nowrap">
                      {card.status === "processing" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Processing
                        </span>
                      ) : card.status === "generated" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Generated
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleEditCard(card)}
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 hover:bg-indigo-100"
                        >
                          <LucideEdit size={16} className="text-indigo-600" />
                        </Button>
                        {card._id && (
                          <>
                            <Button
                              onClick={() => handleDeleteCard(card)}
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 hover:bg-red-100"
                            >
                              <Trash2 size={16} className="text-red-600" />
                            </Button>
                            <Button
                              onClick={() => handleDownloadCard(card)}
                              variant="ghost"
                              size="sm"
                              className={`h-9 w-9 p-0 ${card.status.toLowerCase() === "processing"
                                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                              disabled={card.status.toLowerCase() === "processing"}
                            >
                              <LucideDownload size={16} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : cards.length > 0 && search ? (
                <tr>
                  <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1">No results found</h3>
                        <p className="text-sm text-gray-500">No student records found matching &quot;{search}&quot;</p>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4 + (project?.additionalFields?.length || 0)} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1">No student records</h3>
                        <p className="text-sm text-gray-500">Start adding students to see them listed here</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card Layout */}
        <div className="sm:hidden space-y-4">
          {cardLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : filteredCards.length > 0 ? (
            filteredCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm text-gray-800">{card.name}</h3>
                      <p className="text-xs text-gray-500">Sr. {card.serialStr} | Batch: {card.batchId}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleEditCard(card)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-indigo-100"
                      >
                        <LucideEdit size={14} className="text-indigo-600" />
                      </Button>
                      {card._id && (
                        <>
                          <Button
                            onClick={() => handleDeleteCard(card)}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-100"
                          >
                            <Trash2 size={14} className="text-red-600" />
                          </Button>
                          <Button
                            onClick={() => handleDownloadCard(card)}
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 ${card.status.toLowerCase() === "processing"
                              ? "text-gray-400 cursor-not-allowed bg-gray-100"
                              : "text-gray-700 hover:bg-gray-100"
                              }`}
                            disabled={card.status.toLowerCase() === "processing"}
                          >
                            <LucideDownload size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    {project?.additionalFields?.map((field: any, i: number) => (
                      <div key={i}>
                        <span className="font-medium">{field.fieldName}:</span> {card.additionalFields[field.fieldName] || "-"}
                      </div>
                    ))}
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      {card.status === "processing" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Processing
                        </span>
                      ) : card.status === "generated" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Generated
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : cards.length > 0 && search ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-700 mb-1">No results found</h3>
              <p className="text-sm text-gray-500">No student records found matching &quot;{search}&quot;</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-700 mb-1">No student records</h3>
              <p className="text-sm text-gray-500">Start adding students to see them listed here</p>
            </div>
          )}
        </div>

        {selectedCard && (
          <EditCard
            isOpen={editCardModalOpen}
            onClose={() => setEditCardModalOpen(false)}
            onSubmit={handleUpdate}
            initialData={selectedCard}
            personPhotoBGColorCode={project?.personPhotoBGColorCode}
            projectAdditionalFields={project?.additionalFields.map((f: any) => f.fieldName) || []}
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