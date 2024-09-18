import { getData } from "@/lib/getData";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({ params: { id } }) {
  const order = await getData(`orders/${id}`);
  const { orderItems } = order;
  const subTotal = orderItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const shippingCost = order.shippingCost;
  const tax = 20;
  const total = (
    parseFloat(subTotal) +
    parseFloat(shippingCost) +
    parseFloat(tax)
  ).toFixed(2);

  return (
    <section className="dark:bg-slate-950 bg-slate-50">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-3xl mx-auto">
          <div className="relative mt-6 mb-6 overflow-hidden bg-white dark:bg-slate-700 rounded-lg shadow md:mt-10">
            <div className="absolute top-4 right-4">
              <Link
                href={`/dashboard/orders/${id}/invoice`}
                type="button"
                className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold text-white transition-all duration-200 bg-primary border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-white hover:text-gray-900"
              >
                View invoice
              </Link>
            </div>

            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="-my-8 divide-y divide-gray-200">
                <div className="pt-16 pb-8 text-center sm:py-8">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-primary" />

                  <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-lime-50">
                    We received your order!
                  </h1>
                  <p className="mt-2 text-sm font-normal text-gray-600 dark:text-slate-300">
                    Your order No is #{order.orderNumber}
                  </p>
                </div>

                <div className="py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-20">
                    <div>
                      <h2 className="font-bold tracking-widest text-white uppercase dark:text-white">
                        Shipping Address
                      </h2>
                      <p className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-300"></p>
                      <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {order.streetAddress1}
                        {order.streetAddress2
                          ? ", " + order.streetAddress2
                          : ""}{" "}
                        {order.city}, {order.state}, {order.country},{" "}
                        {order.zipcode}
                      </p>
                    </div>

                    <div>
                      <h2 className="font-bold tracking-widest text-white uppercase dark:text-white">
                        Billing Address
                      </h2>
                      <p className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-300"></p>
                      <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {order.billingStreetAddress1}
                        {order.billingStreetAddress2
                          ? ", " + order.billingStreetAddress2
                          : ""}{" "}
                        {order.billingCity}, {order.billingState},{" "}
                        {order.billingCountry}, {order.billingZipcode}
                      </p>
                    </div>

                    <div>
                      <h2 className="font-bold tracking-widest text-white uppercase dark:text-white">
                        Payment Info
                      </h2>
                      <p className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {order.paymentMethod}
                      </p>
                      {/* <p className="mt-1 text-sm font-medium text-gray-600">
                        VISA
                        <br />
                        **** 4660
                      </p> */}
                    </div>
                  </div>
                </div>

                <div className="py-8">
                  <h2 className="font-bold tracking-widest text-white uppercase dark:text-white">
                    Order Items
                  </h2>

                  <div className="flow-root mt-8">
                    <ul className="divide-y divide-gray-200 -my-7">
                      {orderItems.length > 0 &&
                        orderItems.map((item, i) => {
                          return (
                            <li
                              key={i}
                              className="flex items-start justify-between space-x-5 py-7 md:items-stretch"
                            >
                              <div className="flex items-stretch">
                                <div className="flex-shrink-0">
                                  <Image
                                    width={200}
                                    height={200}
                                    className="object-cover w-20 h-20 rounded-lg"
                                    src={item.imageUrl}
                                    alt={item.title}
                                  />
                                </div>

                                <div className="flex flex-col justify-between ml-5 w-44">
                                  <p className="flex-1 text-sm font-bold text-gray-900 dark:text-gray-300">
                                    {item.title}
                                  </p>
                                  {/* <p className="mt-1.5 text-sm font-medium text-gray-500">
                                    Golden
                                  </p> */}
                                </div>
                              </div>

                              <div className="ml-auto">
                                <p className="text-sm font-bold text-right text-gray-900 dark:text-gray-300">
                                  ${item.price}
                                </p>
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>

                <div className="py-8">
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Sub total
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        ${subTotal}
                      </p>
                    </li>
                    <li className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Shipping cost
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        ${shippingCost}
                      </p>
                    </li>
                    <li className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Tax
                      </p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        ${tax}
                      </p>
                    </li>
                    <li className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        Total
                      </p>
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        ${total}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
