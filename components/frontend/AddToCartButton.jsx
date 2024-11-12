"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }) {
  const [addedProduct, setAddedProduct] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const productInCart = cartItems.some((item) => item.id === product.id);
    if (productInCart) {
      setAddedProduct(true);
    }
  }, [cartItems, product.id]);

  function handleAddToCart() {
    if (!addedProduct) {
      dispatch(addToCart(product));
      toast.success("Item added successfully");
      setAddedProduct(true);
      // setTimeout(() => setAddedProduct(false), 2000);
    }
  }

  return (
    <button
      disabled={addedProduct}
      onClick={handleAddToCart}
      className={
        addedProduct
          ? `block w-full py-2 text-center rounded-lg text-white bg-lime-500 border border-lime-500 hover:bg-white hover:text-primary transition`
          : `block w-full py-2 text-center rounded-lg text-white bg-primary border border-primary hover:bg-white hover:text-primary transition`
      }
    >
      <span>{addedProduct ? "Added to Cart" : "Add to Cart"}</span>
    </button>
  );
}
