"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { CardQuantityModal } from "../_components/quantity-modal";
import { DashboardHeader } from "../_components/dashboard-header";
import StudentCard from "@/components/layout/cards/StudentCard";
import EmployeeCard from "@/components/layout/cards/EmployeCard";
import { useCreateProjectMutation } from "@/lib/feature/Project/projectApi";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function InstituteTemplateSetupPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idCardType, setIdCardType] = useState("Student");
  const [editingField, setEditingField] = useState<string | null>(null);

  const searchParams = useSearchParams();

  // ProjectName state
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const queryProject = searchParams.get("project");
    const savedFormData = sessionStorage.getItem("formData");

    if (queryProject) {
      setProjectName(queryProject);
    } else if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData);
        if (parsed.project) {
          setProjectName(parsed.project);
        }
      } catch (err) {
        console.error("❌ Error parsing formData:", err);
      }
    }
  }, [searchParams]);

  const [selectedCard, setSelectedCard] = useState<"Student" | "Employee">("Student");
  const [formData, setFormData] = useState<any>({});
  const [cardOrientation, setCardOrientation] = useState("horizontal");

  const [additionalFields, setAdditionalFields] = useState(() => {
    try {
      const saved = sessionStorage.getItem("additionalFields");
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.error("Error reading additionalFields from sessionStorage:", err);
    }

    // Default fields
    return [
      { fieldName: "Department", defaultValue: "" },
      { fieldName: "Roll Number", defaultValue: "" },
      { fieldName: "Blood Group", defaultValue: "" },
      { fieldName: "Date of Birth", defaultValue: "" },
      { fieldName: "Phone", defaultValue: "" },
    ];
  });

  useEffect(() => {
    sessionStorage.setItem("additionalFields", JSON.stringify(additionalFields));
  }, [additionalFields]);

  useEffect(() => {
    try {
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

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("formData");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        if (parsed.cardOrientation) {
          setCardOrientation(parsed.cardOrientation);
        }
        if (parsed.idCardType) {
          setIdCardType(parsed.idCardType);
        }
        console.log("🔄 Loaded formData from sessionStorage:", parsed);
      }
    } catch (err) {
      console.error("❌ Error reading formData from sessionStorage:", err);
    }
  }, []);

  // Sync additionalFields defaultValues with formData on mount
  useEffect(() => {
    const fieldKeys = ["department", "rollNumber", "bloodGroup", "dateOfBirth", "phone"];
    setAdditionalFields((prev: any) =>
      prev.map((field: any, index: number) => ({
        ...field,
        defaultValue: formData[fieldKeys[index]] || field.defaultValue,
      }))
    );
  }, [formData]);

  const [createProject] = useCreateProjectMutation();

  const handleAddField = () => {
    const newField = { fieldName: "New Field", defaultValue: "" };
    const newKey = `customField${additionalFields.length}`; // Unique key for new field
    setAdditionalFields((prev: any) => [...prev, newField]);
    setFormData((prev: any) => ({
      ...prev,
      [newKey]: "",
    }));
    sessionStorage.setItem("additionalFields", JSON.stringify([...additionalFields, newField]));
    sessionStorage.setItem("formData", JSON.stringify({ ...formData, [newKey]: "" }));
    toast.success("New field added successfully!");
  };

  const handleRemoveField = (index: number) => {
    if (additionalFields.length <= 3) {
      toast.error("At least one additional field is required.");
      return;
    }

    setAdditionalFields((prev: any) => {
      const newFields = prev.filter((_: any, i: number) => i !== index);
      const fieldKeys = ["department", "rollNumber", "bloodGroup", "dateOfBirth", "phone"];
      const key = fieldKeys[index] || `customField${index}`;
      if (key) {
        setFormData((prev: any) => {
          const newFormData = { ...prev };
          delete newFormData[key];
          sessionStorage.setItem("formData", JSON.stringify(newFormData));
          return newFormData;
        });
      }
      sessionStorage.setItem("additionalFields", JSON.stringify(newFields));
      return newFields;
    });
    toast.success("Field removed successfully!");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFieldNameChange = (index: number, newName: string) => {
    setAdditionalFields((prev: any) =>
      prev.map((field: any, i: number) =>
        i === index ? { ...field, fieldName: newName } : field
      )
    );
  };

  const handleDefaultValueChange = (index: number, newValue: string) => {
    setAdditionalFields((prev: any) =>
      prev.map((field: any, i: number) =>
        i === index ? { ...field, defaultValue: newValue } : field
      )
    );
    const fieldKeys = ["department", "rollNumber", "bloodGroup", "dateOfBirth", "phone"];
    const key = fieldKeys[index] || `customField${index}`;
    if (key) {
      handleInputChange(key, newValue);
    }
  };

  const handlePrevious = () => {
    const sessionData = {
      ...formData,
      cardOrientation,
      idCardType,
    };
    sessionStorage.setItem("formData", JSON.stringify(sessionData));
    console.log("💾 Saved formData before going back:", sessionData);

    const project = formData.project || "Project";
    router.push(`/dashboard/card-template-setup?project=${encodeURIComponent(project)}`);
  };

  const { user } = useSelector((state: RootState) => state.auth);

  const handleGenerateProject = async (quantity: number) => {
    if (!user || !user.userId) return;

    const templateId =
      cardOrientation === "vertical"
        ? "68b759c0fa9b3b1fd60fab77"
        : "68b7582aaa0bc46f0acfb675";

    const payload = {
      userId: user.userId,
      projectName: projectName,
      templateId,
      institutionName: formData.instituteName,
      cardType: formData.idCardType,
      address: formData.address,
      institutionLogoUrl: formData.logoUrl,
      institutionSignUrl: {
        roleName: formData.whoseSign,
        signUrl: formData.signatureUrl,
      },
      personPhotoBGColorCode: formData.bgColor,
      additionalFields,
      cardQuantity: quantity,
    };

    try {
      const toastId = toast.loading("🚀 Creating project...", {
        duration: 4000,
        className: "bg-blue-600 text-white font-semibold text-center shadow-lg",
      });

      await createProject(payload).unwrap();

      toast.success("🎉 Project created successfully!", {
        id: toastId,
        duration: 6000,
      });

      sessionStorage.removeItem("formData");
      sessionStorage.removeItem("selectedCard");
      sessionStorage.removeItem("additionalFields");
      sessionStorage.removeItem("cardOrientation");

      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.error || "❌ Failed to create project. Please try again.";

      toast.error(errorMessage, {
        duration: 7000,
        className: "bg-red-600 text-white font-semibold text-center shadow-lg",
      });
    }
  };

  const fieldLabels = {
    studentName: "Name",
    department: additionalFields[0]?.fieldName || "Department",
    rollNumber: additionalFields[1]?.fieldName || "Roll Number",
    employeeId: additionalFields[1]?.fieldName || "Employee ID",
    bloodGroup: additionalFields[2]?.fieldName || "Blood Group",
    dateOfBirth: additionalFields[3]?.fieldName || "Date of Birth",
    phone: additionalFields[4]?.fieldName || "Phone",
  };

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
      whoseSign: formData.whoseSign,
    };

    const studentCustomLabels = {
      studentName: fieldLabels.studentName,
      department: fieldLabels.department,
      rollNumber: fieldLabels.rollNumber,
      bloodGroup: fieldLabels.bloodGroup,
      dateOfBirth: fieldLabels.dateOfBirth,
      phone: fieldLabels.phone,
    };

    const employeeCustomLabels = {
      studentName: fieldLabels.studentName,
      department: fieldLabels.department,
      rollNumber: fieldLabels.rollNumber,
      employeeId: fieldLabels.employeeId,
      bloodGroup: fieldLabels.bloodGroup,
      dateOfBirth: fieldLabels.dateOfBirth,
      phone: fieldLabels.phone,
    };

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
            customLabels={employeeCustomLabels}
            orientation={cardOrientation}
          />
        );
      } else {
        return (
          <StudentCard
            {...cardProps}
            studentName={formData.studentName}
            roll={formData.rollNumber}
            customLabels={studentCustomLabels}
            orientation={cardOrientation}
          />
        );
      }
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
            customLabels={employeeCustomLabels}
            orientation={cardOrientation}
          />
        );
      } else {
        return (
          <StudentCard
            {...cardProps}
            studentName={formData.studentName}
            roll={formData.rollNumber}
            customLabels={studentCustomLabels}
            orientation={cardOrientation}
          />
        );
      }
    }

    return (
      <StudentCard
        {...cardProps}
        studentName={formData.studentName}
        roll={formData.rollNumber}
        customLabels={studentCustomLabels}
        orientation={cardOrientation}
      />
    );
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Contact Info Field Selection</h1>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-base font-medium text-gray-800">Name</label>
                      <span className="text-xs text-gray-500 ml-2">(Fixed)</span>
                    </div>
                    {additionalFields.map((field: any, index: number) => (
                      <div key={index}>
                        {/* Editable Field Name */}
                        <div className="flex items-center gap-2 mb-2">
                          {editingField === `fieldName-${index}` ? (
                            <Input
                              type="text"
                              value={field.fieldName}
                              onChange={(e) => handleFieldNameChange(index, e.target.value)}
                              onBlur={() => setEditingField(null)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") setEditingField(null);
                              }}
                              autoFocus
                              className="h-8"
                            />
                          ) : (
                            <>
                              <label className="block text-base font-medium text-gray-800">
                                {field.fieldName}
                              </label>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setEditingField(`fieldName-${index}`)}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>

                        {/* Editable Default Value */}
                        <div className="flex items-center gap-2 mb-2">
                          {editingField === `defaultValue-${index}` ? (
                            <Input
                              type="text"
                              value={field.defaultValue}
                              onChange={(e) => handleDefaultValueChange(index, e.target.value)}
                              onBlur={() => setEditingField(null)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") setEditingField(null);
                              }}
                              autoFocus
                              className="h-8 bg-gray-200 border border-gray-600"
                            />
                          ) : (
                            <>
                              <Input
                                type="text"
                                value={field.defaultValue || ""}
                                disabled
                                className="h-8 text-gray-700 bg-gray-200"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setEditingField(`defaultValue-${index}`)}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="destructive"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleRemoveField(index)}
                          disabled={additionalFields.length <= 1}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Add Field Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={handleAddField}
                  >
                    Add Field
                  </Button>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    onClick={handlePrevious}
                    className="flex-1 h-14 text-gray-600 border border-gray-300 rounded-xl text-lg font-medium bg-white hover:bg-gray-100 hover:text-gray-900"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 h-14 bg-[#4A61E4] hover:bg-[#4A61E6] text-white text-lg rounded-xl font-medium"
                  >
                    Next
                  </Button>
                </div>
              </div>

              {/* Right Preview Section */}
              <div className="flex flex-col items-center justify-start -mt-10">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Preview</h2>
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
              </div>
            </div>
          </div>
        </main>
      </div>

      <CardQuantityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerateProject}
      />
    </>
  );
}