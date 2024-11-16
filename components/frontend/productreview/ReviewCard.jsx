import { User } from "lucide-react";
import React from "react";
import ProductReview from "./ProductReview";
import { getFormattedDateAndTime } from "@/lib/getFormatedDateAndTime";
import Image from "next/image";

export default function ReviewCard({ review }) {
  return (
    <div className="px-48 py-8">
      <div className="bg-slate-800 p-8">
        <h3 className="mb-4 text-2xl text-center">Product Detail</h3>
        <div className="grid md:grid-cols-4 grid-cols-1">
          <div className="col-span-1">
            <Image
              className="mr-4 rounded-lg"
              src={review.product?.imageUrl}
              height={200}
              width={200}
              alt={review.product?.title}
            />
          </div>
          <div className="md:col-span-3 col-span-1">
            <p>{review.product?.title}</p>
            <p>Product Price: {review.product?.productPrice}</p>
            <p>Sale Price: {review.product?.salePrice}</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 p-8 mt-4">
        <h3 className="mb-4 text-2xl text-center">Review Detail</h3>
        <div className="">
          {review.user?.profile?.profileImageUrl ? (
            <Image
              className="mr-4 rounded-lg"
              src={review.user?.profile?.profileImageUrl}
              height={200}
              width={200}
              alt="User"
            />
          ) : (
            <User className="rounded-lg text-primary h-8 w-16" />
          )}
          <p className="mt-4">{review.user?.name}</p>
        </div>
        <div className="mt-4">
          <ProductReview stars={review.rating} reviews={1} />
          <p className="mt-4">{getFormattedDateAndTime(review.createdAt)}</p>
        </div>
        <div className="mt-4">
          <p>{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
