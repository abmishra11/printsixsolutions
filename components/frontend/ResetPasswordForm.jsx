"use client";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (data.password !== data.confirmpassword) {
      toast.error("Confirm passwords do not match");
      return;
    }

    data.token = searchParams.get("token");
    data.id = searchParams.get("id");
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/users/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // await signOut();
        setLoading(false);
        router.push("/login");
        toast.success("Password Updated Successfully");
      } else {
        setLoading(false);
        switch (response.status) {
          case 422:
            toast.error(result.message || "Invalid password requirements.");
            break;
          case 404:
            toast.error("User not found or invalid token.");
            break;
          case 410:
            toast.error("Token has expired. Please request a new reset link.");
            break;
          case 500:
          default:
            toast.error(
              "An unexpected error occurred. Please try again later."
            );
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Reset Password
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                New Password
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
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="New Password"
              />
              {errors.password && (
                <small className="text-red-600 text-sm">
                  {errors.password.message}
                </small>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmpassword"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Confirm New Password
              </label>
              <input
                {...register("confirmpassword", {
                  required: "Please confirm your password",
                })}
                type="password"
                id="confirmpassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Confirm New Password"
              />
              {errors.confirmpassword && (
                <small className="text-red-600 text-sm">
                  {errors.confirmpassword.message}
                </small>
              )}
            </div>

            {loading ? (
              <button
                disabled={loading}
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
                Updating please wait...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full text-white bg-primary font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Reset Password
              </button>
            )}
            <div className="my-6">
              <p className="font-light text-white">
                Reset password link expired?{" "}
                <Link
                  href="/forget-password"
                  className="font-medium text-primary hover:underline"
                >
                  Request a new reset password link
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
