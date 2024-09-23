import { XCircle } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZoneSingleFiles({
  className,
  imageFileName,
  uploadingFolderName,
  uploadedFile,
  setUploadedFile,
}) {
  const initialImageFile = uploadedFile ? uploadedFile : "";
  const [imageFile, setImageFile] = useState(initialImageFile);
  const [rejectedImageFile, setRejectedImageFile] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUploadedFile(imageFile);
  }, [imageFile, setUploadedFile]);

  const handleImageChange = async (file) => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append(uploadingFolderName, file);
      formData.append("filename", uploadingFolderName);
      formData.append("folder", uploadingFolderName);

      try {
        // const response = await fetch("/api/uploadimage", {
        //   method: "POST",
        //   body: formData,
        // });
        // if (response.ok) {
        //   const responseData = await response.json();
        //   console.log("Image uploaded successfully!");
        //   return responseData.imageUrl;
        // } else {
        //   alert("Failed to upload image.");
        //   return "";
        // }

        const response = await fetch("/api/cloudinaryupload", {
          method: "POST",
          body: formData,
        });

        if (response.status === 200) {
          const responseData = await response.json();
          return responseData.imageUrl;
        } else {
          alert("Failed to upload image.");
          return "";
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("An error occurred while uploading image.");
        return null;
      } finally {
        setLoading(false);
      }
    }
  };

  const onDrop = useCallback(
    async (acceptedFile, rejectedFile) => {
      setLoading(true);
      if (acceptedFile) {
        const imageUrl = await handleImageChange(acceptedFile[0]);
        console.log("imageUrl: ", imageUrl);
        imageUrl ? setImageFile(imageUrl) : setImageFile("");
      }

      if (rejectedFile) {
        console.log("Setting Rejected Files", rejectedFile);
        setRejectedImageFile(rejectedFile);
      }

      setLoading(false);
    },
    [handleImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
  });

  const removeFile = (name) => {
    setImageFile("");
  };

  const removeRejected = (name) => {
    setRejectedImageFile([]);
  };

  return (
    <div>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} name={imageFileName} />
        {isDragActive ? (
          <p>Drop the image file here</p>
        ) : (
          <p>Drag and drop image file here, or click to select image file</p>
        )}
      </div>
      {/* Uploaded Image Files */}
      {loading && <p>Loading...</p>}
      {imageFile && (
        <div className="flex flex-col mt-4 mb-4">
          <div className="relative rounded-md shadow-lg">
            <button
              type="button"
              className="w-7 h-7 border border-secondary-400 bg-secondary-500"
              onClick={() => removeFile(imageFile)}
            >
              <XCircle className="absolute top-8 left-0 bg-slate-100 text-slate-900 rounded-full" />
            </button>
            <Image
              src={`${imageFile}`}
              alt={`${imageFile}`}
              width={300}
              height={200}
              className="object-cover rounded-md"
            />
          </div>
        </div>
      )}
      {/* Rejected Image Files */}
      {rejectedImageFile.map(({ file, errors }) => (
        <div className="flex flex-col" key={file.name}>
          <div className="flex items-start justify-between">
            <div>
              <p className="mt-2 text-neutral-500 text-sm font-medium">
                {file.name}
              </p>
              <ul className="text-[12px] text-red-400">
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold"
              onClick={() => removeRejected(file.name)}
            >
              remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
