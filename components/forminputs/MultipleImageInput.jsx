import React from "react";
import DropZone from "./DropZone";

export default function MultipleImageInput({
  label,
  name,
  register,
  errors,
  isRequired = false,
  imageFiles = [],
  setImageFiles,
  folderName,
  className = "col-span-full",
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor="course-image"
          className="block font-medium leading-6 text-gray-900 dark:text-slate-50"
        >
          {isRequired ? `* ${label}` : `${label}`}
        </label>
      </div>
      <DropZone
        className="p-10 border border-neutral-200 rounded-md text-gray-900 dark:text-slate-100 text-center cursor-pointer mb-4"
        imageFilesName={name}
        uploadingFolderName={folderName}
        uploadedFiles={imageFiles}
        setUploadedFiles={setImageFiles}
      />
    </div>
  );
}
