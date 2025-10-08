


"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { Card } from "@/types/inedx"
import { toast } from "sonner"
import imageUpload from "@/utils/imageUpload"
import Image from "next/image"
import Cropper from "react-easy-crop"
import { IoCameraOutline } from "react-icons/io5"
import UploadImage from '@/../public/images/upload_icon.svg'

interface EditCardProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Card>) => void
  initialData: Partial<Card>
  projectAdditionalFields: string[]
  personPhotoBGColorCode?: string // Add background color prop
}

type CroppedAreaPixels = { x: number; y: number; width: number; height: number }

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const PLACEHOLDER_IMAGE = "https://i.ibb.co.com/prLBzvB1/Portrait-Placeholder.png"

// Utility functions
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = document.createElement("img")
    img.onload = () => resolve(img)
    img.onerror = (error) => reject(new Error("Failed to load image: " + error))
    if (!url.startsWith("blob:")) img.crossOrigin = "anonymous"
    img.src = url
  })

const getCroppedImg = async (imageSrc: string, pixelCrop: CroppedAreaPixels): Promise<string> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get 2D context")

  const safePixelCrop = {
    x: Math.max(0, Math.min(pixelCrop.x, image.width)),
    y: Math.max(0, Math.min(pixelCrop.y, image.height)),
    width: Math.max(1, Math.min(pixelCrop.width, image.width - pixelCrop.x)),
    height: Math.max(1, Math.min(pixelCrop.height, image.height - pixelCrop.y)),
  }

  canvas.width = safePixelCrop.width
  canvas.height = safePixelCrop.height

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
  )

  return canvas.toDataURL("image/jpeg", 0.9)
}

const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export function EditCard({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  projectAdditionalFields,
  personPhotoBGColorCode = "#ffffff",
}: EditCardProps) {


  // console.log("initial data =============>", initialData);
  const [formData, setFormData] = useState({ ...initialData, additionalFields: {} })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
  // Image processing states
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null)
  const [showCropper, setShowCropper] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  
  // Webcam states
  const [showWebcam, setShowWebcam] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  
  // Loading states
  const [isCropping, setIsCropping] = useState(false)
  const [isProcessingBackground, setIsProcessingBackground] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const mergedFields = projectAdditionalFields.map((fieldName) => {
        const existing = initialData.additionalfieldValues?.find(
          (f) => f.fieldName === fieldName
        )
        return {
          fieldName,
          fieldValue: existing?.fieldValue || "",
        }
      })

      const additionalFieldsObj = mergedFields.reduce((acc, f) => ({...acc, [f.fieldName]: f.fieldValue}), {})

      setFormData({ ...initialData, additionalFields: additionalFieldsObj })
      setErrors({})
      
      // Set initial photo preview if exists
      if (initialData.personalPhotoUrl) {
        setPhotoPreview(initialData.personalPhotoUrl)
      }
    }
  }, [isOpen, projectAdditionalFields, initialData])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc)
      if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview)
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [imageSrc, photoPreview])

  const handleChange = <K extends keyof Card>(key: K, value: Card[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const handleFieldChange = (prop: string, value: string) => {
    setFormData((prev: Card) => ({
      ...prev, 
      additionalFields: {
        ...prev.additionalFields,
        [prop]: value
      }
    }))
  }

  const handleFileChange = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be less than 10MB")
      return
    }

    console.log("📁 File selected:", file.name, `${(file.size / 1024 / 1024).toFixed(2)}MB`)
    const imgUrl = URL.createObjectURL(file)
    setImageSrc(imgUrl)
    setShowCropper(true)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
  }

  const onCropComplete = useCallback((_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) {
      toast.error("Please select an area to crop")
      return
    }

    let croppedImage: string | null = null

    try {
      // Step 1: Start cropping
      setIsCropping(true)
      console.log("✂️ Starting crop process...", croppedAreaPixels)
      toast.loading("Cropping image...", { id: "crop" })

      croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      console.log("✅ Image cropped successfully")
      setPhotoPreview(croppedImage)
      setIsCropping(false)

      // Step 2: Background removal
      setIsProcessingBackground(true)
      console.log("🎨 Starting background removal...")
      toast.loading("Processing background...", { id: "crop" })

      // Clean up blob URLs after setting preview
      if (imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc)

      const blob = dataURLtoBlob(croppedImage)
      console.log("📦 Created blob:", `${(blob.size / 1024).toFixed(2)}KB`)

      // Prepare FormData for API request
      const formData = new FormData()
      formData.append('file', blob, 'profile-image.jpg')
      formData.append('background_color', personPhotoBGColorCode || "#ffffff")
      formData.append('width', "200")
      formData.append('height', "200")
      formData.append('enhance_quality', "true")
      formData.append('center_face', "false")

      console.log("🔄 Background removal request:", {
        backgroundColor: personPhotoBGColorCode || "#ffffff",
        dimensions: "200x200"
      })

      // Make API request to remove background
      const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_AI_SERVER_URL}/process-id-photo`, {
        method: 'POST',
        body: formData,
      })

      console.log("📡 API Response:", apiResponse.status)

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text()
        console.log("❌ API Error:", errorText)
        throw new Error(`API Error! status: ${apiResponse.status}`)
      }

      // Process response
      let processedImageBlob: Blob | null = null
      const contentType = apiResponse.headers.get('content-type')
      console.log("Response Content-Type:", contentType)

      if (contentType && contentType.includes('application/json')) {
        const apiResult = await apiResponse.json()
        console.log("📄 JSON Response:", apiResult)

        if (apiResult.imageUrl || apiResult.processedImageUrl || apiResult.image_url) {
          const processedImageUrl = apiResult.imageUrl || apiResult.processedImageUrl || apiResult.image_url
          const imageResponse = await fetch(processedImageUrl)
          processedImageBlob = await imageResponse.blob()
        }
      } else if (contentType && contentType.includes('image')) {
        processedImageBlob = await apiResponse.blob()
        const processedImageUrl = URL.createObjectURL(processedImageBlob)
        console.log("🖼️ Direct image response")
        setPhotoPreview(processedImageUrl)
      }

      setIsProcessingBackground(false)

      // Step 3: Upload to imgbb
      if (processedImageBlob) {
        setIsUploadingImage(true)
        console.log("☁️ Uploading to ImgBB...")
        toast.loading("Uploading image...", { id: "crop" })

        const processedFile = new File([processedImageBlob], 'processed-image.png', {
          type: processedImageBlob.type || 'image/png'
        })

        const hostedUrl = await imageUpload(processedFile)

        if (hostedUrl) {
          console.log("✅ HOSTED URL:", hostedUrl)
          handleChange("personalPhotoUrl", hostedUrl)
          setPhotoPreview(hostedUrl)
          toast.success("Image uploaded successfully!", { id: "crop" })
        } else {
          console.log("❌ Failed to upload to imgbb")
          throw new Error("Failed to upload processed image")
        }
        setIsUploadingImage(false)
      } else {
        console.log("⚠️ No processed image, using fallback")

        // Fallback: upload cropped image
        setIsUploadingImage(true)
        toast.loading("Uploading image...", { id: "crop" })
        
        const croppedBlob = dataURLtoBlob(croppedImage)
        const croppedFile = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' })
        const hostedUrl = await imageUpload(croppedFile)

        if (hostedUrl) {
          console.log("✅ FALLBACK HOSTED URL:", hostedUrl)
          handleChange("personalPhotoUrl", hostedUrl)
          setPhotoPreview(hostedUrl)
          toast.success("Image uploaded successfully!", { id: "crop" })
        } else {
          throw new Error("Failed to upload image")
        }
        setIsUploadingImage(false)
      }

      // Close cropper and cleanup
      setShowCropper(false)
      setImageSrc(null)
      console.log("✅ Process completed successfully")

    } catch (error) {
      console.error("❌ Error in crop save:", error)

      // Reset all loading states
      setIsCropping(false)
      setIsProcessingBackground(false)
      setIsUploadingImage(false)

      // Still set the cropped image as preview even if API fails
      if (croppedImage) {
        console.log("🔄 Setting cropped image as fallback")
        setPhotoPreview(croppedImage)

        // Try to upload the cropped image to imgbb as fallback
        try {
          setIsUploadingImage(true)
          toast.loading("Uploading image...", { id: "crop" })
          
          const croppedBlob = dataURLtoBlob(croppedImage)
          const croppedFile = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' })
          const hostedUrl = await imageUpload(croppedFile)

          if (hostedUrl) {
            console.log("✅ ERROR FALLBACK HOSTED URL:", hostedUrl)
            handleChange("personalPhotoUrl", hostedUrl)
            setPhotoPreview(hostedUrl)
            toast.success("Image uploaded (without background removal)", { id: "crop" })
          }
        } catch (uploadError) {
          console.error("❌ Error fallback upload failed:", uploadError)
          toast.error("Failed to upload image", { id: "crop" })
        } finally {
          setIsUploadingImage(false)
        }
      }

      setShowCropper(false)
      setImageSrc(null)
      toast.error(`Failed to process image: ${(error as Error).message}`, { id: "crop" })
    }
  }

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    handleChange("personalPhotoUrl", PLACEHOLDER_IMAGE)
    toast.info("Photo removed")
  }

  const handleTakePhoto = async () => {
    try {
      console.log("📷 Requesting webcam...")
     const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { ideal: 'environment' } } 
      });
      streamRef.current = stream
      setShowWebcam(true)
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      }, 100)
    } catch (err) {
      console.error("Webcam error:", err)
      console.log("⚠️ Webcam failed, using file input")
      toast.error("Camera access denied. Please use file upload instead.")
      fileInputRef.current?.click()
    }
  }

  const handleCaptureFromWebcam = () => {
    if (!videoRef.current) return

    console.log("📸 Capturing from webcam...")
    const video = videoRef.current
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imgData = canvas.toDataURL("image/jpeg", 0.9)

    setImageSrc(imgData)
    setShowCropper(true)
    setShowWebcam(false)

    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  const handleCloseWebcam = () => {
    console.log("❌ Closing webcam")
    setShowWebcam(false)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.serialOrRollNumber || formData.serialOrRollNumber <= 0) {
      newErrors.serialOrRollNumber = "Serial/Roll Number must be a positive number"
    }

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required"
    }

    Object.entries(formData.additionalFields || {}).forEach(([fieldName, fieldValue], idx) => {
      if ((fieldValue as string)?.trim()) {
        if (fieldName === "Contact no.") {
          const phoneRegex = /^(0|\+)[0-9X-]{7,}$/
          if (!phoneRegex.test(fieldValue as string)) {
            newErrors[`field-${idx}`] = "Invalid phone number format (e.g., 01XXXXXXX)"
          }
        } else if (fieldName === "Date of Birth") {
          const dateRegex = /^[0-9a-zA-Z/-]+$/
          if (!dateRegex.test(fieldValue as string)) {
            newErrors[`field-${idx}`] = "Invalid date format (e.g., DD/MM/YYYY)"
          }
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please correct the errors in the form", {
        duration: 4000,
        className: "bg-red-600 text-white font-semibold rounded-lg shadow-lg",
      })
      return
    }

    const payload: Partial<Card> = {
      ...formData,
      _id: formData._id || undefined,
      name: formData.name?.trim(),
      personalPhotoUrl: formData.personalPhotoUrl?.trim(),
      additionalfieldValues: Object.entries(formData.additionalFields || {}).map(
        ([fieldName, fieldValue]) => ({
          fieldName,
          fieldValue: (fieldValue as string).trim(),
          setBy: "owner",
        })
      ),
    }
    console.dir({ submittedPayload: payload }, { depth: null })

    onSubmit(payload)
    onClose()
  }

  if (!isOpen) return null

  const isAnyLoading = isCropping || isProcessingBackground || isUploadingImage

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-scaleIn">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
            disabled={isAnyLoading}
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold text-gray-900 mb-5">
            {formData?._id ? "Edit Card" : "Create Card"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Serial / Roll Number */}
            <div className="space-y-1.5">
              <Label htmlFor="serialOrRollNumber" className="text-sm font-medium text-gray-700">
                Serial / Roll Number
              </Label>
              <Input
                id="serialOrRollNumber"
                type="number"
                value={formData.serialOrRollNumber || ""}
                onChange={(e) => handleChange("serialOrRollNumber", Number(e.target.value))}
                className={`bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-colors ${
                  errors.serialOrRollNumber ? "border-red-500" : ""
                }`}
                placeholder="Enter serial or roll number"
                disabled={isAnyLoading}
              />
              {errors.serialOrRollNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.serialOrRollNumber}</p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-colors ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter full name"
                disabled={isAnyLoading}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Personal Photo Section */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Personal Photo (Optional)
              </Label>

              {/* Preview uploaded image */}
              {photoPreview && (
                <div className="relative w-fit">
                  <Image
                    src={photoPreview}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    unoptimized
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 rounded-full h-6 w-6"
                    onClick={handleRemovePhoto}
                    disabled={isAnyLoading}
                  >
                    ✕
                  </Button>
                </div>
              )}

              {/* Upload and Camera buttons */}
              <div className="flex gap-2 flex-wrap">
                <label className={`flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition ${
                  isAnyLoading ? 'opacity-50 pointer-events-none' : ''
                }`}>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    disabled={isAnyLoading}
                  />
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Image src={UploadImage} width={16} height={16} alt="Upload" />
                    Upload
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleTakePhoto}
                  disabled={isAnyLoading}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex gap-2 items-center text-sm font-medium"
                >
                  <IoCameraOutline size={16} />
                  <span>Take Photo</span>
                </button>
              </div>

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

            {/* Dynamic Additional Fields */}
            {Object.entries(formData.additionalFields || {}).map(([prop, value], index) => {
              return (
                <div key={index} className="space-y-1.5">
                  <Label htmlFor={`field-${index}`} className="text-sm font-medium text-gray-700">
                    {prop}
                  </Label>
                  <Input
                    id={`field-${index}`}
                    value={value as string}
                    onChange={(e) => handleFieldChange(prop, e.target.value)}
                    className={`bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-colors ${
                      errors[`field-${index}`] ? "border-red-500" : ""
                    }`}
                    placeholder={`Enter ${prop?.toLowerCase()}`}
                    disabled={isAnyLoading}
                  />
                  {errors[`field-${index}`] && (
                    <p className="text-xs text-red-500 mt-1">{errors[`field-${index}`]}</p>
                  )}
                </div>
              )
            })}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-10 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                disabled={isAnyLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                disabled={isAnyLoading}
              >
                {isAnyLoading ? "Processing..." : formData?._id ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Cropper Modal */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[60] p-4">
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
                type="button"
                variant="outline"
                onClick={() => setShowCropper(false)}
                disabled={isCropping || isProcessingBackground || isUploadingImage}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleCropSave}
                className="bg-blue-600 text-white"
                disabled={isCropping || isProcessingBackground || isUploadingImage}
              >
                {isCropping
                  ? "Cropping..."
                  : isProcessingBackground
                    ? "Processing..."
                    : isUploadingImage
                      ? "Uploading..."
                      : "Apply Crop"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Webcam Modal */}
      {showWebcam && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Capture Photo</h3>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseWebcam}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleCaptureFromWebcam}
                className="bg-blue-600 text-white"
              >
                Capture
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isAnyLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">
              {isCropping 
                ? "Cropping Image..." 
                : isProcessingBackground 
                  ? "Processing Background..." 
                  : "Uploading Image..."}
            </h3>
            <p className="text-sm text-gray-600">
              {isCropping 
                ? "Applying your crop selection" 
                : isProcessingBackground 
                  ? "Removing background and enhancing photo" 
                  : "Saving processed image to cloud"}
            </p>
          </div>
        </div>
      )}
    </>
  )
}