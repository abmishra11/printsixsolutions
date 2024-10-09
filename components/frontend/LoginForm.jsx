"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  async function onSubmit(data) {
    try {
      setLoading(true);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (loginData?.error) {
        setLoading(false);
        toast.error("Sign-in error: check your credentials");
      } else {
        // Sign-in was successfull
        toast.success("Login successfull");
        reset();
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something Went wrong, Please Try Again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-white mb-2 block">
          Your email
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          name="email"
          id="email"
          className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
          placeholder="Enter your email address"
          required=""
        />
        {errors.email && (
          <small className="text-red-600 text-sm ">
            This field is required
          </small>
        )}
        <small className="text-red-600 text-sm ">{emailErr}</small>
      </div>
      <div>
        <label htmlFor="password" className="text-white mb-2 block">
          Password
        </label>
        <input
          {...register("password", { required: true })}
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
          required=""
        />
        {errors.password && (
          <small className="text-red-600 text-sm ">
            This field is required
          </small>
        )}
      </div>
      <div className="mt-6 mb-6">
        {/* Remember Me Section */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreement"
            className="text-primary focus:ring-primary focus:ring-2 focus:outline-none rounded-sm cursor-pointer"
          />
          <label htmlFor="agreement" className="text-white ml-3 cursor-pointer">
            Remember Me
          </label>
        </div>
      </div>
      {loading ? (
        <button
          disabled
          type="button"
          className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
        >
          Signing you in please wait...
        </button>
      ) : (
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-white hover:text-primary transition uppercase font-roboto font-medium"
        >
          Login
        </button>
      )}
      <div>
        {/* Forgot Password Link */}
        <Link href="#" className="text-primary hover:underline">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}
