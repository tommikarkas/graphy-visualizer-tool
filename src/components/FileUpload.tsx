import { useState } from "react";
import { toast } from "sonner";

interface FileUploadProps {
  onDataReceived: (data: any) => void;
}

export const FileUpload = ({ onDataReceived }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileRead = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      onDataReceived(data);
      toast.success("JSON file successfully loaded");
    } catch (error) {
      toast.error("Invalid JSON file");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      handleFileRead(file);
    } else {
      toast.error("Please upload a JSON file");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  return (
    <div
      className={`w-full p-8 border-2 border-dashed rounded-lg transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-border"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <p className="text-muted-foreground mb-2">
          Drag and drop your JSON file here, or
        </p>
        <label className="cursor-pointer text-primary hover:underline">
          browse to upload
          <input
            type="file"
            className="hidden"
            accept="application/json"
            onChange={handleFileInput}
          />
        </label>
      </div>
    </div>
  );
};