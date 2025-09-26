import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

// Signature Customization Modal Component
export const SignatureCustomizationModal = ({ 
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
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 space-y-4 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Customize Signature</h3>
          <Button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Edited Preview"
            className="mt-4 max-w-xs rounded shadow mx-auto block"
          />
        )}

        <div className="space-y-2">
          <label>
            Exposure (Brightness): {brightness}%
            <input
              type="range"
              min="50"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label>
            Contrast: {contrast}%
            <input
              type="range"
              min="50"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label>
            Saturation: {saturation}%
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save
          </Button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};