import React from "react";
import ProductReview from "./ProductReview";
import Link from "next/link";
import Image from "next/image";

export default function ProductReviewForm() {
  return (
    <div className="bg-slate-700 md:py-16 my-8 rounded-xl">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center">
          <h2 className="text-2xl text-primary mr-4">4.5</h2>
          <ProductReview stars={4.5} reviews={10} />
        </div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-2xl text-primary mr-2 font-bold">
            Customer Review
          </h2>
          <Link
            href={"#"}
            className="bg-primary text-white py-2 px-4 rounded-lg"
          >
            Add Review
          </Link>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-start">
            <Image
              className="mr-4 rounded-lg"
              src={"/photo.jpg"}
              height={50}
              width={50}
            />
            <div>
              <p className="text-primary mb-2">Abhay Kumar Mishra</p>
              <ProductReview stars={4.5} reviews={10} />
            </div>
          </div>
          <div>
            <p className="text-primary">Jan, 24, 2024</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-800">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <form
        id="reviewForm"
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Write a Review
        </h2>
        <div className="mb-4">
          <label for="rating" className="block text-gray-700 font-medium mb-2">
            Rating (1 to 5):
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter rating between 1 and 5"
          />
        </div>
        <div className="mb-4">
          <label for="comment" className="block text-gray-700 font-medium mb-2">
            Your Review:
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
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
    </div>
  );
}
