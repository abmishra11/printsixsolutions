"use client";
import { Circle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function PriceFilter({ slug }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleSubmit, reset, register } = useForm();

  const onSubmit = (data) => {
    const { min, max } = data;
    const currentParams = new URLSearchParams(searchParams.toString());

    // Remove previous min and max to avoid duplicates
    currentParams.delete("min");
    currentParams.delete("max");

    if (min) currentParams.set("min", min);
    if (max) currentParams.set("max", max);

    if (slug) {
      router.push(`/category/${slug}?${currentParams.toString()}`);
    } else {
      router.push(`/shop?${currentParams.toString()}`);
    }
    reset();
  };

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 font-medium">Price</h3>
      <div className="mt-4">
        <form
          className="grid grid-cols-3 gap-4 my-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-1">
            <input
              {...register("min", { min: 0 })}
              type="number"
              aria-label="Minimum Price"
              className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
              placeholder="Min"
            />
          </div>
          <div className="col-span-1">
            <input
              {...register("max", { min: 0 })}
              type="number"
              aria-label="Maximum Price"
              className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
              placeholder="Max"
            />
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="text-white bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-3 py-1 focus:outline-none"
            >
              Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
