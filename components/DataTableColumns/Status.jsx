"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Status({ row, accessorKey }) {
  const savedStatus = row.getValue(`${accessorKey}`);
  const userId = row.original.id;
  const [status, setStatus] = useState(savedStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value === "true"; // Converting string to boolean
    setStatus(newStatus);
    const data = {
      status: newStatus,
      emailVerified: true,
    };
    console.log(data);
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/vendors/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setLoading(false);
        toast.success(`Vendor Status Updated Successfully`);
      } else {
        setLoading(false);
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const optionStyle = {
    color: status ? "green" : "red",
  };

  const selectBorderStyle = {
    borderColor: status ? "green" : "red",
  };

  return (
    <>
      {loading ? (
        <p>Updating...</p>
      ) : (
        <select
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={selectBorderStyle}
          value={status} // Use value prop to control selected option
          onChange={handleChange}
        >
          <option value="true">APPROVED</option>
          <option value="false">PENDING</option>
        </select>
      )}
    </>
  );
}
