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
            subject: "Email Verification",
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
        switch (response.status) {
          case 409:
            toast.error("User with this email already exists");
            break;
          case 422:
            toast.error(response.message);
            break;
          default:
            toast.error(
              "An unexpected error occurred. Please try again later."
            );
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
            * Your name
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
            <small className="text-red-600">This field is required</small>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-white mb-2 block">
            * Your email
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
            <small className="text-red-600">This field is required</small>
          )}
          <small className="text-red-600 text-sm ">{emailErr}</small>
        </div>
        <div>
          <label htmlFor="password" className="text-white mb-2 block">
            * Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character",
              },
            })}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            required=""
          />
          {errors.password && (
            <small className="text-red-600 text-sm">
              {errors.password.message}
            </small>
          )}
        </div>
        {loading ? (
          <button
            disabled
            type="button"
            className="w-full text-white bg-primary font-medium rounded-lg px-5 py-2.5 text-center mr-2 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
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
        <p className="font-light text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
        {role === "USER" ? (
          <p className="font-light text-white">
            Are you a vendor?{" "}
            <Link
              href="/register-vendor"
              className="font-medium text-primary hover:underline"
            >
              Register here
            </Link>
          </p>
        ) : (
          <p className="font-light text-white">
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
