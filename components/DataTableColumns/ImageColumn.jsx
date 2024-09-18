import React from "react";
import Image from "next/image";

export default function ImageColumn({ row, accessorKey }) {
  const imageUrl = row
    .getValue(`${accessorKey}`)
    .replace("/public/upload", "/upload");
  return (
    <div className="shrink-0">
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={500}
          height={500}
          className="w-16 h-16 rounded-full object-cover"
          alt={`${accessorKey}`}
        />
      ) : (
        <span>No Image</span>
      )}
    </div>
  );
}
