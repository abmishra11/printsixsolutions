"use client";
import { BaggageClaim } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }) {
  const [ addedProduct, setAddedProduct] = useState(false)
  const dispatch = useDispatch();
  function handleAddToCart() {
    // Dispatch the reducer
    dispatch(addToCart(product));
    toast.success("Item added successfully");
    setAddedProduct(true)
  }
  return (
    <button
      disabled={addedProduct}
      onClick={() => handleAddToCart()}
      className={addedProduct ? `block w-full py-2 text-center rounded-lg text-white bg-slate-900 border border-slate-900 rounded-b hover:bg-white hover:text-primary transition` : `block w-full py-2 text-center rounded-lg text-white bg-primary border border-primary rounded-b hover:bg-white hover:text-primary transition`}
    >
      {/* <BaggageClaim /> */}
      <span>{addedProduct ? "Added to Cart" : "Add to Cart"}</span>
    </button>
  );
}
