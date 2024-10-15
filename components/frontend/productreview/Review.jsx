import { User } from "lucide-react";
import React from "react";
import ProductReview from "./ProductReview";
import { getFormattedDateAndTime } from "@/lib/getFormatedDateAndTime";
import Image from "next/image";

export default function Review({ review }) {
  return (
    <div>
      <div className="flex items-center">
        {review.user?.profile?.profileImageUrl ? (
          <Image
            className="mr-4 rounded-lg"
            src={review.user?.profile?.profileImageUrl}
            height={50}
            width={50}
            alt="User"
          />
        ) : (
          <User className="rounded-lg text-primary h-8 w-16" />
        )}
        <div>
          <p className="text-primary mb-2">{review.user?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <ProductReview stars={review.rating} reviews={1} />
        <p className="text-primary">
          {getFormattedDateAndTime(review.createdAt)}
        </p>
      </div>
      <div></div>
      <div className="mt-4">
        <p className="text-gray-800">{review.comment}</p>
      </div>
    </div>
  );
}
