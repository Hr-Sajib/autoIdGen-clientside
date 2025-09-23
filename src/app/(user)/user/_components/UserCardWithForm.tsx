


"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HorizontalCardForUser from "./HorizontalCardForUser";
import VerticalCardForUser from "./VerticalCardForUser";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { useSearchParams } from "next/navigation";

// ---------------------
// Utility for cropping
// ---------------------
type CroppedAreaPixels = { x: number; y: number; width: number; height: number };

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

const UserCardWithForm = () => {
    const searchParams = useSearchParams();
  
    const role = searchParams.get("role");
    const batchCode = searchParams.get("batchCode");
    const rollSerial = searchParams.get("rollSerial");
    
    console.log("Role:", role);
    console.log("Batch Code:", batchCode);
    console.log("Roll Serial:", rollSerial);
  
  // backend থেকে আসা fields
  const fields = ["fathersName", "mothersName", "class", "department",];

  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [profileUrl, setProfileUrl] = useState("https://i.ibb.co.com/jvqgjL8c/62792368846-removebg-preview.png");
  const [cardOrientation, setCardOrientation] = useState<"horizontal" | "vertical">("horizontal");

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

  const onCropComplete = useCallback((_ : unknown, croppedAreaPixels: CroppedAreaPixels) => {
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

  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
      if (photoPreview && photoPreview.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [imageSrc, photoPreview]);

  return (
    <div className="flex gap-10 p-6">
      {/* ---------- Left: Form ---------- */}
      <div className="w-[350px] border rounded-lg p-4 shadow-md bg-white">
        <h2 className="text-lg font-bold mb-3">Enter Student Info</h2>

        {/* Card Orientation Select */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Card Orientation</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={cardOrientation}
            onChange={(e) => setCardOrientation(e.target.value as "horizontal" | "vertical")}
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>

        {fields.map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-sm font-medium mb-1 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <Input
              type="text"
              value={values[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        {/* Upload / Take photo */}
        <div className="flex flex-wrap gap-3 mt-3">
          <label className="flex items-center justify-center border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
            ⬆️ Upload Photo
          </label>
          <Button variant="outline" onClick={handleTakePhoto}>📷 Take Photo</Button>
          <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files?.[0] || null)} style={{ display: "none" }} />
        </div>

        {/* Photo Preview */}
        {photoPreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">📸 Current Photo:</p>
            <div className="relative w-fit">
              <Image src={photoPreview} alt="Profile Preview" width={128} height={128} className="w-32 h-32 object-cover rounded-lg border shadow" />
              <Button size="sm" variant="destructive" className="absolute -top-2 -right-2 rounded-full" onClick={handleRemovePhoto}>✕</Button>
            </div>
          </div>
        )}

        <Button onClick={() => console.log("👉 Submitted:", { ...values, profileUrl, cardOrientation })} className="mt-3 w-full">
          Save Data
        </Button>
      </div>

      {/* ---------- Right: Card Preview ---------- */}
      <div>
        {cardOrientation === "horizontal" ? (
          <HorizontalCardForUser
            instituteName="ABC High School"
            address="Dhaka, Bangladesh"
            idCardType="Student ID"
            studentName="Hasibul"
            qrData="CSE12345"
            logoUrl="https://i.ibb.co.com/WWp6qvYk/dummy-institusion-logo.png"
            profileUrl={profileUrl}
            signatureUrl="https://i.ibb.co.com/qFVRbCkZ/signature-removebg-preview.png"
            whoseSign="Principal"
            fields={fields}
            values={values}
          />
        ) : (
          <VerticalCardForUser
            instituteName="ABC High School"
            address="Dhaka, Bangladesh"
            idCardType="Student ID"
            studentName="Hasibul"
            qrData="CSE12345"
            logoUrl="https://i.ibb.co.com/WWp6qvYk/dummy-institusion-logo.png"
            profileUrl={profileUrl}
            signatureUrl="https://i.ibb.co.com/qFVRbCkZ/signature-removebg-preview.png"
            whoseSign="Principal"
            fields={fields}
            values={values}
          />
        )}
      </div>

      {/* -------- Cropper Modal -------- */}
      {showCropper && imageSrc && (
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

      {/* -------- Webcam Modal -------- */}
      {showWebcam && (
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
