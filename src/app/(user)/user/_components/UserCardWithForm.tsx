"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HorizontalCardForUser from "./HorizontalCardForUser";
import VerticalCardForUser from "./VerticalCardForUser";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { useSearchParams, useRouter } from "next/navigation";
import DownloadImage from '@/../public/images/download_icon.svg'
import UploadImage from '@/../public/images/upload_icon.svg'
import TripodImage from '@/../public/images/camera-tripod.svg'
import Error from "@/app/error";
import ErrorImage from "@/../public/images/error_id_card.png";
import Link from "next/link";


// ===========================
// Type Definitions
// ===========================
type CroppedAreaPixels = { x: number; y: number; width: number; height: number };

interface ProjectData {
  _id: string;
  userId: string;
  projectName: string;
  templateId: string;
  institutionName: string;
  institutionLogoUrl: string;
  personPhotoBGColorCode: string;
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

// ===========================
// Constants
// ===========================
const PLACEHOLDER_IMAGE = "https://i.ibb.co.com/prLBzvB1/Portrait-Placeholder.png";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// ===========================
// Utility Functions
// ===========================

/**
 * Uploads image file to ImgBB hosting service
 * @param file - Image file to upload
 * @returns Promise<string | null> - Hosted image URL or null if failed
 */
const imageUpload = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      console.log("✅ Image uploaded to ImgBB:", data.data.url);
      return data.data.url;
    } else {
      throw new Error("Failed to upload image.");
    }
  } catch (error) {
    console.error("❌ Image upload error:", error);
    return null;
  }
};

/**
 * Creates an HTML image element from URL
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(new Error("Failed to load image: " + error));
    if (!url.startsWith("blob:")) img.crossOrigin = "anonymous";
    img.src = url;
  });

/**
 * Crops image based on specified pixel coordinates
 */
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

/**
 * Converts base64 data URL to Blob object
 */
const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

// ===========================
// Success Page Component (EXACT ORIGINAL DESIGN)
// ===========================
interface IDCardSuccessPageProps {
  finalImageUrl: string;
  studentName: string;
  onBackToForm: () => void;
}

const IDCardSuccessPage: React.FC<IDCardSuccessPageProps> = ({ finalImageUrl, studentName, onBackToForm }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Helper function to download image
  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      setIsDownloading(true);
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = filename;
      link.setAttribute("crossOrigin", "anonymous");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen p-2 ">
      <div className="max-w-4xl  mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">ID Card Generated Successfully!</h1>
          <p className="text-gray-600">Your ID card has been created and is ready for download.</p>
        </div>

        <div className="bg-white rounded-lg p-2 md:p-8 text-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Final Generated ID Card</h3>

          <div className="mb-6">
            <Image
              src={finalImageUrl}
              alt="Final ID Card"
              width={500}
              height={300}
              className="border shadow-xl rounded-lg mx-auto max-w-full h-auto"
              unoptimized
            />
          </div>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <Button
              onClick={() => downloadImage(finalImageUrl, `${studentName || 'Student'}_ID_Card.png`)}
              className="bg-[#4A61E4] hover:bg-blue-700 text-white"
              disabled={isDownloading}
            >
              <Image src={DownloadImage} width={26} height={14} alt="" />
              {isDownloading ? "Downloading..." : "Export"}
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
              className="md:px-8 md:py-2 text-xs md:text-base"
            >
              ← Create Another Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===========================
// Main Component
// ===========================
const UserCardWithForm: React.FC = () => {
  const searchParams = useSearchParams();

  const role = searchParams.get("role");
  const batchCode = searchParams.get("batchCode");
  const rollSerial = searchParams.get("rollSerial");

  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Loading states for different operations
  const [isCropping, setIsCropping] = useState(false);
  const [isProcessingBackground, setIsProcessingBackground] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Final image states
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
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
        console.log("🔄 Fetching project data for batch:", batchCode);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}project/batch/${batchCode}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse: ApiResponse = await response.json();
        console.log("✅ Project data fetched:", apiResponse);
        console.log("personPhotoBGColorCode:", apiResponse?.data?.personPhotoBGColorCode);
        console.log('width:', 200);
        console.log('height:', 200);
        console.log('enhance_quality:', true);
        console.log('center_face:', true);

        if (apiResponse.success) {
          setProjectData(apiResponse.data);
        } else {
          throw new Error(apiResponse.message || "Failed to fetch project data");
        }
      } catch (error) {
        console.error("❌ Failed to fetch batch data:", error);
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
  const [profileUrl, setProfileUrl] = useState<string>(PLACEHOLDER_IMAGE);

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
    if (file.size > MAX_FILE_SIZE) return alert("Image < 10MB");

    console.log("📁 File selected:", file.name, `${(file.size / 1024 / 1024).toFixed(2)}MB`);
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

  /**
   * Enhanced crop save with proper loading states
   */
  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return alert("Select area to crop");

    let croppedImage: string | null = null;

    try {
      // Step 1: Start cropping
      setIsCropping(true);
      console.log("✂️ Starting crop process...", croppedAreaPixels);

      croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log("✅ Image cropped successfully");
      setPhotoPreview(croppedImage);
      setIsCropping(false);

      // Step 2: Background removal
      setIsProcessingBackground(true);
      console.log("🎨 Starting background removal...");

      // Clean up blob URLs after setting preview
      if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
      if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);

      const blob = dataURLtoBlob(croppedImage);
      console.log("📦 Created blob:", `${(blob.size / 1024).toFixed(2)}KB`);

      // Prepare FormData for API request
      const formData = new FormData();
      formData.append('file', blob, 'profile-image.jpg');
      formData.append('background_color', projectData?.personPhotoBGColorCode || "#ffffff");
      formData.append('width', "200");
      formData.append('height', "200");
      formData.append('enhance_quality', "true");
      formData.append('center_face', "false");

      console.log("🔄 Background removal request:", {
        backgroundColor: projectData?.personPhotoBGColorCode || "#ffffff",
        dimensions: "200x200"
      });

      // Make API request to remove background using proxy
      const apiResponse = await fetch(`/api/process-id-photo`, {
        method: 'POST',
        body: formData,
      });

      console.log("📡 API Response:", apiResponse.status);

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.log("❌ API Error:", errorText);
        throw new Error(`API Error! status: ${apiResponse.status}, message: ${errorText}`);
      }

      // Process response
      let processedImageBlob: Blob | null = null;
      const contentType = apiResponse.headers.get('content-type');
      console.log("Response Content-Type:", contentType);

      if (contentType && contentType.includes('application/json')) {
        const apiResult = await apiResponse.json();
        console.log("📄 JSON Response:", apiResult);

        if (apiResult.imageUrl || apiResult.processedImageUrl || apiResult.image_url) {
          const processedImageUrl = apiResult.imageUrl || apiResult.processedImageUrl || apiResult.image_url;
          const imageResponse = await fetch(processedImageUrl);
          processedImageBlob = await imageResponse.blob();
        }
      } else if (contentType && contentType.includes('image')) {
        processedImageBlob = await apiResponse.blob();
        const processedImageUrl = URL.createObjectURL(processedImageBlob);
        console.log("🖼️ Direct image response");
        setPhotoPreview(processedImageUrl);
      }

      setIsProcessingBackground(false);

      // Step 3: Upload to imgbb
      if (processedImageBlob) {
        setIsUploadingImage(true);
        console.log("☁️ Uploading to ImgBB...");

        const processedFile = new File([processedImageBlob], 'processed-image.png', {
          type: processedImageBlob.type || 'image/png'
        });

        const hostedUrl = await imageUpload(processedFile);

        if (hostedUrl) {
          console.log("✅ HOSTED URL:", hostedUrl);
          setProfileUrl(hostedUrl);
          setPhotoPreview(hostedUrl);
        } else {
          console.log("❌ Failed to upload to imgbb");
        }
        setIsUploadingImage(false);
      } else {
        console.log("⚠️ No processed image, using fallback");

        // Fallback: upload cropped image
        try {
          setIsUploadingImage(true);
          const croppedBlob = dataURLtoBlob(croppedImage);
          const croppedFile = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
          const hostedUrl = await imageUpload(croppedFile);

          if (hostedUrl) {
            console.log("✅ FALLBACK HOSTED URL:", hostedUrl);
            setProfileUrl(hostedUrl);
            setPhotoPreview(hostedUrl);
          }
        } catch (uploadError) {
          console.error("❌ Fallback upload failed:", uploadError);
        } finally {
          setIsUploadingImage(false);
        }
      }

      // Close cropper and cleanup
      setShowCropper(false);
      setImageSrc(null);
      console.log("✅ Process completed successfully");

    } catch (error) {
      console.error("❌ Error in crop save:", error);

      // Reset all loading states
      setIsCropping(false);
      setIsProcessingBackground(false);
      setIsUploadingImage(false);

      // Still set the cropped image as preview even if API fails
      if (croppedImage) {
        console.log("🔄 Setting cropped image as fallback");
        setPhotoPreview(croppedImage);

        // Try to upload the cropped image to imgbb as fallback
        try {
          setIsUploadingImage(true);
          const croppedBlob = dataURLtoBlob(croppedImage);
          const croppedFile = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
          const hostedUrl = await imageUpload(croppedFile);

          if (hostedUrl) {
            console.log("✅ ERROR FALLBACK HOSTED URL:", hostedUrl);
            setProfileUrl(hostedUrl);
            setPhotoPreview(hostedUrl);
          }
        } catch (uploadError) {
          console.error("❌ Error fallback upload failed:", uploadError);
        } finally {
          setIsUploadingImage(false);
        }
      }

      setShowCropper(false);
      setImageSrc(null);
      alert(`Failed to process image: ${(error as Error).message}`);
    }
  };

  const handleRemovePhoto = () => {
    console.log("🗑️ Removing photo");
    setPhotoPreview(null);
    setProfileUrl(PLACEHOLDER_IMAGE);
  };

  const handleTakePhoto = async () => {
    try {
      console.log("📷 Requesting webcam...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setShowWebcam(true);
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err: unknown) {
      console.log("⚠️ Webcam failed, using file input");

      if (err instanceof Error) {
        console.error("Camera error:", err.message);
      }

      fileInputRef.current?.click();
    }
  };

  const handleCaptureFromWebcam = () => {
    if (!videoRef.current) return;

    console.log("📸 Capturing from webcam...");
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
    console.log("❌ Closing webcam");
    setShowWebcam(false);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  /**
   * Enhanced save data with proper loading states
   */
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

    console.log("🔄 Generating ID card:", responseData);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}project/getMyId`, {
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
        console.log('✅ Generated image URL from blob');
      } else {
        // JSON response
        const result = await response.json();
        console.log('📄 Save data response:', result);

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
        console.log('🎉 Showing success page');
      }, 1000); // Small delay to show success message

    } catch (error) {
      console.error('❌ Failed to save data:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToForm = () => {
    console.log("🔄 Back to form");
    setShowSuccessPage(false);
    setFinalImageUrl(null);
    setSaveSuccess(false);
    // Reset form data if needed
    setStudentName("");
    setValues({});
    setPhotoPreview(null);
    setProfileUrl(PLACEHOLDER_IMAGE);
  };

  useEffect(() => {
    return () => {
      console.log("🧹 Cleanup");
      if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
      if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
      if (finalImageUrl && finalImageUrl.startsWith("blob:")) URL.revokeObjectURL(finalImageUrl);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [imageSrc, photoPreview, finalImageUrl]);

  // Helper function to format field names for display
  const formatFieldName = (fieldName: string): string => {
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
    {
      console.error('❌ Error: from UserCardWithForm error state', error);
    }
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
          <div className="text-center">
            {/* Error image */}
            <div className="flex justify-center mb-6">
              <Image
                src={ErrorImage}
                alt="Error illustration"
                width={600}
                height={400}
                className="rounded-lg object-cover"
                priority
              />
            </div>

            {/* Error message */}
            <p className="text-gray-600 mb-6 break-words text-sm sm:text-base">
              {error}
            </p>

            {/* Retry button */}
            <Link href="/">
              <Button
                className="px-6 py-2 bg-blue-600/60 text-white font-medium rounded-lg hover:bg-blue-700/80 focus:ring-2 focus:ring-red-400 focus:outline-none transition-colors duration-200"
              >
                Try Again
              </Button>
            </Link>
          </div>
        </div>
        {/* <Error error={new Error(error)} /> */}
      </>
    );
  }

  // No project data
  if (!projectData) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
          <div className="text-center">
            {/* Error image */}
            <div className="flex justify-center mb-6">
              <Image
                src={ErrorImage}
                alt="Error illustration"
                width={600}
                height={400}
                className="rounded-lg object-cover"
                priority
              />
            </div>

            {/* Error message */}
            <p className="text-gray-600 mb-6 break-words text-sm sm:text-base">
              No project data found for this batch code.
            </p>

            {/* Retry button */}
            <Link href="/">
              <Button
                className="px-6 py-2 bg-blue-600/60 text-white font-medium rounded-lg hover:bg-blue-700/80 focus:ring-2 focus:ring-red-400 focus:outline-none transition-colors duration-200"
              >
                Try Again
              </Button>
            </Link>
          </div>
        </div>
        {/* <Error error={{ message: "No project data found for this batch code." } as Error} /> */}
      </>
    );
  }

  // Check if any loading operation is in progress
  const isAnyLoading = isCropping || isProcessingBackground || isUploadingImage || isSaving;

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

      {/* Loading Overlay for image processing */}
      {(isCropping || isProcessingBackground || isUploadingImage) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-sm mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">
              {isCropping ? "Cropping Image..." :
                isProcessingBackground ? "Processing Background..." :
                  "Uploading Image..."}
            </h3>
            <p className="text-gray-600">
              {isCropping ? "Applying your crop selection" :
                isProcessingBackground ? "Removing background and enhancing photo" :
                  "Saving processed image to cloud"}
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ---------- Form Section ---------- */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder={`${projectData.cardType} Name *`}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              disabled={isAnyLoading}
            />
            {fields.length > 0 && fields.map((field) => (
              <Input
                key={field}
                placeholder={`${formatFieldName(field)} *`}
                value={values[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                disabled={isAnyLoading}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <label className={`flex items-center  justify-center border border-transparent hover:border-gray-300 rounded-2xl px-6 py-3 cursor-pointer hover:bg-gray-50 transition ${isAnyLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                disabled={isAnyLoading}
              />
              <span className="flex items-center gap-2 font-semibold ">
                <Image className="" src={UploadImage} width={26} height={14} alt="" />
                Upload Image
              </span>
            </label>

            <button
              onClick={handleTakePhoto}
              disabled={isAnyLoading}
              className="px-6 py-6 rounded-2xl shadow-none border border-transparent hover:border-gray-300 hover:bg-white  hover:text-black flex gap-2 items-center font-semibold"
            >
              <Image src={TripodImage} width={26} height={14} alt="" />
              Take Photo
            </button>

            <Button
              className="bg-[#4A61E4] ml-4 hover:bg-blue-700 py-6 px-7 rounded-2xl text-white"
              onClick={handleSaveData}
              disabled={isAnyLoading}
            >
              {isSaving ? "⏳ Generating..." : (
                <>
                  <Image src={DownloadImage} width={26} height={14} alt="" />
                  Export
                </>
              )}
            </Button>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              style={{ display: "none" }}
              disabled={isAnyLoading}
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
                  unoptimized
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 rounded-full"
                  onClick={handleRemovePhoto}
                  disabled={isAnyLoading}
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
                studentName={studentName || `${projectData.cardType} Name `}
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
                studentName={studentName || `${projectData.cardType} Name *`}
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
              <Button
                variant="outline"
                onClick={() => setShowCropper(false)}
                disabled={isCropping || isProcessingBackground || isUploadingImage}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropSave}
                className="bg-blue-600 text-white"
                disabled={isCropping || isProcessingBackground || isUploadingImage}
              >
                {isCropping ? "Cropping..." :
                  isProcessingBackground ? "Processing..." :
                    isUploadingImage ? "Uploading..." : "Apply Crop"}
              </Button>
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