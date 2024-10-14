"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductReview from "./ProductReview";
import toast from "react-hot-toast";

export default function ProductReviewForm({
  product,
  productReviews = [],
  userId = null,
}) {
  let userReviewed = false;
  if (userId) {
    productReviews.forEach((review) => {
      if (review.userId === userId) {
        userReviewed = true;
      }
    });
  }

  const customerReview = productReviews.filter(
    (review) => review.userId !== userId
  );

  const userReview = productReviews.filter(
    (review) => review.userId === userId
  );

  const [reviews, setReviews] = useState(customerReview);

  const [usersReview, setUsersReview] = useState(userReview);

  const [formInput, setFormInput] = useState({
    rating: 0,
    comment: "",
  });

  // Function to handle star rating click
  const handleRatingClick = (rating) => {
    setFormInput({ ...formInput, rating });
  };

  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formInput.rating || !formInput.comment) {
      toast.error("Please provide both rating and comment.");
      return;
    }

    setLoading(true);

    const newReview = {
      rating: formInput.rating,
      comment: formInput.comment,
      productId: product.id,
      userId,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("You have successfully added the review");
        setUsersReview([newReview]); // Update user's review state
        setReviews((prevReviews) => [...prevReviews, newReview]);
        userReviewed = true;
      } else {
        if (response.status === 409) {
          toast.error(responseData.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }

    setFormInput({ rating: 0, comment: "" });
  };

  return (
    <div className="bg-slate-700 md:py-16 my-8 rounded-xl">
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
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-primary mr-2 font-bold">
            Customer's Reviews
          </h2>
          {/* <Link
            href={"#reviewForm"}
            className="bg-primary text-white py-2 px-4 rounded-lg"
          >
            Add Review
          </Link> */}
        </div>
        {/* Display all reviews */}
        {reviews.map((review) => (
          <div key={review.id} className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <Image
                  className="mr-4 rounded-lg"
                  src={"/photo.jpg"} // You can dynamically link different images if needed
                  height={50}
                  width={50}
                  alt="User"
                />
                <div>
                  <p className="text-primary mb-2">{review.userName}</p>
                  <ProductReview stars={review.rating} reviews={10} />
                </div>
              </div>
              <div>
                <p className="text-primary">{review.createdAt}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form */}
      {userId && !userReviewed ? (
        <form
          id="reviewForm"
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Write a Review
          </h2>
          <div className="mb-4">
            <label className="block text-primary font-medium mb-2">
              Rating:
            </label>
            {/* Star rating input */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={star <= formInput.rating}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-primary font-medium mb-2"
            >
              Your Review:
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-primary"
              placeholder="Write your review here..."
              value={formInput.comment}
              onChange={(e) =>
                setFormInput({ ...formInput, comment: e.target.value })
              }
            ></textarea>
          </div>
          <input
            type="hidden"
            id="productId"
            name="productId"
            value="PRODUCT_ID"
          />
          <input type="hidden" id="userId" name="userId" value="USER_ID" />
          <div className="text-right">
            <button
              type="submit"
              className="bg-primary text-white hover:bg-white hover:text-primary font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit Review
            </button>
          </div>
        </form>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-4">
          {userId ? (
            <div>
              {usersReview.length > 0 ? (
                usersReview.map((review) => (
                  <div key={review.id}>
                    <h2 className="text-2xl text-primary font-bold">
                      Your Review
                    </h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Image
                          className="mr-4 rounded-lg"
                          src={"/photo.jpg"} // dynamic image logic can go here
                          height={50}
                          width={50}
                          alt="User"
                        />
                        <div>
                          <p className="text-primary mb-2">{review.userName}</p>
                          <ProductReview stars={review.rating} reviews={1} />
                        </div>
                      </div>
                      <div>
                        <p className="text-primary">{review.createdAt}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-800">{review.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <Link
                  href={"/login"}
                  className="bg-primary text-white py-2 px-4 rounded-lg"
                >
                  Login to add review
                </Link>
              )}
            </div>
          ) : (
            <Link
              href={"/login"}
              className="bg-primary text-white py-2 px-4 rounded-lg"
            >
              Login to add review
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// Star component for rendering individual stars
const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 mr-2 cursor-pointer ${
      filled ? "text-primary" : "text-primary"
    }`}
    fill={filled ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke={filled ? "none" : "currentColor"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.285 7.021h7.39c.969 0 1.371 1.24.588 1.81l-5.977 4.34 2.285 7.02c.3.922-.755 1.688-1.54 1.105l-5.978-4.34-5.978 4.34c-.784.583-1.838-.183-1.539-1.105l2.285-7.02-5.978-4.34c-.783-.57-.38-1.81.588-1.81h7.39l2.285-7.02z"
    />
  </svg>
);
