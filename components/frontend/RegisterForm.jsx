"use client";
import { sendEmail } from "@/lib/sendEmail";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterForm({ role = "USER" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  async function onSubmit(data) {
    data.plan = plan;
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { data } = await response.json();
        const newUser = data;
        console.log("newUser", newUser);

        if (role === "USER") {
          const emailVerificationLink = `${baseUrl}/verify-email/${newUser?.id}`;
          const emailData = {
            to: data.email,
            subject: "Test Email",
            templateName: "lib/emailtemplates/verifyEmail.ejs",
            templateVariables: { action_url: emailVerificationLink },
          };
          await sendEmail(emailData);
          setLoading(false);
          toast.success("User Created Successfully");
          reset();
          router.push(`/verify-email?userId=${newUser?.id}`);
        } else {
          const { data } = response;
          router.push(`/verify-email?userId=${data?.id}`);
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          // Handle other errors
          console.error("Server Error:", response.message);
          toast.error("Oops Something Went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something Went wrong, Please Try Again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="space-y-4">
        <div>
          <input
            {...register("role", { required: true })}
            type="hidden"
            name="role"
            id=""
            className=""
            placeholder=""
            required=""
            value={role}
          />
        </div>
        <div>
          <label htmlFor="name" className="text-white mb-2 block">
            Your name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            name="name"
            id="name"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="John Doe"
            required=""
          />
          {errors.name && (
            <small className="text-red-600 text-sm ">
              This field is required
            </small>
          )}
        </div>
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
            placeholder="name@company.com"
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
        {loading ? (
          <button
            disabled
            type="button"
            className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center"
          >
            Creating your account please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-white hover:text-primary transition uppercase font-roboto font-medium"
          >
            Sign Up
          </button>
        )}
        {/* <div className="flex justify-center relative mt-6">
          <div className="text-white uppercase px-3 bg-primary z-10 relative">
            OR SIGNUP IN WITH
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>
        <div className="flex mt-4 gap-4">
          <Link
            href="#"
            className="w-1/2 p-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
          >
            Facebook
          </Link>
          <Link
            href="#"
            className="w-1/2 p-2 text-center text-white bg-yellow-600 rounded uppercase font-roboto font-medium text-sm hover:bg-yellow-500"
          >
            Google
          </Link>
        </div> */}
        <p className="text-sm font-light text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
        {role === "USER" ? (
          <p className="text-sm font-light text-white">
            Are you a vendor?{" "}
            <Link
              href="/register-vendor"
              className="font-medium text-primary hover:underline"
            >
              Register here
            </Link>
          </p>
        ) : (
          <p className="text-sm font-light text-white">
            Are you a user ?{" "}
            <Link
              href="/vendor-pricing"
              className="font-medium text-primary hover:underline"
            >
              Register here
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
