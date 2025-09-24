"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import { CardQuantityModal } from "../_components/quantity-modal"
import { DashboardHeader } from "../_components/dashboard-header"
import StudentCard from "@/components/layout/cards/StudentCard"
import EmployeeCard from "@/components/layout/cards/EmployeCard"
import { useCreateProjectMutation } from "@/lib/feature/Project/projectApi";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function InstituteTemplateSetupPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardOrientation, setCardOrientation] = useState("horizontal")
  const [idCardType, setIdCardType] = useState("Student")
  const [editingField, setEditingField] = useState<string | null>(null)

  const searchParams = useSearchParams()
  // Get projectName from query param OR session storage
  // const queryProjectName = searchParams.get("project")
  // const savedFormData = sessionStorage.getItem("formData")
  // const sessionProjectName = savedFormData ? JSON.parse(savedFormData).project : null
  // const projectName = queryProjectName || sessionProjectName || ""



  // ✅ ProjectName state (dynamic from sessionStorage or query param)
  const [projectName, setProjectName] = useState("")

  useEffect(() => {
    const queryProject = searchParams.get("project")
    const savedFormData = sessionStorage.getItem("formData")

    if (queryProject) {
      setProjectName(queryProject)
    } else if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData)
        if (parsed.project) {
          setProjectName(parsed.project)
        }
      } catch (err) {
        console.error("❌ Error parsing formData:", err)
      }
    }
  }, [searchParams])


  // Initialize customLabels from sessionStorage if available
  const [customLabels, setCustomLabels] = useState(() => {
    try {
      const savedLabels = sessionStorage.getItem("customLabels");
      if (savedLabels) {
        return JSON.parse(savedLabels); // Use saved label names
      }
    } catch (err) {
      console.error("Error reading customLabels from sessionStorage:", err);
    }

    // Default labels if no session storage
    return {
      studentName: "Name", // Static field - cannot be changed
      department: "Department",
      rollNumber: "Roll Number",
      employeeId: "Employee ID",
      bloodGroup: "Blood Group",
      dateOfBirth: "Date of Birth",
      phone: "Phone"
    };
  });

  // Save customLabels dynamically whenever it changes
  useEffect(() => {
    sessionStorage.setItem("customLabels", JSON.stringify(customLabels));
  }, [customLabels]);

  const [formData, setFormData] = useState({
    project: projectName,
    department: "",
    rollNumber: "",
    bloodGroup: "",
    dateOfBirth: "",
    phone: "",
    studentName: "",
    instituteName: "Eastern Mine School & College",
    idCardType: "Student",
    address: "21A/B mine union point, Singapore",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://i.postimg.cc/Y0ydK27n/person.jpg",
    bgColor: "#0f172a",
    qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
    whoseSign: "Principal",
    type: "student"
  })

  // ✅ Load from sessionStorage when component mounts
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("formData")
      if (saved) {
        const parsed = JSON.parse(saved)
        setFormData(parsed)
        if (parsed.cardOrientation) {
          setCardOrientation(parsed.cardOrientation) // 👈 restore orientation
        }
        if (parsed.idCardType) {
          setIdCardType(parsed.idCardType) // 👈 restore orientation
        }
        console.log("🔄 Loaded formData from sessionStorage:", parsed)
      }
    } catch (err) {
      console.error("❌ Error reading formData from sessionStorage:", err)
    }
  }, [])

  // ✅ Hook for creating project
  const [createProject] =
    useCreateProjectMutation(); const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

  const handleLabelChange = (field: string, value: string) => {
    setCustomLabels((prev: any) => ({ ...prev, [field]: value }))
  }

  const handlePrevious = () => {
    // Save current formData to sessionStorage
    const sessionData = {
      ...formData,
      cardOrientation,
    };
    sessionStorage.setItem("formData", JSON.stringify(sessionData));
    console.log("💾 Saved formData before going back:", sessionData);

    // Get the project name from formData or fallback
    const project = formData.project || "Project";

    // Navigate to Institute Template Setup with project param
    router.push(`/dashboard/institute-template-setup?project=${encodeURIComponent(project)}`);
  };

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  // ✅ Final function to call API + save to session
  const handleGenerateProject = async (quantity: number) => {
    let toastId: string | number | undefined
    try {
      if (!user || !user.userId) {
        console.error("❌ User is not logged in or userId is missing.");
        return;
      }

      const payload = {
        userId: user.userId,
        projectName: `${projectName} ID Project`,
        templateId: "68b7582aaa0bc46f0acfb675", // TODO: dynamic later
        institutionName: formData.instituteName,
        cardType: formData.idCardType,
        address: formData.address,
        contactPhone: formData.phone,
        institutionLogoUrl:
          formData.logoUrl ||
          "https://i.ibb.co.com/Y765FrW0/education-logo-and-minimal-school-badge-design-template-vector.jpg",
        institutionSignUrl:
          formData.signatureUrl ||
          "https://i.ibb.co.com/vxmHjprY/signpic.png",
        signRoleName: formData.whoseSign,
        additionalFields: ["Class", "Section", "Roll"], // can be built from customLabels
        cardQuantity: quantity,
      };

      // ✅ Show loading toast
      toastId = toast.loading("🚀 Creating project...", {
        duration: 4000, // stays until updated
        className: "bg-red-600 text-white text-center font-semibold shadow-lg",
      })

      // ✅ 2. Call API
      console.log("📤 Sending payload:", payload);
      await createProject(payload).unwrap();

      // ✅ Replace loading with success
      toast.success("🎉 Project created successfully!", {
        id: toastId,
        duration: 6000, // stays longer
      })

      // ✅ Clear session storage after success
      sessionStorage.removeItem("formData");
      sessionStorage.removeItem("selectedCard");
      sessionStorage.removeItem("customLabels");
      sessionStorage.removeItem("cardOrientation");

    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "❌ Failed to create project. Please try again."

      // ✅ Replace loading with error
      toast.error(errorMessage, {
        id: toastId,
        duration: 7000, // noticeable & stays longer
        className: "bg-red-600 text-white text-center font-semibold shadow-lg",
      })
    }
  };


  // Dynamic card rendering based on type and orientation from session storage
  const renderCard = () => {
    const cardProps = {
      name: formData.studentName || "",
      instituteName: formData.instituteName,
      address: formData.address,
      idCardType: formData.idCardType,
      department: formData.department || "",
      bloodGroup: formData.bloodGroup || "",
      dob: formData.dateOfBirth || "",
      phone: formData.phone || "",
      logoUrl: formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
      signatureUrl: formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
      profileUrl: formData.profileUrl,
      bgColor: formData.bgColor,
      qrData: formData.qrData,
      whoseSign: formData.whoseSign
    }

    if (idCardType === "student") {
      if (cardOrientation === "vertical") {
        console.log("Rendering student card in vertical orientation")
        return (
          <EmployeeCard
            {...cardProps}
            employeeName={formData.studentName || ""}
            employeeId={formData.rollNumber || ""}
            companyName={formData.instituteName}
            personImage={formData.profileUrl}
            logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
            signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
            customLabels={customLabels}
            orientation={cardOrientation}
          />
        )
      } else {
        return (
          <StudentCard
            {...cardProps}
            studentName={formData.studentName || "john doe"}
            roll={formData.rollNumber || ""}
            customLabels={customLabels}
            orientation={cardOrientation}
          />
        )
      }
    } else if (idCardType === "employee") {
      return (
        <EmployeeCard
          {...cardProps}
          employeeName={formData.studentName || "John Doe"}
          employeeId={formData.rollNumber || ""}
          companyName={formData.instituteName}
          personImage={formData.profileUrl}
          logo={formData.logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif"}
          signature={formData.signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"}
          customLabels={customLabels}
        />
      )
    }

    // Default fallback
    return (
      <StudentCard
        {...cardProps}
        studentName={formData.studentName || "John Doe"}
        roll={formData.rollNumber || ""}
        customLabels={customLabels}
        orientation={cardOrientation}
      />
    )
  }


  return (
    <>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-6 py-8">
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Selection</h1>
            {/* <CardPreview/> */}

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {/* Name field is static - no edit button */}
                      <label className="block text-base font-medium text-gray-800">
                        {customLabels.studentName}
                      </label>
                      <span className="text-xs text-gray-500 ml-2">(Fixed)</span>
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder="Type Name"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange("studentName", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'department' ? (
                        <Input
                          type="text"
                          value={customLabels.department}
                          onChange={(e) => handleLabelChange("department", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.department}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('department')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.department}`}
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'rollNumber' ? (
                        <Input
                          type="text"
                          value={customLabels.rollNumber || customLabels.employeeId}
                          onChange={(e) => handleLabelChange("rollNumber", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.rollNumber || customLabels.employeeId}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('rollNumber')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.rollNumber || customLabels.employeeId}`}
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'bloodGroup' ? (
                        <Input
                          type="text"
                          value={customLabels.bloodGroup}
                          onChange={(e) => handleLabelChange("bloodGroup", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.bloodGroup}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('bloodGroup')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.bloodGroup}`}
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'dateOfBirth' ? (
                        <Input
                          type="text"
                          value={customLabels.dateOfBirth}
                          onChange={(e) => handleLabelChange("dateOfBirth", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.dateOfBirth}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('dateOfBirth')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="text"
                      placeholder={`Type ${customLabels.dateOfBirth}`}
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {editingField === 'phone' ? (
                        <Input
                          type="text"
                          value={customLabels.phone}
                          onChange={(e) => handleLabelChange("phone", e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null)
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <>
                          <label className="block text-base font-medium text-gray-800">
                            {customLabels.phone}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setEditingField('phone')}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                    <Input
                      hidden
                      type="tel"
                      placeholder={`Type ${customLabels.phone}`}
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full bg-gray-100 py-6 px-4 rounded-lg"
                    />
                  </div>
                </div>

                {/* Add/Remove Field Section */}
                {/* <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Customize Form Fields</h3>
                  <p className="text-sm text-gray-600 mb-3">Click the pencil icon next to any field label to rename it. The &quot;Name&quot; field cannot be changed.</p>
                  
            
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Editable Fields: Department, Roll Number, Blood Group, Date of Birth, Phone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Fixed Field: Name (cannot be changed)</span>
                    </div>
                  </div>
                </div> */}

                <div className="flex gap-4 mt-8">
                  <Button onClick={handlePrevious} className="flex-1 h-14 text-gray-600 border border-gray-300 rounded-xl text-lg font-medium bg-white hover:bg-gray-100 hover:text-gray-900">Previous</Button>
                  <Button onClick={() => setIsModalOpen(true)} className="flex-1 h-14 bg-[#4A61E4] hover:bg-[#4A61E6] text-white text-lg rounded-xl font-medium">Next</Button>
                </div>
              </div>

              {/* Right Preview Section */}
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">
                    Preview <span className="text-md font-medium text-gray-600">({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)</span>
                  </span>
                </div>

                <Card className="p-6 bg-white border-none shadow-lg">
                  <div className="w-full mx-auto flex justify-center">
                    <div className={cardOrientation === "vertical" ? "scale-90" : "scale-100"}>
                      {renderCard()}
                    </div>
                  </div>
                </Card>

                {/* Color Selection */}
                {/* <div className="space-y-2">
                  <p className="text-center text-sm font-medium text-gray-600">
                    Select photo Background Color
                  </p>
                  <div className="flex justify-center gap-2">
                    {["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7", "#ec4899"].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          formData.bgColor === color 
                            ? 'border-gray-800 scale-110' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleInputChange("bgColor", color)}
                      />
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </main>
      </div>

      <CardQuantityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateProject} />
    </>
  )
}