import { generateSlug } from "@/lib/generateSlug";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OrderItem({ orderItem }) {
  const slug = generateSlug(orderItem.title);
  return (
    <li className="">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between">
        <div className="flex items-center justify-between">
          <Image
            className="object-cover rounded-lg w-28 h-28"
            src={orderItem.imageUrl}
            alt={orderItem.title}
            width={200}
            height={200}
          />
          <p className="text-base font-bold text-gray-900 ml-4 mb-4">
            {orderItem.title}
          </p>
        </div>
        <div className="grid grid-cols-3 md:items-center mt-4">
          <p className="text-gray-900 md:col-span-1 col-span-3">
            Quantity: {orderItem.quantity}
          </p>
          <p className="text-gray-900 md:col-span-1 col-span-3 sm:mt-4 sm:mb-4">
            Price: ${orderItem.price}
          </p>
          <Link
            href={`/products/${slug}`}
            title={orderItem.title}
            className="md:col-span-1 col-span-3 py-2 px-4 mt-2 sm:mt-0 bg-lime-500 text-white rounded-md text-center"
          >
            View Product
          </Link>
        </div>
      </div>
    </li>
  );
}
