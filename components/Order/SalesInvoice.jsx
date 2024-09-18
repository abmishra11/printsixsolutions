"use client";
import Image from "next/image";
import React, { useRef } from "react";
import logo from "../../public/logo.png";
import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import { useReactToPrint } from "react-to-print";
export default function SalesInvoice({ order }) {
  const invoiceDate = convertIsoDateToNormal(order.createdAt);
  const subTotal =
    order.orderItems
      .reduce((acc, currentItem) => {
        return acc + currentItem.price * currentItem.quantity;
      }, 0)
      .toFixed(2) ?? 0;
  const shippingCost = order.shippingCost;
  const tax = 20.0;
  const total = (
    parseFloat(subTotal) +
    parseFloat(shippingCost) +
    parseFloat(tax)
  ).toFixed(2);

  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-end mb-8">
        <button
          onClick={handlePrint}
          type="button"
          className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold transition-all duration-200 dark:bg-gray-100 bg-slate-800 dark:text-gray-900 text-slate-200 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Download/Print Invoice
        </button>
      </div>
      <div ref={invoiceRef}>
        <div className="max-w-5xl mx-auto border border-gray-500 p-8 rounded-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800">
          {/* Header */}
          <div className="flex justify-between border-b border-gray-500 pb-8">
            <div className="flex flex-col">
              <h2>Bill From:</h2>
              <p>Print Six Solutions</p>
              <p>150 Eleign Street</p>
              <p>Canada</p>
              <p>printsix@gmail.com</p>
            </div>
            <Image src={logo} alt="limifood logo" className="w-36 h-16" />
          </div>
          {/* Header End */}
          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>Bill To:</h2>
              <p>{order.name}</p>
              <p>
                {order.billingStreetAddress1}
                {order.billingStreetAddress2
                  ? ", " + order.billingStreetAddress2
                  : ""}{" "}
                {order.city}, {order.state}, {order.country}, {order.zipcode}
              </p>
              <p>{order.email}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between gap-4">
                <p>Invoice #</p>
                <p>{order.orderNumber}</p>
              </div>
              <div className="flex justify-between gap-4">
                <p>Invoice Date</p>
                <p>{invoiceDate}</p>
              </div>
              <div className="flex justify-between gap-4">
                <p>Amount Due</p>
                <p>${total}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Cost
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, i) => {
                  const itemSubTotal = (item.price * item.quantity).toFixed(2);
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.title}
                      </th>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">${item.price}</td>
                      <td className="px-6 py-4">${itemSubTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="py-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="text-end">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>SubTotal</td>
                  <td>${subTotal}</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Tax</td>
                  <td>${tax}</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Shipping Cost</td>
                  <td>${shippingCost}</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
