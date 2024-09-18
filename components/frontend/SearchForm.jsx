"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function SearchForm() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  function handleSearch(data) {
    const { search } = data;
    reset();
    router.push(`/search?search=${search}`);
  }
  return (
    <>
      <form
        className="w-full max-w-xl relative flex"
        onSubmit={handleSubmit(handleSearch)}
      >
        <span className="absolute left-4 top-3 text-lg text-gray-400">
          <Search />
        </span>
        <input
          {...register("search")}
          type="text"
          id="voice-search"
          className="text-gray-900 w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none focus:ring-primary"
          placeholder="Search products and categories..."
          required
        />
        <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
          Search
        </button>
      </form>
    </>
  );
}
