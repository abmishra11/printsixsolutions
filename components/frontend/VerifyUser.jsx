"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyUser({ user }) {
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      if (loading) return; // Prevent running the function if it's already in progress

      setLoading(true); // Set loading to true before starting the request

      if (user.emailVerified) {
        toast.success(
          "Your email is already verified. Please login to your account."
        );
        router.push(`/login`);
      } else {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const response = await fetch(
            `${baseUrl}/api/users/verify-user/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            toast.success(
              "Your email successfully verified. Please login to your account."
            );
            router.push(`/login`);
          } else {
            if (response.status === 404) {
              toast.error("User with this Email does not exist");
            } else {
              console.error("Server Error:", response.statusText);
              toast.error("Oops, Something Went Wrong");
            }
          }
        } catch (error) {
          console.error("Network Error:", error);
          toast.error("Something Went Wrong, Please Try Again");
        } finally {
          setLoading(false); // Reset loading after request completes
        }
      }
    };

    verifyUser();
  }, [user, router, loading]);

  // return null;
}
