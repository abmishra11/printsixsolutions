import React, { useState } from "react";
import DropZoneSingleFiles from "./DropZoneSingleFile";

export default function ImageInput({
  label,
  name,
  register,
  errors,
  isRequired = false,
  imageFile,
  setImageFile,
  folderName,
  className = "sm:col-span-2",
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
      </label>
      <DropZoneSingleFiles
        className="p-10 border border-neutral-200 rounded-md text-gray-900 dark:text-slate-100 text-center cursor-pointer mb-4"
        imageFileName={name}
        uploadingFolderName={folderName}
        uploadedFile={imageFile}
        setUploadedFile={setImageFile}
      />
    </div>
  );
}
