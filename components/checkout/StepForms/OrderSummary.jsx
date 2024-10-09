"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setCurrentStep } from "@/redux/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCart, removeFromCart } from "@/redux/slices/cartSlice";

export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkoutFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    console.log(currentStep);
    dispatch(setCurrentStep(currentStep - 1));
  }

  const cartItems = useSelector((store) => store.cart);

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.salePrice * item.qty;
  }, 0);

  const shippingCost = parseFloat(checkoutFormData.shippingCost).toFixed(2);
  const total = (parseFloat(subTotal) + parseFloat(shippingCost)).toFixed(2);

  async function submitData() {
    const data = {
      orderItems: cartItems,
      checkoutFormData,
    };
    console.log("Order Submission Data:", data);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        toast.success("You have placed your order Successfully");

        dispatch(clearCart());

        router.push(`/order-confirmation/${responseData.id}`);
      } else {
        toast.error("Something Went wrong, please try again");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-primary">
        Order Summary
      </h2>
      {cartItems.map((cartItem, i) => {
        return (
          <div
            key={i}
            className="grid grid-cols-2 border-b border-slate-400 pb-3 font-semibold text-sm mb-4"
          >
            <div className="flex items-center gap-3">
              <Image
                src={cartItem.imageUrl}
                width={249}
                height={249}
                alt={cartItem.title}
                className="rounded-xl w-14 h-14"
              />
              <div className="flex flex-col">
                <h2>{cartItem.title}</h2>
              </div>
            </div>
            <div className="rounded-xl border border-gray-400 flex gap-3 items-center">
              <p className="flex-grow py-2 px-4">{cartItem.qty}</p>
            </div>
            <div className="flex items-center gap-2">
              <h4>${cartItem.salePrice}</h4>
            </div>
          </div>
        );
      })}

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          type="button"
          className="col-span-1 inline-flex items-center px-3 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-slate-800 dark:bg-primary dark:hover:bg-white dark:hover:text-slate-800"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
        {loading ? (
          <button
            disabled
            className="inline-flex items-center px-3 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-slate-800 dark:bg-primary dark:hover:bg-white dark:hover:text-slate-800"
          >
            Processing please wait...
          </button>
        ) : (
          <button
            onClick={submitData}
            className="col-span-1 inline-flex items-center px-3 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-slate-800 dark:bg-primary dark:hover:bg-white dark:hover:text-slate-800"
          >
            <span>Proceed to Payment</span>
            <ChevronRight className="w-5 h-5 mr-2" />
          </button>
        )}
      </div>
    </div>
  );
}
