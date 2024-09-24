import { CircleDollarSign, Headset, Truck } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function SupportSection() {
  return (
    <div className="container py-16">
      <div className="w-10/12 grid md:grid-cols-3 sm:grid-cols-1 gap-6 mx-auto justify-center">
        <div className="bg-primary border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <Truck className="w-12 h-12" />
          <div>
            <h4 className="font-medium capitalize text-lg">Free Shipping</h4>
            <p className="text-sm">Order Over $200</p>
          </div>
        </div>

        <div className="bg-primary border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <CircleDollarSign className="w-12 h-12" />
          <div>
            <h4 className="font-medium capitalize text-lg">Money Returns</h4>
            <p className="text-sm">30 Days Money Returns</p>
          </div>
        </div>

        <div className="bg-primary border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <Headset className="w-12 h-12" />
          <div>
            <h4 className="font-medium capitalize text-lg">24/7 Support</h4>
            <p className="text-sm">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
