"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import { EditModal } from "./_components/EditModal"

interface Student {
  batchCode: string
  roll: string
  name: string
  department: string
  bloodGroup: string
  dob: string
  phone: string
  status: "Complete" | "Pending"
}

export default function ViewDetailsPage() {
  const [students, setStudents] = useState<Student[]>([
    {
      batchCode: "1111",
      roll: "01",
      name: "Samin Alom",
      department: "CSE",
      bloodGroup: "O+",
      dob: "2000-12-12",
      phone: "+1 123 2584",
      status: "Complete",
    },
    {
      batchCode: "1111",
      roll: "02",
      name: "",
      department: "",
      bloodGroup: "",
      dob: "",
      phone: "",
      status: "Pending",
    },
  ])

  const [search, setSearch] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (student: Student) => {
    setSelectedStudent(student)
    setEditModalOpen(true)
  }

  const handleUpdate = (formData: any) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.roll === selectedStudent?.roll && s.batchCode === selectedStudent?.batchCode
          ? { ...s, ...formData }
          : s
      )
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">View Details</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-2 border-b">Batch Code</th>
              <th className="px-4 py-2 border-b">Roll</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Department</th>
              <th className="px-4 py-2 border-b">Blood Group</th>
              <th className="px-4 py-2 border-b">Date of Birth</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{s.batchCode}</td>
                <td className="px-4 py-2 border-b">{s.roll}</td>
                <td className="px-4 py-2 border-b">{s.name || "-"}</td>
                <td className="px-4 py-2 border-b">{s.department || "-"}</td>
                <td className="px-4 py-2 border-b">{s.bloodGroup || "-"}</td>
                <td className="px-4 py-2 border-b">{s.dob || "-"}</td>
                <td className="px-4 py-2 border-b">{s.phone || "-"}</td>
                <td className="px-4 py-2 border-b">
                  {s.status === "Complete" ? (
                    <span className="text-green-600 font-medium">Complete</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </td>
                <td className="px-4 py-2 border-b flex gap-3">
                  <button onClick={() => handleEdit(s)}>
                    <Edit2 size={18} className="text-gray-700 hover:text-indigo-600" />
                  </button>
                  <button>
                    <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedStudent && (
        <EditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleUpdate}
          initialData={{
            name: selectedStudent.name,
            department: selectedStudent.department,
            roll: selectedStudent.roll,
            bloodGroup: selectedStudent.bloodGroup,
            dob: selectedStudent.dob,
            phone: selectedStudent.phone,
          }}
        />
      )}
    </div>
  )
}
