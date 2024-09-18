import { Heart, Search, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import Product from "./Product";

export default function NewArivals({ products }) {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-primary uppercase mb-6">
        Top New Arrivals
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {products.slice(0, 8).map((product, i) => {
          return <Product product={product} key={i} />;
        })}
      </div>
    </div>
  );
}
