import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import React from "react";
import OrderItem from "./OrderItem";
import Link from "next/link";

export default function OrderCard({ order }) {
  const orderCreationDate = convertIsoDateToNormal(order.createdAt);

  const subTotal = order?.orderItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const shippingCost = order.shippingCost.toFixed(2);

  const finalSubTotal = (
    parseFloat(subTotal) + parseFloat(shippingCost)
  ).toFixed(2);

  if (order.orderItems.length === 0) {
    return null;
  }
  return (
    <>
      <li className="overflow-hidden bg-white border border-gray-200 rounded-md">
        <div className="lg:flex">
          <div className="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
            <div className="px-4 py-6 sm:p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
                <div>
                  <p className="font-bold text-gray-900 mt-0.5">Order Number</p>
                  <p className="text-gray-500 text-sm"> #{order.orderNumber}</p>
                </div>

                <div>
                  <p className="font-bold text-gray-900 mt-0.5">Order Date</p>
                  <p className="text-gray-500 text-sm "> {orderCreationDate}</p>
                </div>

                <div>
                  <p className="font-bold text-gray-900 mt-0.5">Price</p>
                  <p className="text-gray-500 text-sm "> ${subTotal}</p>
                </div>

                <div>
                  <p className="font-bold text-gray-900 mt-0.5">
                    Shipping Cost
                  </p>
                  <p className="text-gray-500 text-sm "> ${shippingCost}</p>
                </div>

                <div>
                  <p className="font-bold text-gray-900 mt-0.5">Total Amount</p>
                  <p className="text-gray-500 text-sm "> ${finalSubTotal}</p>
                </div>

                <div>
                  <p className="font-bold text-gray-900">Order Status</p>
                  <div className="mt-0.5 flex items-center text-sm">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-amber-400 mr-1.5">
                      <svg
                        className="w-2 h-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
            <ul className="space-y-7">
              {order.orderItems.length > 0
                ? order.orderItems.map((orderItem, i) => {
                    return <OrderItem key={i} orderItem={orderItem} />;
                  })
                : {}}
            </ul>

            <hr className="mt-8 border-gray-200" />

            <div className="flex items-center mt-8 space-x-5">
              <Link
                href={`/dashboard/orders/${order.id}/invoice`}
                className="inline-flex items-center justify-center px-4 py-2.5 text-white transition-all duration-200 bg-lime-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View Invoice
              </Link>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
