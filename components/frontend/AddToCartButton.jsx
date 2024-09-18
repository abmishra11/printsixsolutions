"use client";
import { BaggageClaim } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  function handleAddToCart() {
    // Dispatch the reducer
    dispatch(addToCart(product));
    toast.success("Item added successfully");
  }
  return (
    <button
      onClick={() => handleAddToCart()}
      className="block w-full py-2 text-center rounded-lg text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
    >
      {/* <BaggageClaim /> */}
      <span>Add to Cart</span>
    </button>
  );
}
