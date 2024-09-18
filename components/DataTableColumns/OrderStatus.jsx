"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function OrderStatus({ row, accessorKey }) {
  const savedOrderStatus = row.getValue(`${accessorKey}`);
  const orderId = row.original.id;
  const [orderStatus, setOrderStatus] = useState(savedOrderStatus);
  const [loading, setLoading] = useState(false);
  async function handleChange(e) {
    const newStatus = e.target.value; // Converting string to boolean
    setOrderStatus(newStatus);
    const data = {
      orderStatus: newStatus,
    };
    console.log(data);
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setLoading(false);
        toast.success(`Order Status Updated Successfully`);
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
    color: orderStatus ? "green" : "red",
  };

  const selectBorderStyle = {
    borderColor: orderStatus ? "green" : "red",
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
          value={orderStatus}
          onChange={handleChange}
        >
          <option value={"PENDING"}>PENDING</option>
          <option value={"PROCESSING"}>PROCESSING</option>
          <option value={"SHIPPED"}>SHIPPED</option>
          <option value={"DELIVERED"}>DELIVERED</option>
          <option value={"CANCELED"}>CANCELED</option>
        </select>
      )}
    </>
  );
}
