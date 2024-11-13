"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { setCurrentStep } from "@/redux/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCart, removeFromCart } from "@/redux/slices/cartSlice";
import { sendEmail } from "@/lib/sendEmail";

export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkoutFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
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

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        const shippingaddress =
          responseData.streetAddress1 +
          ", " +
          responseData.streetAddress2 +
          ", " +
          responseData.city +
          ", " +
          responseData.state +
          ", " +
          responseData.country +
          ", " +
          responseData.zipcode;
        const billingaddress =
          responseData.billingStreetAddress1 +
          ", " +
          responseData.billingStreetAddress2 +
          ", " +
          responseData.billingCity +
          ", " +
          responseData.billingState +
          ", " +
          responseData.billingCountry +
          ", " +
          responseData.billingZipcode;
        const emailData = {
          to: responseData.email,
          subject: "Order Confirmation",
          templateName: "lib/emailtemplates/orderConfirmation.ejs",
          templateVariables: {
            order_id: responseData.orderNumber,
            customer_name: responseData.name,
            order_details: baseUrl + "/order-confirmation/" + responseData.id,
            shipping_address: shippingaddress,
            billing_address: billingaddress,
          },
        };
        await sendEmail(emailData);
        setLoading(false);
        dispatch(clearCart());
        dispatch(setCurrentStep(1));
        toast.success("You have placed your order Successfully");
        router.push(`/order-confirmation/${responseData.id}`);
      } else {
        setLoading(false);
        toast.error("Something Went wrong, please try again");
      }
    } catch (error) {
      setLoading(false);
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
            className="grid md:grid-cols-2 py-4 border-b border-slate-400 font-semibold"
          >
            <div className="col-span-1 flex items-center gap-3 md:mb-0 mb-4">
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
            <div className="col-span-1 flex items-center justify-between">
              <p className="rounded-xl border border-gray-400 py-2 px-4">
                {cartItem.qty}
              </p>
              <h4>${parseFloat(cartItem.salePrice).toFixed(2)}</h4>
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-between py-4 border-b border-slate-400 font-semibold">
        <div>
          <h4>Shipping Cost</h4>
        </div>
        <div>
          <h4>${shippingCost}</h4>
        </div>
      </div>
      <div className="flex items-center justify-between py-4 border-b border-slate-400 font-semibold">
        <div>
          <h4>Total</h4>
        </div>
        <div>
          <h4>${total}</h4>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          type="button"
          className="col-span-1 inline-flex items-center px-3 py-3 mt-4 sm:mt-6 font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-slate-800 dark:bg-primary dark:hover:bg-white dark:hover:text-slate-800"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
        {loading ? (
          <button
            disabled
            className="inline-flex items-center px-3 py-3 mt-4 sm:mt-6 font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-slate-800 dark:bg-primary dark:hover:bg-white dark:hover:text-slate-800"
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
            Processing your order please wait...
          </button>
        ) : (
          <button
            onClick={submitData}
            className="col-span-1 inline-flex items-center px-3 py-3 mt-4 sm:mt-6 font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-slate-800 dark:bg-primary dark:hover:bg-white dark:hover:text-slate-800"
          >
            <span>Proceed to Payment</span>
            <ChevronRight className="w-5 h-5 mr-2" />
          </button>
        )}
      </div>
    </div>
  );
}
