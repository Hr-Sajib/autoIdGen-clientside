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
  const [idCardType, setIdCardType] = useState("Student")
  const [editingField, setEditingField] = useState<string | null>(null)

  const searchParams = useSearchParams()

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

  const [selectedCard, setSelectedCard] = useState<"Student" | "Employee">("Student");
  const [formData, setFormData] = useState<any>({});
  const [cardOrientation, setCardOrientation] = useState("horizontal");


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
      // studentName: "Name",
      department: "Department",
      rollNumber: "Roll Number",
      bloodGroup: "Blood Group",
      dateOfBirth: "Date of Birth",
      phone: "Phone"
    };
  });

  // Save customLabels dynamically whenever it changes
  useEffect(() => {
    sessionStorage.setItem("customLabels", JSON.stringify(customLabels));
  }, [customLabels]);

  useEffect(() => {
    try {
      // Get card type from session storage
      const savedCardType = sessionStorage.getItem("selectedCard");
      const savedForm = sessionStorage.getItem("formData");

      if (savedCardType === "Student" || savedCardType === "Employee") {
        setSelectedCard(savedCardType);

        const parsedData = savedForm ? JSON.parse(savedForm) : {};

        if (savedCardType === "Student") {
          setFormData({
            project: parsedData.project || "",
            studentName: parsedData.studentName || "",
            rollNumber: parsedData.rollNumber || "",
            department: parsedData.department || "",
            bloodGroup: parsedData.bloodGroup || "",
            dateOfBirth: parsedData.dateOfBirth || "",
            phone: parsedData.phone || "",
            instituteName: parsedData.instituteName || "Eastern Mine School & College",
            idCardType: "Student",
            address: parsedData.address || "21A/B mine union point, Singapore",
            logoUrl: parsedData.logoUrl || "",
            signatureUrl: parsedData.signatureUrl || "",
            profileUrl: parsedData.profileUrl || "https://i.postimg.cc/Y0ydK27n/person.jpg",
            bgColor: parsedData.bgColor || "#0f172a",
            qrData: parsedData.qrData || "CSE/1233/B+/12122000/+65-2131-XXXX",
            whoseSign: parsedData.whoseSign || "Principal",
          });
        } else {
          setFormData({
            project: parsedData.project || "",
            studentName: parsedData.studentName || "",
            rollNumber: parsedData.rollNumber || "",
            department: parsedData.department || "",
            bloodGroup: parsedData.bloodGroup || "",
            dateOfBirth: parsedData.dateOfBirth || "",
            phone: parsedData.phone || "",
            instituteName: parsedData.instituteName || "Company Name",
            idCardType: "Employee",
            address: parsedData.address || "",
            logoUrl: parsedData.logoUrl || "",
            signatureUrl: parsedData.signatureUrl || "",
            profileUrl: parsedData.profileUrl || "https://i.postimg.cc/Y0ydK27n/person.jpg",
            bgColor: parsedData.bgColor || "#0f172a",
            qrData: parsedData.qrData || "EMP/1233/B+/12122000/+65-2131-XXXX",
            whoseSign: parsedData.whoseSign || "Manager",
          });
        }

        if (parsedData.cardOrientation) setCardOrientation(parsedData.cardOrientation);
      }
    } catch (err) {
      console.error("❌ Error reading sessionStorage:", err);
    }
  }, []);


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
  const [createProject] = useCreateProjectMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleLabelChange = (field: string, value: string) => {
    setCustomLabels((prev: any) => ({ ...prev, [field]: value }))
  }

  const handlePrevious = () => {
    // Save current formData to sessionStorage
    const sessionData = {
      ...formData,
      cardOrientation,
      idCardType
    };
    sessionStorage.setItem("formData", JSON.stringify(sessionData));
    console.log("💾 Saved formData before going back:", sessionData);

    // Get the project name from formData or fallback
    const project = formData.project || "Project";

    // Navigate to Institute Template Setup with project param
    router.push(`/dashboard/card-template-setup?project=${encodeURIComponent(project)}`);
  };

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  // ✅ Final function to call API + save to session
const handleGenerateProject = async (quantity: number) => {
  if (!user || !user.userId) return;

  const templateId =
    cardOrientation === "vertical"
      ? "68b759c0fa9b3b1fd60fab77"
      : "68b7582aaa0bc46f0acfb675";

  const payload = {
    userId: user.userId,
    projectName: `${projectName}`,
    templateId,
    institutionName: formData.instituteName,
    cardType: formData.idCardType,
    address: formData.address,
    contactPhone: formData.phone,
    institutionLogoUrl: formData.logoUrl,
    institutionSignUrl: formData.signatureUrl,
    signRoleName: formData.whoseSign,
    personPhotoBGColorCode: formData.bgColor,
    additionalFields: Object.entries(customLabels)
      .filter(([key]) => key !== "name")
      .map(([_, label]) => label),
    cardQuantity: quantity,
  };

  try {
    // Show loading toast
    const toastId = toast.loading("🚀 Creating project...", {
      duration: 4000,
      className: "bg-blue-600 text-white font-semibold text-center shadow-lg",
    });

    // Call API
    await createProject(payload).unwrap();

    // Success toast
    toast.success("🎉 Project created successfully!", {
      id: toastId,
      duration: 6000,
    });

    // Clear session storage
    sessionStorage.removeItem("formData");
    sessionStorage.removeItem("selectedCard");
    sessionStorage.removeItem("customLabels");
    sessionStorage.removeItem("cardOrientation");

    // ✅ Only navigate on success
    router.push("/dashboard");

  } catch (err: any) {
    // Show API error message
    const errorMessage =
      err?.data?.message || err?.error || "❌ Failed to create project. Please try again.";

    toast.error(errorMessage, {
      duration: 7000,
      className: "bg-red-600 text-white font-semibold text-center shadow-lg",
    });
  }
};


  // Dynamic card rendering based on type and orientation from session storage
  const renderCard = () => {
    const cardProps = {
      name: formData.studentName,
      instituteName: formData.instituteName,
      address: formData.address,
      idCardType: formData.idCardType,
      department: formData.department,
      bloodGroup: formData.bloodGroup,
      dob: formData.dateOfBirth,
      phone: formData.phone,
      logoUrl: formData.logoUrl,
      signatureUrl: formData.signatureUrl,
      profileUrl: formData.profileUrl,
      bgColor: formData.bgColor,
      qrData: formData.qrData,
      whoseSign: formData.whoseSign
    }

    // if (idCardType === "Student") {
    if (selectedCard === "Student") {
      if (cardOrientation === "vertical") {
        return (
          <EmployeeCard
            {...cardProps}
            employeeName={formData.studentName}
            employeeId={formData.rollNumber}
            companyName={formData.instituteName}
            personImage={formData.profileUrl}
            logo={formData.logoUrl}
            signature={formData.signatureUrl}
            customLabels={customLabels}
            orientation={cardOrientation}
          />
        )
      } else {
        return (
          <StudentCard
            {...cardProps}
            studentName={formData.studentName}
            roll={formData.rollNumber}
            customLabels={customLabels}
            orientation={cardOrientation}
          />
        )
      }
      // } else if (idCardType === "Employee") {
    } else if (selectedCard === "Employee") {
      if (cardOrientation === "vertical") {
        return (
          <EmployeeCard
            {...cardProps}
            employeeName={formData.studentName}
            employeeId={formData.rollNumber}
            companyName={formData.instituteName}
            personImage={formData.profileUrl}
            logo={formData.logoUrl}
            signature={formData.signatureUrl}
            customLabels={customLabels}
            orientation={cardOrientation}
          />
        )
      } else {
        return (
          <StudentCard
            {...cardProps}
            studentName={formData.studentName}
            roll={formData.rollNumber}
            customLabels={customLabels}
            orientation={cardOrientation}
          />
        )
      }
    }

    // Default fallback
    return (
      <StudentCard
        {...cardProps}
        studentName={formData.studentName}
        roll={formData.rollNumber}
        customLabels={customLabels}
        orientation={cardOrientation}
      />
    )
  }


  return (
    <>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Field Selection</h1>
            {/* <CardPreview/> */}

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {/* Name field is static - no edit button */}
                      <label className="block text-base font-medium text-gray-800">
                        {/* {customLabels.studentName} */}
                        Name
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
              <div className="flex flex-col items-center justify-start -mt-10">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    Preview
                  </h2>

                  <div className="flex justify-center mb-2">
                    <div className="bg-gray-100 p-1 rounded-lg flex">
                      <button
                        className="px-4 py-2 rounded-md text-sm font-medium transition-all bg-white text-gray-900 shadow-sm"
                      >
                        {cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout
                      </button>
                    </div>
                  </div>
                </div>

                <Card className="p-4 bg-white border-none shadow-none">
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