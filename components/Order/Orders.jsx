import React from "react";
import OrderCard from "./OrderCard";

export default function Orders({ orders }) {
  return (
    <section className="md:py-16 py-4 bg-slate-800 text-gray-50">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <ul className="space-y-5 sm:space-y-6 lg:space-y-10">
            {orders.length > 0 ? (
              orders.map((order, i) => {
                return <OrderCard key={i} order={order} />;
              })
            ) : (
              <li>You have not make any order yet</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
