/* eslint-disable @typescript-eslint/no-explicit-any */



// "use client"

// import React, { useEffect, useState, useRef } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useRouter, useSearchParams } from "next/navigation"
// import StudentCard from "@/components/layout/cards/StudentCard"
// import { LucideUpload, Edit3, X } from "lucide-react"
// import EmployeeCard from "@/components/layout/cards/EmployeCard"
// import { toast } from "sonner"
// import imageUpload from "@/utils/imageUpload"
// import { Label } from "@/components/ui/label"
// import { DashboardHeader } from "../_components/dashboard-header"

// // Signature Customization Modal Component
// const SignatureCustomizationModal = ({
//   isOpen,
//   onClose,
//   onSave,
//   initialImage
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (processedImage: string) => void;
//   initialImage: string | null;
// }) => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [image, setImage] = useState<HTMLImageElement | null>(null);
//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [saturation, setSaturation] = useState(100);

//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (initialImage && isOpen) {
//       const img = new Image();
//       img.crossOrigin = "anonymous";
//       img.src = initialImage;
//       img.onload = () => setImage(img);
//     }
//   }, [initialImage, isOpen]);

//   useEffect(() => {
//     if (!image || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = image.width;
//     canvas.height = image.height;

//     ctx.filter = `
//       brightness(${brightness}%)
//       contrast(${contrast}%)
//       saturate(${saturation}%)
//     `;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(image, 0, 0);
//     setPreview(canvas.toDataURL("image/jpeg"));
//   }, [image, brightness, contrast, saturation]);

//   const handleSave = async () => {
//     if (!preview) return;

//     try {
//       toast.loading("Uploading image...")

//       const response = await fetch(preview);
//       const blob = await response.blob();
//       const file = new File([blob], "signature.jpg", { type: "image/jpeg" });

//       const uploadedUrl = await imageUpload(file);

//       toast.dismiss()
//       if (uploadedUrl) {
//         onSave(uploadedUrl);
//         onClose();
//         toast.success("Image uploaded successfully!", { duration: 4000 })
//       } else {
//         toast.error("Failed to upload image", {
//           duration: 6000,
//           className: "bg-red-600 text-white font-semibold shadow-lg",
//         })
//       }
//     } catch (error) {
//       toast.dismiss()
//       toast.error("Error uploading image!", {
//         duration: 6000,
//         className: "bg-red-600 text-white font-semibold shadow-lg",
//       })
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
//       <div className="bg-white p-4 sm:p-6 space-y-4 rounded-lg w-full max-w-md mx-auto">
//         <div className="flex justify-between items-center">
//           <h3 className="text-base sm:text-lg font-medium">Customize Signature</h3>
//           <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
//             <X size={16} />
//           </Button>
//         </div>

//         {preview && (
//           <img
//             src={preview}
//             alt="Edited Preview"
//             className="mt-4 w-full max-w-[200px] sm:max-w-[300px] rounded shadow mx-auto block"
//           />
//         )}

//         <div className="space-y-3">
//           <div>
//             <Label className="text-sm font-medium text-gray-700">Exposure (Brightness): {brightness}%</Label>
//             <input
//               type="range"
//               min="50"
//               max="200"
//               value={brightness}
//               onChange={(e) => setBrightness(Number(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg"
//             />
//           </div>
//           <div>
//             <Label className="text-sm font-medium text-gray-700">Contrast: {contrast}%</Label>
//             <input
//               type="range"
//               min="50"
//               max="200"
//               value={contrast}
//               onChange={(e) => setContrast(Number(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg"
//             />
//           </div>
//           <div>
//             <Label className="text-sm font-medium text-gray-700">Saturation: {saturation}%</Label>
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={saturation}
//               onChange={(e) => setSaturation(Number(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg"
//             />
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={onClose} className="flex-1 h-10 text-sm">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="flex-1 h-10 text-sm">
//             Save
//           </Button>
//         </div>

//         <canvas ref={canvasRef} style={{ display: "none" }} />
//       </div>
//     </div>
//   );
// };

// export default function InstituteTemplateSetupPage() {
//   const router = useRouter()

//   const searchParams = useSearchParams()
//   const queryProjectName = searchParams.get("project")
//   const queryStyle = searchParams.get("style") // Get style from URL
//   const savedFormData = sessionStorage.getItem("formData")
//   const parsedFormData = savedFormData ? JSON.parse(savedFormData) : {}
//   const sessionProjectName = parsedFormData.project || null
//   const projectName = queryProjectName || sessionProjectName || ""

//   // Determine card orientation from URL style parameter
//   const cardOrientation = queryStyle || "horizontal"
//   // console.log("card oriantation ========================>",queryStyle);

//   const [form, setForm] = useState<any>({});
//   const [showSignatureModal, setShowSignatureModal] = useState(false);
//   const [tempSignatureImage, setTempSignatureImage] = useState<string | null>(null);
//   // New state to track file uploads
//   const [isLogoUploaded, setIsLogoUploaded] = useState(false);
//   const [isSignatureUploaded, setIsSignatureUploaded] = useState(false);

//   useEffect(() => {
//   const savedFormData = sessionStorage.getItem("formData");
//   const parsedData = savedFormData ? JSON.parse(savedFormData) : {};

//   // Default values based on card orientation
//   const defaultType = cardOrientation === "vertical" ? "Employee" : "Student";
//   const defaultSign = cardOrientation === "vertical" ? "Chairman" : "Principal";

//   setForm({
//     project: parsedData.project || projectName || "",
//     instituteName: parsedData.instituteName || "",
//     idCardType: parsedData.idCardType || defaultType,
//     address: parsedData.address || "",
//     department: parsedData.department || "",
//     roll: parsedData.roll || "",
//     employeeId: parsedData.employeeId || "",
//     bloodGroup: parsedData.bloodGroup || "",
//     dob: parsedData.dob || "",
//     phone: parsedData.phone || "",
//     logoUrl: parsedData.logoUrl || "",
//     signatureUrl: parsedData.signatureUrl || "",
//     profileUrl: parsedData.profileUrl,
//     bgColor: parsedData.bgColor || "#0f172a",
//     qrData: parsedData.qrData,
//     whoseSign: parsedData.whoseSign || defaultSign,
//     cardOrientation: cardOrientation,
//   });

//   // Set upload states based on saved data
//   setIsLogoUploaded(!!parsedData.logoUrl);
//   setIsSignatureUploaded(!!parsedData.signatureUrl);
// }, [projectName, cardOrientation]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0]

//       const reader = new FileReader();
//       reader.onload = async (event) => {
//         const dataUrl = event.target?.result as string;

//         if (field === "signatureUrl") {
//           setForm((prev: any) => ({ ...prev, signatureUrl: dataUrl }));
//           setIsSignatureUploaded(true);
//           setTempSignatureImage(dataUrl);
//           setShowSignatureModal(true);
//           return;
//         }

//         // For logo
//         setForm((prev: any) => ({ ...prev, [field]: dataUrl }));
//         setIsLogoUploaded(true);
//         toast.loading("Uploading image...");

//         try {
//           const uploadedUrl = await imageUpload(file);
//           toast.dismiss();
//           if (uploadedUrl) {
//             setForm((prev: any) => ({ ...prev, [field]: uploadedUrl }));
//             toast.success("Image uploaded successfully!", { duration: 4000 });
//           } else {
//             toast.error("Failed to upload image", {
//               duration: 6000,
//               className: "bg-red-600 text-white font-semibold shadow-lg",
//             });
//             // Keep dataUrl for preview
//           }
//         } catch (error) {
//           toast.dismiss();
//           let message = "Error uploading image!";
//           if (error instanceof Error) {
//             message = error.message;
//           }
//           toast.error(message, {
//             duration: 6000,
//             className: "bg-red-600 text-white font-semibold shadow-lg",
//           });
//           // Keep dataUrl for preview
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   const handleSignatureSave = (processedImageUrl: string) => {
//     setForm({ ...form, signatureUrl: processedImageUrl });
//     setTempSignatureImage(null);
//     setIsSignatureUploaded(true); // Update signature upload state
//   };

//   const requiredFields = [
//     "instituteName",
//     "idCardType",
//     "address",
//     "whoseSign",
//     "logoUrl",
//     "signatureUrl",
//   ];

//   const handlePrevious = () => {
//     sessionStorage.setItem("formData", JSON.stringify(form))
//     router.push(`/dashboard/select-card?project=${projectName}`)
//   }

//   const handleNext = () => {
//     const missingFields = requiredFields.filter((field) => !form[field] || form[field].toString().trim() === "");
//     if (missingFields.length > 0) {
//       toast.error(`Please fill out the ${missingFields[0]} field.`, {
//         duration: 4000,
//         className: "bg-red-600 text-white font-semibold shadow-lg",
//       });
//       return;
//     }

//     sessionStorage.setItem("formData", JSON.stringify(form));
//     router.push(`/dashboard/card-information?project=${projectName}`);
//   }

//   const colors = ["#ffffff", "#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7"]

//   // Defaults for cards
//   const defaultLogo = "https://i.postimg.cc/hthwhxwy/uni-logo.avif";
//   const defaultSignature = "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png";

//   return (
//     <div className="min-h-screen bg-white">
//       <DashboardHeader />

//       <main className="container mx-auto px-3 sm:px-5 lg:px-8 py-2 sm:py-3">
//         <div className="max-w-full mx-auto">
//           <h1 className="text-xl lg:hidden text-center bg-[#4A61E4] p-2 rounded-xl text-white sm:text-2xl font-bold lg:text-gray-900 mb-0">
//                 Template Setup
//               </h1>
//           <div className="flex flex-col-reverse gap-10  lg:flex-row lg:gap-8">
//             {/* Left Form Section */}
//             <div className="w-full lg:w-1/2 space-y-6">
//               <h1 className="text-xl hidden lg:block sm:text-2xl font-bold text-gray-900 mb-4">
//                 Template Setup
//               </h1>

//               <div className="space-y-4">
//                 {/* Institute Name */}
//                 <div className="space-y-2">
//                   <Label className="text-sm sm:text-base font-medium text-gray-700">
//                     Institute Name
//                   </Label>
//                   <Input
//                     name="instituteName"
//                     value={form.instituteName}
//                     onChange={handleChange}
//                     placeholder='Type Institute Name'
//                     className="h-12 sm:h-14 bg-gray-50 border-0 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
//                   />
//                 </div>

               

//                 {/* Address */}
//                 <div className="space-y-2">
//                   <Label className="text-sm sm:text-base font-medium text-gray-700">Address</Label>
//                   <Input
//                     name="address"
//                     value={form.address}
//                     onChange={handleChange}
//                     placeholder="Type Address"
//                     className="h-12 sm:h-14 bg-gray-50 border-0 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
//                   />
//                 </div>
//                  {/* ID Card Type */}
//                 <div className="space-y-2">
//                   <Label className="text-sm sm:text-base font-medium text-gray-700">ID Card Type</Label>
//                   <Input
//                     name="idCardType"
//                     value={form.idCardType}
//                     onChange={handleChange}
//                     placeholder="Type ID Card Type (e.g., Student, Employee, Staff)"
//                     className="h-12 sm:h-14 bg-gray-50 border-0 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
//                   />
//                 </div>

//                 {/* Whose Sign */}
//                 <div className="space-y-2">
//                   <Label className="text-sm sm:text-base font-medium text-gray-700">Whose Sign</Label>
//                   <Input
//                     name="whoseSign"
//                     value={form.whoseSign}
//                     onChange={handleChange}
//                     placeholder="Whose Sign"
//                     className="h-12 sm:h-14 bg-gray-50 border-0 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
//                   />
//                 </div>

//                 {/* Upload Buttons */}
//                 <div className="space-y-4">
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <label className="cursor-pointer flex-1">
//                       <div className="h-12 sm:h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-100 transition-colors">
//                         <LucideUpload size={16} className="text-gray-600" />
//                         <span className="text-sm sm:text-base text-gray-700 font-medium">
//                           {isLogoUploaded ? "Logo Selected" : "Institution Logo"}
//                         </span>
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleFileChange(e, "logoUrl")}
//                         className="hidden"
//                       />
//                     </label>
//                     <label className="cursor-pointer flex-1">
//                       <div className="h-12 sm:h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-100 transition-colors">
//                         <Edit3 size={16} className="text-gray-600" />
//                         <span className="text-sm sm:text-base text-gray-700 font-medium">
//                           {isSignatureUploaded ? "Signature Selected" : "Signature"}
//                         </span>
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleFileChange(e, "signatureUrl")}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                   <Button
//                     variant="outline"
//                     className="flex-1 h-12 sm:h-14 text-gray-600 border-gray-300 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 hover:text-gray-900"
//                     onClick={handlePrevious}
//                   >
//                     Previous
//                   </Button>
//                   <Button
//                     onClick={handleNext}
//                     className="flex-1 h-12 sm:h-14 bg-[#4A61E4] hover:bg-[#4A61E6] text-white text-sm sm:text-base rounded-lg font-medium"
//                   >
//                     Next
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Right Preview Section */}
//             <div className="w-full lg:w-1/2 space-y-6 mt-2 lg:mt-6">
//               <div>
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-0 lg:mb-4">
//                   Preview
//                 </h2>
//               </div>

//               <div className="flex justify-center">
//                 {cardOrientation === "vertical" ? (
//                   <EmployeeCard
//                     name="Name"
//                     companyName={form.instituteName || "Example Company"}
//                     address={form.address || "21A/B mine union point, Singapore"}
//                     idCardType={form.idCardType || "Employee"}
//                     employeeName="Name"
//                     department="CSE"
//                     employeeId="1233"
//                     bloodGroup="B+"
//                     dob="12-12-2000"
//                     phone="+65-2131-XXXX"
//                     logoUrl={form.logoUrl}
//                     signatureUrl={form.signatureUrl}
//                     profileUrl={form.profileUrl}
//                     bgColor={form.bgColor}
//                     qrData={form.qrData}
//                     whoseSign={form.whoseSign || "Chairman"}
//                     personImage={form.profileUrl}
//                     logo={form.logoUrl}
//                     signature={form.signatureUrl}
//                   />
//                 ) : (
//                   <StudentCard
//                     instituteName={form.instituteName || "Example Institute"}
//                     address={form.address || "21A/B mine union point, Singapore"}
//                     idCardType={form.idCardType || "Student"}
//                     studentName="Name"
//                     department="CSE"
//                     roll="1233"
//                     bloodGroup="B+"
//                     dob="12-12-2000"
//                     phone="+65-2131-XXXX"
//                     logoUrl={form.logoUrl || defaultLogo}
//                     signatureUrl={form.signatureUrl || defaultSignature}
//                     profileUrl={form.profileUrl}
//                     bgColor={form.bgColor}
//                     qrData={form.qrData}
//                     whoseSign={form.whoseSign || "Principal"}
//                   />
//                 )}
//               </div>

//               {/* Color Picker */}
//               <div className="flex flex-col items-center gap-3 mt-6">
//                 <p className="text-sm text-gray-600 font-medium">
//                   Select Photo Background Color
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-2">
//                   {colors.map((color) => (
//                     <button
//                       key={color}
//                       onClick={() => setForm({ ...form, bgColor: color })}
//                       className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all ${form.bgColor === color
//                         ? 'border-gray-800 scale-110'
//                         : 'border-gray-200 hover:border-gray-400'
//                         }`}
//                       style={{ backgroundColor: color }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <SignatureCustomizationModal
//         isOpen={showSignatureModal}
//         onClose={() => {
//           setShowSignatureModal(false);
//           setTempSignatureImage(null);
//         }}
//         onSave={handleSignatureSave}
//         initialImage={tempSignatureImage}
//       />
//     </div>
//   )
// }






"use client"

import React, { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import StudentCard from "@/components/layout/cards/StudentCard"
import { LucideUpload, Edit3, X } from "lucide-react"
import EmployeeCard from "@/components/layout/cards/EmployeCard"
import { toast } from "sonner"
import imageUpload from "@/utils/imageUpload"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "../_components/dashboard-header"

// Signature Customization Modal Component
const SignatureCustomizationModal = ({
  isOpen,
  onClose,
  onSave,
  initialImage
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (processedImage: string) => void;
  initialImage: string | null;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (initialImage && isOpen) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = initialImage;
      img.onload = () => setImage(img);
    }
  }, [initialImage, isOpen]);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.filter = `
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
    `;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    setPreview(canvas.toDataURL("image/jpeg"));
  }, [image, brightness, contrast, saturation]);

  const handleSave = async () => {
    if (!preview) return;

    try {
      toast.loading("Uploading image...")

      const response = await fetch(preview);
      const blob = await response.blob();
      const file = new File([blob], "signature.jpg", { type: "image/jpeg" });

      const uploadedUrl = await imageUpload(file);

      toast.dismiss()
      if (uploadedUrl) {
        onSave(uploadedUrl);
        onClose();
        toast.success("Image uploaded successfully!", { duration: 4000 })
      } else {
        toast.error("Failed to upload image", {
          duration: 6000,
          className: "bg-red-600 text-white font-semibold shadow-lg",
        })
      }
    } catch (error) {
      toast.dismiss()
      toast.error("Error uploading image!", {
        duration: 6000,
        className: "bg-red-600 text-white font-semibold shadow-lg",
      })
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-6 space-y-4 rounded-lg w-full max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-medium">Customize Signature</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X size={16} />
          </Button>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Edited Preview"
            className="mt-4 w-full max-w-[200px] sm:max-w-[300px] rounded shadow mx-auto block"
          />
        )}

        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium text-gray-700">Exposure (Brightness): {brightness}%</Label>
            <input
              type="range"
              min="50"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Contrast: {contrast}%</Label>
            <input
              type="range"
              min="50"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Saturation: {saturation}%</Label>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1 h-10 text-sm">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 h-10 text-sm">
            Save
          </Button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default function InstituteTemplateSetupPage() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const queryProjectName = searchParams.get("project")
  const queryStyle = searchParams.get("style")
  const savedFormData = sessionStorage.getItem("formData")
  const parsedFormData = savedFormData ? JSON.parse(savedFormData) : {}
  const sessionProjectName = parsedFormData.project || null
  const projectName = queryProjectName || sessionProjectName || ""

  const cardOrientation = queryStyle || "horizontal"

  const [form, setForm] = useState<any>({});
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [tempSignatureImage, setTempSignatureImage] = useState<string | null>(null);
  const [isLogoUploaded, setIsLogoUploaded] = useState(false);
  const [isSignatureUploaded, setIsSignatureUploaded] = useState(false);

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("formData");
    const parsedData = savedFormData ? JSON.parse(savedFormData) : {};

    const defaultType = cardOrientation === "vertical" ? "Employee" : "Student";
    const defaultSign = cardOrientation === "vertical" ? "Chairman" : "Principal";

    setForm({
      project: parsedData.project || projectName || "",
      instituteName: parsedData.instituteName || "",
      idCardType: parsedData.idCardType || defaultType,
      address: parsedData.address || "",
      department: parsedData.department || "",
      roll: parsedData.roll || "",
      employeeId: parsedData.employeeId || "",
      bloodGroup: parsedData.bloodGroup || "",
      dob: parsedData.dob || "",
      phone: parsedData.phone || "",
      logoUrl: parsedData.logoUrl || "",
      signatureUrl: parsedData.signatureUrl || "",
      profileUrl: parsedData.profileUrl,
      bgColor: parsedData.bgColor || "#0f172a",
      qrData: parsedData.qrData,
      whoseSign: parsedData.whoseSign || defaultSign,
      cardOrientation: cardOrientation,
    });

    setIsLogoUploaded(!!parsedData.logoUrl);
    setIsSignatureUploaded(!!parsedData.signatureUrl);
  }, [projectName, cardOrientation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;

        if (field === "signatureUrl") {
          setForm((prev: any) => ({ ...prev, signatureUrl: dataUrl }));
          setIsSignatureUploaded(true);
          setTempSignatureImage(dataUrl);
          setShowSignatureModal(true);
          return;
        }

        setForm((prev: any) => ({ ...prev, [field]: dataUrl }));
        setIsLogoUploaded(true);
        toast.loading("Uploading image...");

        try {
          const uploadedUrl = await imageUpload(file);
          toast.dismiss();
          if (uploadedUrl) {
            setForm((prev: any) => ({ ...prev, [field]: uploadedUrl }));
            toast.success("Image uploaded successfully!", { duration: 4000 });
          } else {
            toast.error("Failed to upload image", {
              duration: 6000,
              className: "bg-red-600 text-white font-semibold shadow-lg",
            });
          }
        } catch (error) {
          toast.dismiss();
          let message = "Error uploading image!";
          if (error instanceof Error) {
            message = error.message;
          }
          toast.error(message, {
            duration: 6000,
            className: "bg-red-600 text-white font-semibold shadow-lg",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSignatureSave = (processedImageUrl: string) => {
    setForm({ ...form, signatureUrl: processedImageUrl });
    setTempSignatureImage(null);
    setIsSignatureUploaded(true);
  };

  const requiredFields = [
    "instituteName",
    "idCardType",
    "address",
    "whoseSign",
    "logoUrl",
    "signatureUrl",
  ];

  const handlePrevious = () => {
    sessionStorage.setItem("formData", JSON.stringify(form))
    router.push(`/dashboard/select-card?project=${projectName}`)
  }

  const handleNext = () => {
    const missingFields = requiredFields.filter((field) => !form[field] || form[field].toString().trim() === "");
    if (missingFields.length > 0) {
      toast.error(`Please fill out the ${missingFields[0]} field.`, {
        duration: 4000,
        className: "bg-red-600 text-white font-semibold shadow-lg",
      });
      return;
    }

    sessionStorage.setItem("formData", JSON.stringify(form));
    router.push(`/dashboard/card-information?project=${projectName}`);
  }

  const colors = ["#ffffff", "#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#a855f7"]

  const defaultLogo = "https://i.postimg.cc/hthwhxwy/uni-logo.avif";
  const defaultSignature = "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png";

  // ✅ Default fields for preview
  const defaultFields = [
    { label: "Department", value: "CSE" },
    { label: "Roll Number", value: "1233" },
    { label: "Blood Group", value: "B+" },
    { label: "Date of Birth", value: "12-12-2000" },
    { label: "Phone", value: "+65-2131-XXXX" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="container mx-auto px-3 sm:px-5 lg:px-8 py-2 sm:py-3">
        <div className="max-w-full mx-auto">
          <h1 className="text-xl lg:hidden text-center bg-[#4A61E4] p-2 rounded-xl text-white sm:text-2xl font-bold lg:text-gray-900 mb-0">
            Template Setup
          </h1>
          <div className="flex flex-col-reverse gap-10  lg:flex-row lg:gap-8">
            {/* Left Form Section */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-xl hidden lg:block sm:text-2xl font-bold text-gray-900 mb-4">
                Template Setup
              </h1>

              <div className="space-y-4">
                {/* Institute Name */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-medium text-gray-700">
                    Institute Name
                  </Label>
                  <Input
                    name="instituteName"
                    value={form.instituteName}
                    onChange={handleChange}
                    placeholder='Type Institute Name'
                    className="h-12 sm:h-14 bg-gray-50 border-0 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-medium text-gray-700">Address</Label>
                  <Input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Type Address"
                    className="h-12 sm:h-14 bg-gray-50 border-0 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                {/* ID Card Type */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-medium text-gray-700">ID Card Type</Label>
                  <Input
                    name="idCardType"
                    value={form.idCardType}
                    onChange={handleChange}
                    placeholder="Type ID Card Type (e.g., Student, Employee, Staff)"
                    className="h-12 sm:h-14 bg-gray-50 border-0 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                {/* Whose Sign */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-medium text-gray-700">Whose Sign</Label>
                  <Input
                    name="whoseSign"
                    value={form.whoseSign}
                    onChange={handleChange}
                    placeholder="Whose Sign"
                    className="h-12 sm:h-14 bg-gray-50 border-0 rounded-lg text-sm sm:text-base text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                {/* Upload Buttons */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="cursor-pointer flex-1">
                      <div className="h-12 sm:h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-100 transition-colors">
                        <LucideUpload size={16} className="text-gray-600" />
                        <span className="text-sm sm:text-base text-gray-700 font-medium">
                          {isLogoUploaded ? "Logo Selected" : "Institution Logo"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "logoUrl")}
                        className="hidden"
                      />
                    </label>
                    <label className="cursor-pointer flex-1">
                      <div className="h-12 sm:h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-100 transition-colors">
                        <Edit3 size={16} className="text-gray-600" />
                        <span className="text-sm sm:text-base text-gray-700 font-medium">
                          {isSignatureUploaded ? "Signature Selected" : "Signature"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "signatureUrl")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 sm:h-14 text-gray-600 border-gray-300 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 hover:text-gray-900"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 h-12 sm:h-14 bg-[#4A61E4] hover:bg-[#4A61E6] text-white text-sm sm:text-base rounded-lg font-medium"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Preview Section */}
            <div className="w-full lg:w-1/2 space-y-6 mt-2 lg:mt-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-0 lg:mb-4">
                  Preview
                </h2>
              </div>

              <div className="flex justify-center">
                {cardOrientation === "vertical" ? (
                  <EmployeeCard
                    name="Name"
                    companyName={form.instituteName || "Example Company"}
                    address={form.address || "21A/B mine union point, Singapore"}
                    idCardType={form.idCardType || "Employee"}
                    employeeName="Name"
                    department="CSE"
                    employeeId="1233"
                    bloodGroup="B+"
                    dob="12-12-2000"
                    phone="+65-2131-XXXX"
                    logoUrl={form.logoUrl}
                    signatureUrl={form.signatureUrl}
                    profileUrl={form.profileUrl}
                    bgColor={form.bgColor}
                    qrData={form.qrData}
                    whoseSign={form.whoseSign || "Chairman"}
                    personImage={form.profileUrl}
                    logo={form.logoUrl}
                    signature={form.signatureUrl}
                    dynamicFields={defaultFields}
                  />
                ) : (
                  <StudentCard
                    instituteName={form.instituteName || "Example Institute"}
                    address={form.address || "21A/B mine union point, Singapore"}
                    idCardType={form.idCardType || "Student"}
                    studentName="Name"
                    department="CSE"
                    roll="1233"
                    bloodGroup="B+"
                    dob="12-12-2000"
                    phone="+65-2131-XXXX"
                    logoUrl={form.logoUrl || defaultLogo}
                    signatureUrl={form.signatureUrl || defaultSignature}
                    profileUrl={form.profileUrl}
                    bgColor={form.bgColor}
                    qrData={form.qrData}
                    whoseSign={form.whoseSign || "Principal"}
                    dynamicFields={defaultFields}
                  />
                )}
              </div>

              {/* Color Picker */}
              <div className="flex flex-col items-center gap-3 mt-6">
                <p className="text-sm text-gray-600 font-medium">
                  Select Photo Background Color
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setForm({ ...form, bgColor: color })}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all ${form.bgColor === color
                        ? 'border-gray-800 scale-110'
                        : 'border-gray-200 hover:border-gray-400'
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SignatureCustomizationModal
        isOpen={showSignatureModal}
        onClose={() => {
          setShowSignatureModal(false);
          setTempSignatureImage(null);
        }}
        onSave={handleSignatureSave}
        initialImage={tempSignatureImage}
      />
    </div>
  )
}