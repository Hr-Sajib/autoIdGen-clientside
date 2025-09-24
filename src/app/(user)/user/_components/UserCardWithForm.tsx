


// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import HorizontalCardForUser from "./HorizontalCardForUser";
// import VerticalCardForUser from "./VerticalCardForUser";
// import Image from "next/image";
// import Cropper from "react-easy-crop";
// import { useSearchParams } from "next/navigation";

// // ---------------------
// // Utility for cropping
// // ---------------------
// type CroppedAreaPixels = { x: number; y: number; width: number; height: number };

// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const img = document.createElement("img");
//     img.onload = () => resolve(img);
//     img.onerror = (error) => reject(new Error("Failed to load image: " + error));
//     if (!url.startsWith("blob:")) img.crossOrigin = "anonymous";
//     img.src = url;
//   });

// const getCroppedImg = async (imageSrc: string, pixelCrop: CroppedAreaPixels): Promise<string> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Could not get 2D context");

//   const safePixelCrop = {
//     x: Math.max(0, Math.min(pixelCrop.x, image.width)),
//     y: Math.max(0, Math.min(pixelCrop.y, image.height)),
//     width: Math.max(1, Math.min(pixelCrop.width, image.width - pixelCrop.x)),
//     height: Math.max(1, Math.min(pixelCrop.height, image.height - pixelCrop.y)),
//   };

//   canvas.width = safePixelCrop.width;
//   canvas.height = safePixelCrop.height;

//   ctx.drawImage(
//     image,
//     safePixelCrop.x,
//     safePixelCrop.y,
//     safePixelCrop.width,
//     safePixelCrop.height,
//     0,
//     0,
//     safePixelCrop.width,
//     safePixelCrop.height
//   );

//   return canvas.toDataURL("image/jpeg", 0.9);
// };

// const UserCardWithForm = () => {
//     const searchParams = useSearchParams();

    
//     const role = searchParams.get("role");
//     const batchCode = searchParams.get("batchCode");
//     const rollSerial = searchParams.get("rollSerial");
//     const [projectData, setProjectData] = useState('');
    
//     console.log("Role:", role);
//     console.log("Batch Code:", batchCode);
//     console.log("Roll Serial:", rollSerial);
//     useEffect(() => {
//   const fetchBatchData = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/batch/${batchCode}`);
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const data = await response.json();
//       console.log("project data by batchCode :===========>", data);
//       setProjectData(data);

//     } catch (error) {
//       console.error("Failed to fetch batch data:", error);
//     }
//   };

//   fetchBatchData();
// }, [batchCode,role,rollSerial]);
  
//   // backend থেকে আসা fields
//   const fields = ["fathersName", "mothersName", "class", "department",];

//   const [values, setValues] = useState<{ [key: string]: string }>({});
//   const [profileUrl, setProfileUrl] = useState("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");
//   const [cardOrientation, setCardOrientation] = useState<"horizontal" | "vertical">("horizontal");

//   // cropper states
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
//   const [showCropper, setShowCropper] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   // webcam states
//   const [showWebcam, setShowWebcam] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleChange = (field: string, value: string) => {
//     setValues((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (!file.type.startsWith("image/")) return alert("Select a valid image");
//     if (file.size > 10 * 1024 * 1024) return alert("Image < 10MB");

//     const imgUrl = URL.createObjectURL(file);
//     setImageSrc(imgUrl);
//     setShowCropper(true);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   const onCropComplete = useCallback((_ : unknown, croppedAreaPixels: CroppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const handleCropSave = async () => {
//     if (!imageSrc || !croppedAreaPixels) return alert("Select area to crop");
//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//       if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
//       if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
//       setPhotoPreview(croppedImage);
//       setProfileUrl(croppedImage);
//       setShowCropper(false);
//       setImageSrc(null);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setPhotoPreview(null);
//     setProfileUrl("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");
//   };

//   const handleTakePhoto = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;
//       setShowWebcam(true);
//       if (videoRef.current) videoRef.current.srcObject = stream;
//     } catch (err) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleCaptureFromWebcam = () => {
//     if (!videoRef.current) return;
//     const video = videoRef.current;
//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/jpeg", 0.9);

//     setImageSrc(imgData);
//     setShowCropper(true);
//     setShowWebcam(false);

//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;
//   };

//   const handleCloseWebcam = () => {
//     setShowWebcam(false);
//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;
//   };

//   useEffect(() => {
//     return () => {
//       if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
//       if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//     };
//   }, [imageSrc, photoPreview]);

//   return (
//     <div className="flex gap-10 p-6">
//       {/* <div>
//         {JSON.stringify(projectData)}
//       </div> */}
//       {/* ---------- Left: Form ---------- */}
//       <div className="w-[350px] border rounded-lg p-4 shadow-md bg-white">
//         <h2 className="text-lg font-bold mb-3">Enter Student Info</h2>

//         {/* Card Orientation Select */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1">Card Orientation</label>
//           <select
//             className="w-full border rounded px-2 py-1"
//             value={cardOrientation}
//             onChange={(e) => setCardOrientation(e.target.value as "horizontal" | "vertical")}
//           >
//             <option value="horizontal">Horizontal</option>
//             <option value="vertical">Vertical</option>
//           </select>
//         </div>

//         {fields.map((field) => (
//           <div key={field} className="mb-3">
//             <label className="block text-sm font-medium mb-1 capitalize">
//               {field.replace(/([A-Z])/g, " $1")}
//             </label>
//             <Input
//               type="text"
//               value={values[field] || ""}
//               onChange={(e) => handleChange(field, e.target.value)}
//               placeholder={`Enter ${field}`}
//             />
//           </div>
//         ))}

//         {/* Upload / Take photo */}
//         <div className="flex flex-wrap gap-3 mt-3">
//           <label className="flex items-center justify-center border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
//             <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
//             ⬆️ Upload Photo
//           </label>
//           <Button variant="outline" onClick={handleTakePhoto}>📷 Take Photo</Button>
//           <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files?.[0] || null)} style={{ display: "none" }} />
//         </div>

//         {/* Photo Preview */}
//         {photoPreview && (
//           <div className="mt-4">
//             <p className="text-sm text-gray-600 mb-2">📸 Current Photo:</p>
//             <div className="relative w-fit">
//               <Image src={photoPreview} alt="Profile Preview" width={128} height={128} className="w-32 h-32 object-cover rounded-lg border shadow" />
//               <Button size="sm" variant="destructive" className="absolute -top-2 -right-2 rounded-full" onClick={handleRemovePhoto}>✕</Button>
//             </div>
//           </div>
//         )}

//         <Button onClick={() => console.log("👉 Submitted:", { ...values, profileUrl, cardOrientation })} className="mt-3 w-full">
//           Save Data
//         </Button>
//       </div>

//       {/* ---------- Right: Card Preview ---------- */}
//       <div>
//         {cardOrientation === "horizontal" ? (
//           <HorizontalCardForUser
//             instituteName="ABC High School"
//             address="Dhaka, Bangladesh"
//             idCardType="Student ID"
//             studentName="Hasibul"
//             qrData="CSE12345"
//             logoUrl="https://i.ibb.co.com/WWp6qvYk/dummy-institusion-logo.png"
//             profileUrl={profileUrl}
//             signatureUrl="https://i.ibb.co.com/qFVRbCkZ/signature-removebg-preview.png"
//             whoseSign="Principal"
//             fields={fields}
//             values={values}
//           />
//         ) : (
//           <VerticalCardForUser
//             instituteName="ABC High School"
//             address="Dhaka, Bangladesh"
//             idCardType="Student ID"
//             studentName="Hasibul"
//             qrData="CSE12345"
//             logoUrl="https://i.ibb.co.com/WWp6qvYk/dummy-institusion-logo.png"
//             profileUrl={profileUrl}
//             signatureUrl="https://i.ibb.co.com/qFVRbCkZ/signature-removebg-preview.png"
//             whoseSign="Principal"
//             fields={fields}
//             values={values}
//           />
//         )}
//       </div>

//       {/* -------- Cropper Modal -------- */}
//       {showCropper && imageSrc && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
//             <div className="p-4 border-b">
//               <h3 className="text-lg font-semibold">Crop Your Image</h3>
//             </div>
//             <div className="relative h-96 bg-gray-100">
//               <Cropper
//                 image={imageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 onCropChange={setCrop}
//                 onCropComplete={onCropComplete}
//                 onZoomChange={setZoom}
//                 showGrid={false}
//               />
//             </div>
//             <div className="p-4 border-t flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setShowCropper(false)}>Cancel</Button>
//               <Button onClick={handleCropSave} className="bg-blue-600 text-white">Apply Crop</Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* -------- Webcam Modal -------- */}
//       {showWebcam && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md p-4">
//             <h3 className="text-lg font-semibold mb-4">📷 Capture Photo</h3>
//             <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
//             <div className="flex justify-end gap-3 mt-4">
//               <Button variant="outline" onClick={handleCloseWebcam}>Cancel</Button>
//               <Button onClick={handleCaptureFromWebcam} className="bg-blue-600 text-white">Capture</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCardWithForm;





//? consoled all of the form values bellow
// todo :  have to host image in imgbb (for now i send a hearcoded personalImageUrl)

// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import HorizontalCardForUser from "./HorizontalCardForUser";
// import VerticalCardForUser from "./VerticalCardForUser";
// import Image from "next/image";
// import Cropper from "react-easy-crop";
// import { useSearchParams } from "next/navigation";

// // ---------------------
// // Types
// // ---------------------
// type CroppedAreaPixels = { x: number; y: number; width: number; height: number };

// interface ProjectData {
//   _id: string;
//   userId: string;
//   projectName: string;
//   templateId: string;
//   institutionName: string;
//   institutionLogoUrl: string;
//   institutionSignUrl: {
//     roleName: string;
//     signUrl: string;
//   };
//   cardType: string;
//   cardQuantity: number;
//   address: string;
//   batchId: number;
//   additionalFields: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: ProjectData;
// }

// // ---------------------
// // Utility for cropping
// // ---------------------
// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const img = document.createElement("img");
//     img.onload = () => resolve(img);
//     img.onerror = (error) => reject(new Error("Failed to load image: " + error));
//     if (!url.startsWith("blob:")) img.crossOrigin = "anonymous";
//     img.src = url;
//   });

// const getCroppedImg = async (imageSrc: string, pixelCrop: CroppedAreaPixels): Promise<string> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Could not get 2D context");

//   const safePixelCrop = {
//     x: Math.max(0, Math.min(pixelCrop.x, image.width)),
//     y: Math.max(0, Math.min(pixelCrop.y, image.height)),
//     width: Math.max(1, Math.min(pixelCrop.width, image.width - pixelCrop.x)),
//     height: Math.max(1, Math.min(pixelCrop.height, image.height - pixelCrop.y)),
//   };

//   canvas.width = safePixelCrop.width;
//   canvas.height = safePixelCrop.height;

//   ctx.drawImage(
//     image,
//     safePixelCrop.x,
//     safePixelCrop.y,
//     safePixelCrop.width,
//     safePixelCrop.height,
//     0,
//     0,
//     safePixelCrop.width,
//     safePixelCrop.height
//   );

//   return canvas.toDataURL("image/jpeg", 0.9);
// };

// const UserCardWithForm = () => {
//   const searchParams = useSearchParams();
  
//   const role = searchParams.get("role");
//   const batchCode = searchParams.get("batchCode");
//   const rollSerial = searchParams.get("rollSerial");
  
//   const [projectData, setProjectData] = useState<ProjectData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   console.log("Role:", role);
//   console.log("Batch Code:", batchCode);
//   console.log("Roll Serial:", rollSerial);

//   useEffect(() => {
//     const fetchBatchData = async () => {
//       if (!batchCode) {
//         setError("Batch code is required");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setError(null);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/batch/${batchCode}`);
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const apiResponse: ApiResponse = await response.json();
//         console.log("project data by batchCode :===========>", apiResponse);
        
//         if (apiResponse.success) {
//           setProjectData(apiResponse.data);
//         } else {
//           throw new Error(apiResponse.message || "Failed to fetch project data");
//         }
//       } catch (error) {
//         console.error("Failed to fetch batch data:", error);
//         setError(error instanceof Error ? error.message : "Failed to fetch batch data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBatchData();
//   }, [batchCode, role, rollSerial]);

//   // Get dynamic fields from project data or use fallback
//   const fields = projectData?.additionalFields || [];

//   // Determine card orientation based on templateId
//   const cardOrientation = projectData?.templateId === "68b7582aaa0bc46f0acfb675" ? "vertical" : "horizontal";

//   const [values, setValues] = useState<{ [key: string]: string }>({});
//   const [studentName, setStudentName] = useState<string>("");
//   const [profileUrl, setProfileUrl] = useState("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");

//   // cropper states
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
//   const [showCropper, setShowCropper] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   // webcam states
//   const [showWebcam, setShowWebcam] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleChange = (field: string, value: string) => {
//     setValues((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (!file.type.startsWith("image/")) return alert("Select a valid image");
//     if (file.size > 10 * 1024 * 1024) return alert("Image < 10MB");

//     const imgUrl = URL.createObjectURL(file);
//     setImageSrc(imgUrl);
//     setShowCropper(true);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   const onCropComplete = useCallback((_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const handleCropSave = async () => {
//     if (!imageSrc || !croppedAreaPixels) return alert("Select area to crop");
//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//       if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
//       if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
//       setPhotoPreview(croppedImage);
//       setProfileUrl(croppedImage);
//       setShowCropper(false);
//       setImageSrc(null);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setPhotoPreview(null);
//     setProfileUrl("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");
//   };

//   const handleTakePhoto = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;
//       setShowWebcam(true);
//       if (videoRef.current) videoRef.current.srcObject = stream;
//     } catch (err) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleCaptureFromWebcam = () => {
//     if (!videoRef.current) return;
//     const video = videoRef.current;
//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/jpeg", 0.9);

//     setImageSrc(imgData);
//     setShowCropper(true);
//     setShowWebcam(false);

//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;
//   };

//   const handleCloseWebcam = () => {
//     setShowWebcam(false);
//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;
//   };

//   useEffect(() => {
//     return () => {
//       if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
//       if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//     };
//   }, [imageSrc, photoPreview]);

//   // Helper function to format field names for display
//   const formatFieldName = (fieldName: string) => {
//     return fieldName
//       .replace(/([A-Z])/g, " $1") // Add space before capital letters
//       .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="animate-pulse">
//               <div className="h-6 bg-gray-200 rounded mb-4"></div>
//               <div className="space-y-3">
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-10 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-center">
//             <div className="text-lg">Loading project data...</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="text-red-500">
//               <h2 className="text-lg font-bold mb-3">Error</h2>
//               <p>{error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // No project data
//   if (!projectData) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="text-gray-500">
//               <h2 className="text-lg font-bold mb-3">No Data</h2>
//               <p>No project data found for this batch code.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">{projectData.cardType} Information</h1>
      
//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* ---------- Form Section ---------- */}
//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               placeholder="Student Name *"
//               value={studentName}
//               onChange={(e) => setStudentName(e.target.value)}
//             />
//             {fields.length > 0 && fields.map((field) => (
//               <Input
//                 key={field}
//                 placeholder={`${formatFieldName(field)} *`}
//                 value={values[field] || ""}
//                 onChange={(e) => handleChange(field, e.target.value)}
//               />
//             ))}
//           </div>

//           <div className="flex flex-wrap gap-3 mt-4">
//             <label className="flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//               />
//               ⬆️ Upload Photo
//             </label>

//             <Button variant="outline" onClick={handleTakePhoto}>
//               📷 Take Photo
//             </Button>

//             <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
//               const responseData = {
//                 batchId: projectData.batchId.toString(),
//                 serialOrRollNumber: rollSerial || "000",
//                 name: studentName,
//                 personalPhotoUrl: 'https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png',
//                 payload: fields.map(field => ({
//                   fieldName: field,
//                   value: values[field] || ""
//                 }))
//               };
//               console.log(responseData);
//             }}>
//               💾 Save Data
//             </Button>

//             <input
//               type="file"
//               accept="image/*"
//               capture="environment"
//               ref={fileInputRef}
//               onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//               style={{ display: "none" }}
//             />
//           </div>

//           {photoPreview && (
//             <div className="mt-4">
//               <p className="text-sm text-gray-600 mb-2">📸 Current Photo:</p>
//               <div className="relative w-fit">
//                 <Image
//                   src={photoPreview}
//                   alt="Profile Preview"
//                   width={128}
//                   height={128}
//                   className="w-32 h-32 object-cover rounded-lg border shadow"
//                 />
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   className="absolute -top-2 -right-2 rounded-full"
//                   onClick={handleRemovePhoto}
//                 >
//                   ✕
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ---------- Card Preview Section ---------- */}
//         <div className="space-y-6">
//           <div className="text-center mb-4 font-semibold text-gray-800">
//             Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout)
//           </div>
//           <div className="flex justify-center">
//             {cardOrientation === "horizontal" ? (
//               <HorizontalCardForUser
//                 instituteName={projectData.institutionName}
//                 address={projectData.address}
//                 idCardType={projectData.cardType}
//                 studentName={studentName || "Student Name"}
//                 qrData={`${projectData.batchId}-${rollSerial || "000"}`}
//                 logoUrl={projectData.institutionLogoUrl}
//                 profileUrl={profileUrl}
//                 signatureUrl={projectData.institutionSignUrl.signUrl}
//                 whoseSign={projectData.institutionSignUrl.roleName}
//                 fields={fields}
//                 values={values}
//               />
//             ) : (
//               <VerticalCardForUser
//                 instituteName={projectData.institutionName}
//                 address={projectData.address}
//                 idCardType={projectData.cardType}
//                 studentName={studentName || "Student Name"}
//                 qrData={`${projectData.batchId}-${rollSerial || "000"}`}
//                 logoUrl={projectData.institutionLogoUrl}
//                 profileUrl={profileUrl}
//                 signatureUrl={projectData.institutionSignUrl.signUrl}
//                 whoseSign={projectData.institutionSignUrl.roleName}
//                 fields={fields}
//                 values={values}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ---------- Cropper & Webcam Modals remain unchanged ---------- */}
//       {showCropper && imageSrc && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
//             <div className="p-4 border-b">
//               <h3 className="text-lg font-semibold">Crop Your Image</h3>
//             </div>
//             <div className="relative h-96 bg-gray-100">
//               <Cropper
//                 image={imageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 onCropChange={setCrop}
//                 onCropComplete={onCropComplete}
//                 onZoomChange={setZoom}
//                 showGrid={false}
//               />
//             </div>
//             <div className="p-4 border-t flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setShowCropper(false)}>Cancel</Button>
//               <Button onClick={handleCropSave} className="bg-blue-600 text-white">Apply Crop</Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showWebcam && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md p-4">
//             <h3 className="text-lg font-semibold mb-4">📷 Capture Photo</h3>
//             <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
//             <div className="flex justify-end gap-3 mt-4">
//               <Button variant="outline" onClick={handleCloseWebcam}>Cancel</Button>
//               <Button onClick={handleCaptureFromWebcam} className="bg-blue-600 text-white">Capture</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCardWithForm;





// response get but not shown yet 






// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import HorizontalCardForUser from "./HorizontalCardForUser";
// import VerticalCardForUser from "./VerticalCardForUser";
// import Image from "next/image";
// import Cropper from "react-easy-crop";
// import { useSearchParams } from "next/navigation";

// // ---------------------
// // Types
// // ---------------------
// type CroppedAreaPixels = { x: number; y: number; width: number; height: number };

// interface ProjectData {
//   _id: string;
//   userId: string;
//   projectName: string;
//   templateId: string;
//   institutionName: string;
//   institutionLogoUrl: string;
//   institutionSignUrl: {
//     roleName: string;
//     signUrl: string;
//   };
//   cardType: string;
//   cardQuantity: number;
//   address: string;
//   batchId: number;
//   additionalFields: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: ProjectData;
// }

// // ---------------------
// // Utility for cropping
// // ---------------------
// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const img = document.createElement("img");
//     img.onload = () => resolve(img);
//     img.onerror = (error) => reject(new Error("Failed to load image: " + error));
//     if (!url.startsWith("blob:")) img.crossOrigin = "anonymous";
//     img.src = url;
//   });

// const getCroppedImg = async (imageSrc: string, pixelCrop: CroppedAreaPixels): Promise<string> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Could not get 2D context");

//   const safePixelCrop = {
//     x: Math.max(0, Math.min(pixelCrop.x, image.width)),
//     y: Math.max(0, Math.min(pixelCrop.y, image.height)),
//     width: Math.max(1, Math.min(pixelCrop.width, image.width - pixelCrop.x)),
//     height: Math.max(1, Math.min(pixelCrop.height, image.height - pixelCrop.y)),
//   };

//   canvas.width = safePixelCrop.width;
//   canvas.height = safePixelCrop.height;

//   ctx.drawImage(
//     image,
//     safePixelCrop.x,
//     safePixelCrop.y,
//     safePixelCrop.width,
//     safePixelCrop.height,
//     0,
//     0,
//     safePixelCrop.width,
//     safePixelCrop.height
//   );

//   return canvas.toDataURL("image/jpeg", 0.9);
// };

// const UserCardWithForm = () => {
//   const searchParams = useSearchParams();
  
//   const role = searchParams.get("role");
//   const batchCode = searchParams.get("batchCode");
//   const rollSerial = searchParams.get("rollSerial");
  
//   const [projectData, setProjectData] = useState<ProjectData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   console.log("Role:", role);
//   console.log("Batch Code:", batchCode);
//   console.log("Roll Serial:", rollSerial);

//   useEffect(() => {
//     const fetchBatchData = async () => {
//       if (!batchCode) {
//         setError("Batch code is required");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setError(null);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/batch/${batchCode}`);
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const apiResponse: ApiResponse = await response.json();
//         console.log("project data by batchCode :===========>", apiResponse);
        
//         if (apiResponse.success) {
//           setProjectData(apiResponse.data);
//         } else {
//           throw new Error(apiResponse.message || "Failed to fetch project data");
//         }
//       } catch (error) {
//         console.error("Failed to fetch batch data:", error);
//         setError(error instanceof Error ? error.message : "Failed to fetch batch data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBatchData();
//   }, [batchCode, role, rollSerial]);

//   // Get dynamic fields from project data or use fallback
//   const fields = projectData?.additionalFields || [];

//   // Determine card orientation based on templateId
//   const cardOrientation = projectData?.templateId === "68b7582aaa0bc46f0acfb675" ? "horizontal" : "vertical";

//   const [values, setValues] = useState<{ [key: string]: string }>({});
//   const [studentName, setStudentName] = useState<string>("");
//   const [profileUrl, setProfileUrl] = useState("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");

//   // cropper states
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
//   const [showCropper, setShowCropper] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   // webcam states
//   const [showWebcam, setShowWebcam] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleChange = (field: string, value: string) => {
//     setValues((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (!file.type.startsWith("image/")) return alert("Select a valid image");
//     if (file.size > 10 * 1024 * 1024) return alert("Image < 10MB");

//     const imgUrl = URL.createObjectURL(file);
//     setImageSrc(imgUrl);
//     setShowCropper(true);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   const onCropComplete = useCallback((_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const handleCropSave = async () => {
//     if (!imageSrc || !croppedAreaPixels) return alert("Select area to crop");
//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//       if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
//       if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
//       setPhotoPreview(croppedImage);
//       setProfileUrl(croppedImage);
//       setShowCropper(false);
//       setImageSrc(null);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setPhotoPreview(null);
//     setProfileUrl("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");
//   };

//   const handleTakePhoto = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;
//       setShowWebcam(true);
//       if (videoRef.current) videoRef.current.srcObject = stream;
//     } catch (err) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleCaptureFromWebcam = () => {
//     if (!videoRef.current) return;
//     const video = videoRef.current;
//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/jpeg", 0.9);

//     setImageSrc(imgData);
//     setShowCropper(true);
//     setShowWebcam(false);

//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;
//   };

//   const handleCloseWebcam = () => {
//     setShowWebcam(false);
//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;
//   };

//   // const handleSaveData = async () => {
//   //   const responseData = {
//   //     batchId: projectData?.batchId.toString() || "",
//   //     serialOrRollNumber: rollSerial || "000",
//   //     name: studentName,
//   //     personalPhotoUrl: "https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png",
//   //     payload: fields.map(field => ({
//   //       fieldName: field,
//   //       value: values[field] || ""
//   //     }))
//   //   };
    
//   //   console.log(responseData);

//   //   try {
//   //     // Convert data to URL query parameters
//   //     const queryParams = new URLSearchParams({
//   //       batchId: responseData.batchId,
//   //       serialOrRollNumber: responseData.serialOrRollNumber,
//   //       name: responseData.name,
//   //       personalPhotoUrl: responseData.personalPhotoUrl,
//   //       payload: JSON.stringify(responseData.payload)
//   //     });

//   //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/getMyId?${queryParams.toString()}`, {
//   //       method: 'GET',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       }
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }

//   //     const result = await response.json();
//   //     console.log('Save data response:', result);
//   //   } catch (error) {
//   //     console.error('Failed to save data:', error);
//   //   }
//   // };

//   const handleSaveData = async () => {
//     const responseData = {
//       batchId: projectData?.batchId.toString() || "",
//       serialOrRollNumber: rollSerial || "000",
//       name: studentName,
//       personalPhotoUrl: "https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png",
//       additionalfieldValues: fields.map(field => ({
//         fieldName: field,
//         fieldValue: values[field] || ""
//       }))
//     };
    
//     console.log(responseData);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/getMyId`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(responseData)
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('Save data response:', result);
//     } catch (error) {
//       console.error('Failed to save data:', error);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
//       if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//     };
//   }, [imageSrc, photoPreview]);

//   // Helper function to format field names for display
//   const formatFieldName = (fieldName: string) => {
//     return fieldName
//       .replace(/([A-Z])/g, " $1") // Add space before capital letters
//       .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="animate-pulse">
//               <div className="h-6 bg-gray-200 rounded mb-4"></div>
//               <div className="space-y-3">
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-10 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-center">
//             <div className="text-lg">Loading project data...</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="text-red-500">
//               <h2 className="text-lg font-bold mb-3">Error</h2>
//               <p>{error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // No project data
//   if (!projectData) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="text-gray-500">
//               <h2 className="text-lg font-bold mb-3">No Data</h2>
//               <p>No project data found for this batch code.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">{projectData.cardType} Information</h1>
//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* ---------- Form Section ---------- */}
//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               placeholder="Student Name *"
//               value={studentName}
//               onChange={(e) => setStudentName(e.target.value)}
//             />
//             {fields.length > 0 && fields.map((field) => (
//               <Input
//                 key={field}
//                 placeholder={`${formatFieldName(field)} *`}
//                 value={values[field] || ""}
//                 onChange={(e) => handleChange(field, e.target.value)}
//               />
//             ))}
//           </div>

//           <div className="flex flex-wrap gap-3 mt-4">
//             <label className="flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//               />
//               ⬆️ Upload Photo
//             </label>

//             <Button variant="outline" onClick={handleTakePhoto}>
//               📷 Take Photo
//             </Button>

//             <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSaveData}>
//               💾 Save Data
//             </Button>

//             <input
//               type="file"
//               accept="image/*"
//               capture="environment"
//               ref={fileInputRef}
//               onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//               style={{ display: "none" }}
//             />
//           </div>

//           {photoPreview && (
//             <div className="mt-4">
//               <p className="text-sm text-gray-600 mb-2">📸 Current Photo:</p>
//               <div className="relative w-fit">
//                 <Image
//                   src={photoPreview}
//                   alt="Profile Preview"
//                   width={128}
//                   height={128}
//                   className="w-32 h-32 object-cover rounded-lg border shadow"
//                 />
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   className="absolute -top-2 -right-2 rounded-full"
//                   onClick={handleRemovePhoto}
//                 >
//                   ✕
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ---------- Card Preview Section ---------- */}
//         <div className="space-y-6">
//           <div className="text-center mb-4 font-semibold text-gray-800">
//             {/* Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout) */}
//           </div>
//           <div className="flex justify-center">
//             {cardOrientation === "horizontal" ? (
//               <HorizontalCardForUser
//                 instituteName={projectData.institutionName}
//                 address={projectData.address}
//                 idCardType={`${projectData.cardType} ID`}
//                 studentName={studentName || "Student Name"}
//                 qrData={`${projectData.batchId}-${rollSerial || "000"}`}
//                 logoUrl={projectData.institutionLogoUrl}
//                 profileUrl={profileUrl}
//                 signatureUrl={projectData.institutionSignUrl.signUrl}
//                 whoseSign={projectData.institutionSignUrl.roleName}
//                 fields={fields}
//                 values={values}
//               />
//             ) : (
//               <VerticalCardForUser
//                 instituteName={projectData.institutionName}
//                 address={projectData.address}
//                 idCardType={`${projectData.cardType} ID`}
//                 studentName={studentName || "Student Name"}
//                 qrData={`${projectData.batchId}-${rollSerial || "000"}`}
//                 logoUrl={projectData.institutionLogoUrl}
//                 profileUrl={profileUrl}
//                 signatureUrl={projectData.institutionSignUrl.signUrl}
//                 whoseSign={projectData.institutionSignUrl.roleName}
//                 fields={fields}
//                 values={values}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ---------- Cropper & Webcam Modals remain unchanged ---------- */}
//       {showCropper && imageSrc && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
//             <div className="p-4 border-b">
//               <h3 className="text-lg font-semibold">Crop Your Image</h3>
//             </div>
//             <div className="relative h-96 bg-gray-100">
//               <Cropper
//                 image={imageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 onCropChange={setCrop}
//                 onCropComplete={onCropComplete}
//                 onZoomChange={setZoom}
//                 showGrid={false}
//               />
//             </div>
//             <div className="p-4 border-t flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setShowCropper(false)}>Cancel</Button>
//               <Button onClick={handleCropSave} className="bg-blue-600 text-white">Apply Crop</Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showWebcam && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md p-4">
//             <h3 className="text-lg font-semibold mb-4">📷 Capture Photo</h3>
//             <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
//             <div className="flex justify-end gap-3 mt-4">
//               <Button variant="outline" onClick={handleCloseWebcam}>Cancel</Button>
//               <Button onClick={handleCaptureFromWebcam} className="bg-blue-600 text-white">Capture</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCardWithForm;








//? response shoing but looking so bad 




// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import HorizontalCardForUser from "./HorizontalCardForUser";
// import VerticalCardForUser from "./VerticalCardForUser";
// import Image from "next/image";
// import Cropper from "react-easy-crop";
// import { useSearchParams } from "next/navigation";

// // ---------------------
// // Types
// // ---------------------
// type CroppedAreaPixels = { x: number; y: number; width: number; height: number };

// interface ProjectData {
//   _id: string;
//   userId: string;
//   projectName: string;
//   templateId: string;
//   institutionName: string;
//   institutionLogoUrl: string;
//   institutionSignUrl: {
//     roleName: string;
//     signUrl: string;
//   };
//   cardType: string;
//   cardQuantity: number;
//   address: string;
//   batchId: number;
//   additionalFields: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: ProjectData;
// }

// // ---------------------
// // Utility for cropping
// // ---------------------
// const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const img = document.createElement("img");
//     img.onload = () => resolve(img);
//     img.onerror = (error) => reject(new Error("Failed to load image: " + error));
//     if (!url.startsWith("blob:")) img.crossOrigin = "anonymous";
//     img.src = url;
//   });

// const getCroppedImg = async (imageSrc: string, pixelCrop: CroppedAreaPixels): Promise<string> => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Could not get 2D context");

//   const safePixelCrop = {
//     x: Math.max(0, Math.min(pixelCrop.x, image.width)),
//     y: Math.max(0, Math.min(pixelCrop.y, image.height)),
//     width: Math.max(1, Math.min(pixelCrop.width, image.width - pixelCrop.x)),
//     height: Math.max(1, Math.min(pixelCrop.height, image.height - pixelCrop.y)),
//   };

//   canvas.width = safePixelCrop.width;
//   canvas.height = safePixelCrop.height;

//   ctx.drawImage(
//     image,
//     safePixelCrop.x,
//     safePixelCrop.y,
//     safePixelCrop.width,
//     safePixelCrop.height,
//     0,
//     0,
//     safePixelCrop.width,
//     safePixelCrop.height
//   );

//   return canvas.toDataURL("image/jpeg", 0.9);
// };

// const UserCardWithForm = () => {
//   const searchParams = useSearchParams();
  
//   const role = searchParams.get("role");
//   const batchCode = searchParams.get("batchCode");
//   const rollSerial = searchParams.get("rollSerial");
  
//   const [projectData, setProjectData] = useState<ProjectData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // Final image states
//   const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
  
//   console.log("Role:", role);
//   console.log("Batch Code:", batchCode);
//   console.log("Roll Serial:", rollSerial);

//   useEffect(() => {
//     const fetchBatchData = async () => {
//       if (!batchCode) {
//         setError("Batch code is required");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setError(null);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/batch/${batchCode}`);
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const apiResponse: ApiResponse = await response.json();
//         console.log("project data by batchCode :===========>", apiResponse);
        
//         if (apiResponse.success) {
//           setProjectData(apiResponse.data);
//         } else {
//           throw new Error(apiResponse.message || "Failed to fetch project data");
//         }
//       } catch (error) {
//         console.error("Failed to fetch batch data:", error);
//         setError(error instanceof Error ? error.message : "Failed to fetch batch data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBatchData();
//   }, [batchCode, role, rollSerial]);

//   // Get dynamic fields from project data or use fallback
//   const fields = projectData?.additionalFields || [];

//   // Determine card orientation based on templateId
//   const cardOrientation = projectData?.templateId === "68b7582aaa0bc46f0acfb675" ? "horizontal" : "vertical";

//   const [values, setValues] = useState<{ [key: string]: string }>({});
//   const [studentName, setStudentName] = useState<string>("");
//   const [profileUrl, setProfileUrl] = useState("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");

//   // cropper states
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
//   const [showCropper, setShowCropper] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   // webcam states
//   const [showWebcam, setShowWebcam] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleChange = (field: string, value: string) => {
//     setValues((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (!file.type.startsWith("image/")) return alert("Select a valid image");
//     if (file.size > 10 * 1024 * 1024) return alert("Image < 10MB");

//     const imgUrl = URL.createObjectURL(file);
//     setImageSrc(imgUrl);
//     setShowCropper(true);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//   };

//   const onCropComplete = useCallback((_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const handleCropSave = async () => {
//     if (!imageSrc || !croppedAreaPixels) return alert("Select area to crop");
//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//       if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
//       if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
//       setPhotoPreview(croppedImage);
//       setProfileUrl(croppedImage);
//       setShowCropper(false);
//       setImageSrc(null);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setPhotoPreview(null);
//     setProfileUrl("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");
//   };

//   const handleTakePhoto = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;
//       setShowWebcam(true);
//       if (videoRef.current) videoRef.current.srcObject = stream;
//     } catch (err) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleCaptureFromWebcam = () => {
//     if (!videoRef.current) return;
//     const video = videoRef.current;
//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imgData = canvas.toDataURL("image/jpeg", 0.9);

//     setImageSrc(imgData);
//     setShowCropper(true);
//     setShowWebcam(false);

//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;
//   };

//   const handleCloseWebcam = () => {
//     setShowWebcam(false);
//     streamRef.current?.getTracks().forEach((track) => track.stop());
//     streamRef.current = null;
//   };

//   // Helper function to download image
//   const downloadImage = (imageUrl: string, filename: string) => {
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = filename;
//     // link.crossOrigin = "anonymous";
//     link.setAttribute("crossOrigin", "anonymous");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Updated handleSaveData function with image handling
//   const handleSaveData = async () => {
//     setIsSaving(true);
//     setSaveSuccess(false);
//     setFinalImageUrl(null);

//     const responseData = {
//       batchId: projectData?.batchId.toString() || "",
//       serialOrRollNumber: rollSerial || "000",
//       name: studentName,
//       personalPhotoUrl: profileUrl, // Use the actual uploaded/cropped photo
//       additionalfieldValues: fields.map(field => ({
//         fieldName: field,
//         fieldValue: values[field] || ""
//       }))
//     };
    
//     console.log("Sending data:", responseData);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/getMyId`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(responseData)
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Check response content type
//       const contentType = response.headers.get('content-type');
      
//       if (contentType && contentType.includes('image')) {
//         // যদি response direct image file হয়
//         const imageBlob = await response.blob();
//         const imageUrl = URL.createObjectURL(imageBlob);
//         setFinalImageUrl(imageUrl);
//         console.log('Generated image URL from blob:', imageUrl);
//       } else {
//         // যদি JSON response হয়
//         const result = await response.json();
//         console.log('Save data response:', result);
        
//         // Check for different possible image URL fields
//         if (result.imageUrl) {
//           setFinalImageUrl(result.imageUrl);
//         } else if (result.cardImageUrl) {
//           setFinalImageUrl(result.cardImageUrl);
//         } else if (result.finalImageUrl) {
//           setFinalImageUrl(result.finalImageUrl);
//         } else if (result.data && result.data.imageUrl) {
//           setFinalImageUrl(result.data.imageUrl);
//         } else if (result.imageData) {
//           // Base64 image data
//           const imageDataUrl = `data:image/png;base64,${result.imageData}`;
//           setFinalImageUrl(imageDataUrl);
//         }
//       }
      
//       setSaveSuccess(true);
//     } catch (error) {
//       console.error('Failed to save data:', error);
//       alert('Failed to save data. Please try again.');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
//       if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
//       if (finalImageUrl && finalImageUrl.startsWith("blob:")) URL.revokeObjectURL(finalImageUrl);
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//     };
//   }, [imageSrc, photoPreview, finalImageUrl]);

//   // Helper function to format field names for display
//   const formatFieldName = (fieldName: string) => {
//     return fieldName
//       .replace(/([A-Z])/g, " $1") // Add space before capital letters
//       .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="animate-pulse">
//               <div className="h-6 bg-gray-200 rounded mb-4"></div>
//               <div className="space-y-3">
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-10 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-center">
//             <div className="text-lg">Loading project data...</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="text-red-500">
//               <h2 className="text-lg font-bold mb-3">Error</h2>
//               <p>{error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // No project data
//   if (!projectData) {
//     return (
//       <div className="min-h-screen p-6">
//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="text-gray-500">
//               <h2 className="text-lg font-bold mb-3">No Data</h2>
//               <p>No project data found for this batch code.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">{projectData.cardType} Information</h1>
//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* ---------- Form Section ---------- */}
//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               placeholder="Student Name *"
//               value={studentName}
//               onChange={(e) => setStudentName(e.target.value)}
//             />
//             {fields.length > 0 && fields.map((field) => (
//               <Input
//                 key={field}
//                 placeholder={`${formatFieldName(field)} *`}
//                 value={values[field] || ""}
//                 onChange={(e) => handleChange(field, e.target.value)}
//               />
//             ))}
//           </div>

//           <div className="flex flex-wrap gap-3 mt-4">
//             <label className="flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//               />
//               ⬆️ Upload Photo
//             </label>

//             <Button variant="outline" onClick={handleTakePhoto}>
//               📷 Take Photo
//             </Button>

//             <Button 
//               className="bg-blue-600 hover:bg-blue-700 text-white" 
//               onClick={handleSaveData}
//               disabled={isSaving}
//             >
//               {isSaving ? "⏳ Saving..." : "💾 Save Data"}
//             </Button>

//             <input
//               type="file"
//               accept="image/*"
//               capture="environment"
//               ref={fileInputRef}
//               onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//               style={{ display: "none" }}
//             />
//           </div>

//           {/* Success message */}
//           {saveSuccess && (
//             <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//               ✅ Data saved successfully!
//             </div>
//           )}

//           {photoPreview && (
//             <div className="mt-4">
//               <p className="text-sm text-gray-600 mb-2">📸 Current Photo:</p>
//               <div className="relative w-fit">
//                 <Image
//                   src={photoPreview}
//                   alt="Profile Preview"
//                   width={128}
//                   height={128}
//                   className="w-32 h-32 object-cover rounded-lg border shadow"
//                 />
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   className="absolute -top-2 -right-2 rounded-full"
//                   onClick={handleRemovePhoto}
//                 >
//                   ✕
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Final Generated Image Display */}
//           {finalImageUrl && (
//             <div className="mt-6 p-4 border rounded-lg bg-gray-50">
//               <h3 className="text-lg font-semibold mb-3">🎯 Final Generated ID Card:</h3>
//               <div className="text-center">
//                 <Image
//                   src={finalImageUrl}
//                   alt="Final ID Card"
//                   width={400}
//                   height={250}
//                   className="border shadow-lg rounded-lg mx-auto max-w-full h-auto"
//                 />
//                 <div className="mt-3 flex justify-center gap-3 flex-wrap">
//                   <Button 
//                     onClick={() => downloadImage(finalImageUrl, `${studentName || 'Student'}_ID_Card.png`)}
//                     className="bg-green-600 hover:bg-green-700 text-white"
//                   >
//                     📥 Download Card
//                   </Button>
//                   <Button 
//                     onClick={() => window.open(finalImageUrl, '_blank')}
//                     variant="outline"
//                   >
//                     🔍 View Full Size
//                   </Button>
//                   <Button 
//                     onClick={() => {
//                       navigator.clipboard.writeText(finalImageUrl);
//                       alert('Image URL copied to clipboard!');
//                     }}
//                     variant="outline"
//                   >
//                     📋 Copy URL
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ---------- Card Preview Section ---------- */}
//         <div className="space-y-6">
//           <div className="text-center mb-4 font-semibold text-gray-800">
//             {/* Preview ({cardOrientation === "vertical" ? "Vertical" : "Horizontal"} Layout) */}
//           </div>
//           <div className="flex justify-center">
//             {cardOrientation === "horizontal" ? (
//               <HorizontalCardForUser
//                 instituteName={projectData.institutionName}
//                 address={projectData.address}
//                 idCardType={`${projectData.cardType} ID`}
//                 studentName={studentName || "Student Name"}
//                 qrData={`${projectData.batchId}-${rollSerial || "000"}`}
//                 logoUrl={projectData.institutionLogoUrl}
//                 profileUrl={profileUrl}
//                 signatureUrl={projectData.institutionSignUrl.signUrl}
//                 whoseSign={projectData.institutionSignUrl.roleName}
//                 fields={fields}
//                 values={values}
//               />
//             ) : (
//               <VerticalCardForUser
//                 instituteName={projectData.institutionName}
//                 address={projectData.address}
//                 idCardType={`${projectData.cardType} ID`}
//                 studentName={studentName || "Student Name"}
//                 qrData={`${projectData.batchId}-${rollSerial || "000"}`}
//                 logoUrl={projectData.institutionLogoUrl}
//                 profileUrl={profileUrl}
//                 signatureUrl={projectData.institutionSignUrl.signUrl}
//                 whoseSign={projectData.institutionSignUrl.roleName}
//                 fields={fields}
//                 values={values}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ---------- Cropper Modal ---------- */}
//       {showCropper && imageSrc && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
//             <div className="p-4 border-b">
//               <h3 className="text-lg font-semibold">Crop Your Image</h3>
//             </div>
//             <div className="relative h-96 bg-gray-100">
//               <Cropper
//                 image={imageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 onCropChange={setCrop}
//                 onCropComplete={onCropComplete}
//                 onZoomChange={setZoom}
//                 showGrid={false}
//               />
//             </div>
//             <div className="p-4 border-t flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setShowCropper(false)}>Cancel</Button>
//               <Button onClick={handleCropSave} className="bg-blue-600 text-white">Apply Crop</Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---------- Webcam Modal ---------- */}
//       {showWebcam && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md p-4">
//             <h3 className="text-lg font-semibold mb-4">📷 Capture Photo</h3>
//             <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
//             <div className="flex justify-end gap-3 mt-4">
//               <Button variant="outline" onClick={handleCloseWebcam}>Cancel</Button>
//               <Button onClick={handleCaptureFromWebcam} className="bg-blue-600 text-white">Capture</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCardWithForm;











"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HorizontalCardForUser from "./HorizontalCardForUser";
import VerticalCardForUser from "./VerticalCardForUser";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { useSearchParams, useRouter } from "next/navigation";

// ---------------------
// Types
// ---------------------
type CroppedAreaPixels = { x: number; y: number; width: number; height: number };

interface ProjectData {
  _id: string;
  userId: string;
  projectName: string;
  templateId: string;
  institutionName: string;
  institutionLogoUrl: string;
  institutionSignUrl: {
    roleName: string;
    signUrl: string;
  };
  cardType: string;
  cardQuantity: number;
  address: string;
  batchId: number;
  additionalFields: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ProjectData;
}

// ---------------------
// Utility for cropping
// ---------------------
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(new Error("Failed to load image: " + error));
    if (!url.startsWith("blob:")) img.crossOrigin = "anonymous";
    img.src = url;
  });

const getCroppedImg = async (imageSrc: string, pixelCrop: CroppedAreaPixels): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  const safePixelCrop = {
    x: Math.max(0, Math.min(pixelCrop.x, image.width)),
    y: Math.max(0, Math.min(pixelCrop.y, image.height)),
    width: Math.max(1, Math.min(pixelCrop.width, image.width - pixelCrop.x)),
    height: Math.max(1, Math.min(pixelCrop.height, image.height - pixelCrop.y)),
  };

  canvas.width = safePixelCrop.width;
  canvas.height = safePixelCrop.height;

  ctx.drawImage(
    image,
    safePixelCrop.x,
    safePixelCrop.y,
    safePixelCrop.width,
    safePixelCrop.height,
    0,
    0,
    safePixelCrop.width,
    safePixelCrop.height
  );

  return canvas.toDataURL("image/jpeg", 0.9);
};

// Success Page Component
const IDCardSuccessPage = ({ finalImageUrl, studentName, onBackToForm }: { 
  finalImageUrl: string; 
  studentName: string; 
  onBackToForm: () => void; 
}) => {
  // Helper function to download image
  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    link.setAttribute("crossOrigin", "anonymous");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">ID Card Generated Successfully!</h1>
          <p className="text-gray-600">Your ID card has been created and is ready for download.</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Final Generated ID Card</h3>
          
          <div className="mb-6">
            <Image
              src={finalImageUrl}
              alt="Final ID Card"
              width={500}
              height={300}
              className="border shadow-xl rounded-lg mx-auto max-w-full h-auto"
            />
          </div>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <Button 
              onClick={() => downloadImage(finalImageUrl, `${studentName || 'Student'}_ID_Card.png`)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
            >
              📥 Download ID Card
            </Button>
            <Button 
              onClick={() => window.open(finalImageUrl, '_blank')}
              variant="outline"
              className="px-6 py-3"
            >
              🔍 View Full Size
            </Button>
            <Button 
              onClick={() => {
                navigator.clipboard.writeText(finalImageUrl);
                alert('Image URL copied to clipboard!');
              }}
              variant="outline"
              className="px-6 py-3"
            >
              📋 Copy URL
            </Button>
          </div>

          <div className="border-t pt-6">
            <Button 
              onClick={onBackToForm}
              variant="outline"
              className="px-8 py-2"
            >
              ← Create Another Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserCardWithForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const role = searchParams.get("role");
  const batchCode = searchParams.get("batchCode");
  const rollSerial = searchParams.get("rollSerial");
  
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Final image states
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  
  console.log("Role:", role);
  console.log("Batch Code:", batchCode);
  console.log("Roll Serial:", rollSerial);

  useEffect(() => {
    const fetchBatchData = async () => {
      if (!batchCode) {
        setError("Batch code is required");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/batch/${batchCode}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiResponse: ApiResponse = await response.json();
        console.log("project data by batchCode :===========>", apiResponse);
        
        if (apiResponse.success) {
          setProjectData(apiResponse.data);
        } else {
          throw new Error(apiResponse.message || "Failed to fetch project data");
        }
      } catch (error) {
        console.error("Failed to fetch batch data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch batch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatchData();
  }, [batchCode, role, rollSerial]);

  // Get dynamic fields from project data or use fallback
  const fields = projectData?.additionalFields || [];

  // Determine card orientation based on templateId
  const cardOrientation = projectData?.templateId === "68b7582aaa0bc46f0acfb675" ? "horizontal" : "vertical";

  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [studentName, setStudentName] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");

  // cropper states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // webcam states
  const [showWebcam, setShowWebcam] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Select a valid image");
    if (file.size > 10 * 1024 * 1024) return alert("Image < 10MB");

    const imgUrl = URL.createObjectURL(file);
    setImageSrc(imgUrl);
    setShowCropper(true);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const onCropComplete = useCallback((_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return alert("Select area to crop");
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
      if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(croppedImage);
      setProfileUrl(croppedImage);
      setShowCropper(false);
      setImageSrc(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setProfileUrl("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setShowWebcam(true);
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      fileInputRef.current?.click();
    }
  };

  const handleCaptureFromWebcam = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL("image/jpeg", 0.9);

    setImageSrc(imgData);
    setShowCropper(true);
    setShowWebcam(false);

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const handleCloseWebcam = () => {
    setShowWebcam(false);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  // Updated handleSaveData function with redirect
  const handleSaveData = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setFinalImageUrl(null);

    const responseData = {
      batchId: projectData?.batchId.toString() || "",
      serialOrRollNumber: rollSerial || "000",
      name: studentName,
      personalPhotoUrl: profileUrl,
      additionalfieldValues: fields.map(field => ({
        fieldName: field,
        fieldValue: values[field] || ""
      }))
    };
    
    console.log("Sending data:", responseData);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/getMyId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check response content type
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('image')) {
        // Direct image response
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setFinalImageUrl(imageUrl);
        console.log('Generated image URL from blob:', imageUrl);
      } else {
        // JSON response
        const result = await response.json();
        console.log('Save data response:', result);
        
        // Check for different possible image URL fields
        if (result.imageUrl) {
          setFinalImageUrl(result.imageUrl);
        } else if (result.cardImageUrl) {
          setFinalImageUrl(result.cardImageUrl);
        } else if (result.finalImageUrl) {
          setFinalImageUrl(result.finalImageUrl);
        } else if (result.data && result.data.imageUrl) {
          setFinalImageUrl(result.data.imageUrl);
        } else if (result.imageData) {
          // Base64 image data
          const imageDataUrl = `data:image/png;base64,${result.imageData}`;
          setFinalImageUrl(imageDataUrl);
        }
      }
      
      setSaveSuccess(true);
      // Show success page after successful generation
      setTimeout(() => {
        setShowSuccessPage(true);
      }, 1000); // Small delay to show success message
      
    } catch (error) {
      console.error('Failed to save data:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToForm = () => {
    setShowSuccessPage(false);
    setFinalImageUrl(null);
    setSaveSuccess(false);
    // Reset form data if needed
    setStudentName("");
    setValues({});
    setPhotoPreview(null);
    setProfileUrl("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");
  };

  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
      if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
      if (finalImageUrl && finalImageUrl.startsWith("blob:")) URL.revokeObjectURL(finalImageUrl);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [imageSrc, photoPreview, finalImageUrl]);

  // Helper function to format field names for display
  const formatFieldName = (fieldName: string) => {
    return fieldName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, str => str.toUpperCase());
  };

  // Show success page when image is ready
  if (showSuccessPage && finalImageUrl) {
    return (
      <IDCardSuccessPage 
        finalImageUrl={finalImageUrl} 
        studentName={studentName}
        onBackToForm={handleBackToForm}
      />
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-lg">Loading project data...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-red-500">
              <h2 className="text-lg font-bold mb-3">Error</h2>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No project data
  if (!projectData) {
    return (
      <div className="min-h-screen p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-gray-500">
              <h2 className="text-lg font-bold mb-3">No Data</h2>
              <p>No project data found for this batch code.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{projectData.cardType} Information</h1>
      
      {/* Loading Overlay when saving */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-sm mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Generating ID Card...</h3>
            <p className="text-gray-600">Please wait while we create your ID card</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ---------- Form Section ---------- */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Student Name *"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              disabled={isSaving}
            />
            {fields.length > 0 && fields.map((field) => (
              <Input
                key={field}
                placeholder={`${formatFieldName(field)} *`}
                value={values[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                disabled={isSaving}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <label className={`flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                disabled={isSaving}
              />
              ⬆️ Upload Photo
            </label>

            <Button 
              variant="outline" 
              onClick={handleTakePhoto}
              disabled={isSaving}
            >
              📷 Take Photo
            </Button>

            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={handleSaveData}
              disabled={isSaving}
            >
              {isSaving ? "⏳ Generating..." : "💾 Save Data"}
            </Button>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              style={{ display: "none" }}
              disabled={isSaving}
            />
          </div>

          {/* Success message */}
          {saveSuccess && !showSuccessPage && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              ✅ ID Card generated successfully! Redirecting...
            </div>
          )}

          {photoPreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">📸 Current Photo:</p>
              <div className="relative w-fit">
                <Image
                  src={photoPreview}
                  alt="Profile Preview"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-lg border shadow"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 rounded-full"
                  onClick={handleRemovePhoto}
                  disabled={isSaving}
                >
                  ✕
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Card Preview Section ---------- */}
        <div className="space-y-6">
          <div className="text-center mb-4 font-semibold text-gray-800">
            Live Preview
          </div>
          <div className="flex justify-center">
            {cardOrientation === "horizontal" ? (
              <HorizontalCardForUser
                instituteName={projectData.institutionName}
                address={projectData.address}
                idCardType={`${projectData.cardType} ID`}
                studentName={studentName || "Student Name"}
                qrData={`${projectData.batchId}-${rollSerial || "000"}`}
                logoUrl={projectData.institutionLogoUrl}
                profileUrl={profileUrl}
                signatureUrl={projectData.institutionSignUrl.signUrl}
                whoseSign={projectData.institutionSignUrl.roleName}
                fields={fields}
                values={values}
              />
            ) : (
              <VerticalCardForUser
                instituteName={projectData.institutionName}
                address={projectData.address}
                idCardType={`${projectData.cardType} ID`}
                studentName={studentName || "Student Name"}
                qrData={`${projectData.batchId}-${rollSerial || "000"}`}
                logoUrl={projectData.institutionLogoUrl}
                profileUrl={profileUrl}
                signatureUrl={projectData.institutionSignUrl.signUrl}
                whoseSign={projectData.institutionSignUrl.roleName}
                fields={fields}
                values={values}
              />
            )}
          </div>
        </div>
      </div>

      {/* ---------- Cropper Modal ---------- */}
      {showCropper && imageSrc && !isSaving && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Crop Your Image</h3>
            </div>
            <div className="relative h-96 bg-gray-100">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={false}
              />
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCropper(false)}>Cancel</Button>
              <Button onClick={handleCropSave} className="bg-blue-600 text-white">Apply Crop</Button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Webcam Modal ---------- */}
      {showWebcam && !isSaving && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <h3 className="text-lg font-semibold mb-4">📷 Capture Photo</h3>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={handleCloseWebcam}>Cancel</Button>
              <Button onClick={handleCaptureFromWebcam} className="bg-blue-600 text-white">Capture</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCardWithForm;