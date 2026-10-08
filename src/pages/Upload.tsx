import React, { useState, useRef } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();

  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = (file: any) => {
    console.log("File =", file);

    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("File uploaded successfully", {
            position: "bottom-right",
            duration: 2000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setLoading(false);
          removeFile();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("File upload failed", {
            position: "bottom-right",
            duration: 2000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("File upload failed", {
        position: "bottom-right",
        duration: 2000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full max-w-xl mx-auto p-6 w-full">
      <div>
        <Toaster />
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`w-full relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 min-h-[260px]
          ${
            isDragActive
              ? "border-primary bg-primary/5 scale-[0.99]"
              : "border-muted-foreground/20 hover:border-muted-foreground/40 bg-card"
          }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".csv,.xlsx"
        />

        <div className="flex flex-col items-center gap-4 pointer-events-none">
          <div
            className={`p-4 rounded-full transition-colors ${isDragActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
          >
            <UploadCloud className="h-8 w-8 animate-pulse" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">
              <span className="text-primary font-semibold">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">Excel (max. 10MB)</p>
          </div>
        </div>
      </div>

      {file && (
        <div className="w-full mt-4 p-4 border rounded-xl bg-card flex items-center justify-between gap-4 animate-in fade-in-50 slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate max-w-60 md:max-w-md">
                {file.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {file && (
        <Button
          className="w-full mt-4 h-11 bg-gradient-to-r from-[#009bdf] to-[#0077b5] hover:from-[#0082bc] hover:to-[#006aa3] text-white shadow-lg shadow-[#009bdf]/25 font-bold rounded-xl transition-all"
          onClick={() => handleUpload(file)}
        >
          {loading ? <Spinner data-icon="inline-start" /> : ""}
          Upload Selected File
        </Button>
      )}
    </div>
  );
}
