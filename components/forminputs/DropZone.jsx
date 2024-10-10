import { XCircle } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone({
  className,
  imageFilesName,
  uploadingFolderName,
  uploadedFiles,
  setUploadedFiles,
}) {
  const [imageFiles, setImageFiles] = useState(uploadedFiles);
  const [rejectedImageFiles, setRejectedImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUploadedFiles(imageFiles);
  }, [imageFiles, setUploadedFiles]);

  const handleImageChange = async (file) => {
    if (file) {
      setLoading(true);
      console.log("Started file uploading");
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
        //   return null;
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
    async (acceptedFiles, rejectedFiles) => {
      setLoading(true);

      if (acceptedFiles?.length) {
        const newFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const imageUrl = await handleImageChange(file);
            if (imageUrl) {
              //return Object.assign(file, { preview: imageUrl });
              return imageUrl;
            }
            return null;
          })
        );

        setImageFiles((previousFiles) => [
          ...previousFiles,
          ...newFiles.filter((file) => file !== null),
        ]);
      }

      if (rejectedFiles?.length) {
        setRejectedImageFiles((previousFiles) => [
          ...previousFiles,
          ...rejectedFiles,
        ]);
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
    maxSize: 1024 * 2000,
    maxFiles: 4,
  });

  const removeFile = (name) => {
    const newRemovalFiles = imageFiles.filter((file) => file !== name);
    setImageFiles(newRemovalFiles);
    console.log("Files after removal", imageFiles);
  };

  const removeRejected = (name) => {
    setRejectedImageFiles((rejectedImageFiles) =>
      rejectedImageFiles.filter(({ file }) => file.name !== name)
    );
  };
  console.log("Already uploaded files:", imageFiles);

  return (
    <div>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} name={imageFilesName} />
        {isDragActive ? (
          <p>Drop the file here</p>
        ) : (
          <p>Drag and drop some image here, or click to select images</p>
        )}
      </div>
      {/* Uploaded Image Files */}
      {loading && <p>Loading...</p>}
      <div className="mb-10">
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {imageFiles.map((file, index) => (
            <li key={index} className="relative h-32 rounded-md shadow-lg">
              <button
                type="button"
                className="w-7 h-7 border border-secondary-400 bg-secondary-500"
                onClick={() => removeFile(file)}
              >
                <XCircle className="absolute top-8 right-0 bg-slate-100 text-slate-900 rounded-full" />
              </button>
              <Image
                src={`${file}`}
                alt={file}
                width={1000}
                height={667}
                className="w-full h-32 object-cover rounded-md"
              />
            </li>
          ))}
        </ul>
        {/* Rejected Image Files */}
        <ul className="flex flex-col">
          {rejectedImageFiles.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-neutral-500 font-medium">{file.name}</p>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
