import React from "react";
import ProductReview from "./ProductReview";
import Review from "./Review";

export default function AllReviews({ reviews }) {
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-4">
        {/* Review summary */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-primary mr-2 font-bold">
            Over All Rating
          </h2>
          <ProductReview
            stars={
              reviews.reduce((acc, review) => acc + review.rating, 0) /
                reviews.length || 0
            }
            reviews={reviews.length}
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 max-h-96 overflow-scroll">
        <div className="text-center">
          <h2 className="text-2xl text-primary mr-2 font-bold ">
            Customer's Reviews
          </h2>
        </div>
        {/* Display all reviews */}
        {reviews.map((review) => (
          <div key={review.id} className="mt-4">
            <Review review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}
