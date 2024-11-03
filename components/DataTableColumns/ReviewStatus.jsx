"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ReviewStatus({ row, accessorKey }) {
  const savedReviewStatus = row.getValue(`${accessorKey}`);
  const reviewId = row.original.id;
  const [reviewStatus, setReviewStatus] = useState(savedReviewStatus);
  const [loading, setLoading] = useState(false);
  async function handleChange(e) {
    const newStatus = e.target.value; 
    setReviewStatus(newStatus);
    const data = {
      reviewStatus: newStatus,
    };

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/review/status/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setLoading(false);
        toast.success(`Review Status Updated Successfully`);
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
    color: reviewStatus ? "green" : "red",
  };

  const selectBorderStyle = {
    borderColor: reviewStatus ? "green" : "red",
  };

  return (
    <>
      {loading ? (
        <p>Updating...</p>
      ) : (
        <select
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={selectBorderStyle}
          value={reviewStatus}
          onChange={handleChange}
        >
          <option value={"false"}>PENDING</option>
          <option value={"true"}>APPROVED</option>
        </select>
      )}
    </>
  );
}
