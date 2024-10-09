"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BaggageClaim, Heart, Search, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import AddToCartButton from "./AddToCartButton";

export default function Product({ product }) {
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <div className="p-4">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={556}
              height={556}
              className="w-full h-48 object-cover"
            />
          </div>
          {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
            <Link
              href="#"
              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            >
              <Search />
            </Link>
            <Link
              href="#"
              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            >
              <Heart />
            </Link>
          </div> */}
        </Link>
      </div>
      <div className="pt-4 pb-3 px-4 space-y-4">
        <Link href={`/products/${product.slug}`}>
          <h4 className="font-medium text-base mb-2 text-gray-800 hover:text-primary transition">
            {product.title}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2 font-roboto">
          <p className="text-xl text-primary font-semibold">
            ${product.salePrice}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${product.productPrice}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <Star />
            </span>
            <span>
              <Star />
            </span>
            <span>
              <Star />
            </span>
            <span>
              <Star />
            </span>
            <span>
              <Star />
            </span>
          </div>
          <div className="text-xs text-gray-500 ml-3">(150)</div>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
