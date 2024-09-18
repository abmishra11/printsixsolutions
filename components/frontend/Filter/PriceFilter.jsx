"use client";
import { Circle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function PriceFilter({ slug }) {
  const searchParams = useSearchParams();
  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");
  console.log(minParam, maxParam);
  const priceRange = [
    {
      display: "Under 8",
      max: 8,
    },
    {
      display: "Between 7 and 8",
      min: 7,
      max: 8,
    },
    {
      display: "Above 7",
      min: 7,
    },
  ];
  const router = useRouter();
  const { handleSubmit, reset, register } = useForm();
  function onSubmit(data) {
    const { min, max } = data;
    console.log(min, max);
    if (min && max) {
      router.push(`/category/${slug}?sort=asc&min=${min}&max=${max}`);
      reset();
    } else if (min) {
      router.push(`/category/${slug}?sort=asc&min=${min}`);
      reset();
    } else if (max) {
      router.push(`/category/${slug}?sort=asc&max=${max}`);
      reset();
    }
  }
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
              {...register("min")}
              type="number"
              id="cvv-input"
              aria-describedby="helper-text-explanation"
              className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
              placeholder="Min"
            />
          </div>
          <div className="col-span-1">
            <input
              {...register("max")}
              type="number"
              id="cvv-input"
              aria-describedby="helper-text-explanation"
              className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
              placeholder="Max"
            />
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="text-white bg-primary hover:bg-white focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-3 py-1 focus:outline-none"
            >
              Go
            </button>
          </div>
        </form>
      </div>
      {/* <div className="">
        <div className="flex justify-between items-center gap-10">
          <h2 className="text-xl font-medium">Price</h2>
          <Link
            href={`/category/${slug}`}
            className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
          >
            Reset Filters
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {priceRange.map((range, i) => {
            let priceRangeHref;
            if (range.min && range.max) {
              priceRangeHref = `/category/${slug}?sort=asc&min=${range.min}&max=${range.max}`;
            } else if (range.min) {
              priceRangeHref = `/category/${slug}?sort=asc&min=${range.min}`;
            } else {
              priceRangeHref = `/category/${slug}?sort=asc&max=${range.max}`;
            }
            return (
              <Link
                key={i}
                href={priceRangeHref}
                className={`${
                  (range.min && range.min == minParam) ||
                  (range.max && range.max == maxParam) ||
                  (range.min &&
                    range.max &&
                    range.min == minParam &&
                    range.max == maxParam)
                    ? "flex gap-2 items-center text-lime-500"
                    : "flex gap-2 items-center"
                }`}
              >
                <Circle className="w-4 h-4 flex-shrink-0" />
                {range.display}
              </Link>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}
