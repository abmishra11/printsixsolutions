import React from "react";
import CartProduct from "./CartProduct";
import EmptyCart from "./EmptyCart";

export default function CartItems({ cartItems }) {
  return (
    <>
      {cartItems.length > 0 && (
        <>
          <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>
          <div className="flex items-center justify-between border-b border-slate-400 text-white pb-3 font-semibold text-sm mb-3">
            <h2 className="uppercase">Product</h2>
            <h2 className="uppercase">Quantity</h2>
            <h2 className="uppercase">Price</h2>
          </div>
        </>
      )}
      <div className="">
        <div className="">
          {cartItems.length > 0 ? (
            cartItems.map((item, i) => {
              return <CartProduct cartItem={item} key={i} />;
            })
          ) : (
            <EmptyCart />
          )}
        </div>
        {/* Coupon Form */}
        <div className="flex items-center gap-2 py-8">
          <input
            type="text"
            id="email-address-icon"
            className="bg-white border border-primary text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-1/2 ps-10 p-2.5 placeholder-gray-400"
            placeholder="name@flowbite.com"
          />
          <button className="py-2.5 px-4 rounded-lg bg-primary shrink-0">
            Apply Coupon
          </button>
        </div>
      </div>
    </>
  );
}
