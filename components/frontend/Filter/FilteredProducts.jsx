import React from "react";
import Product from "../Product";
import Paginate from "./Paginate";

export default function FilteredProducts({ products = [], totalPages = 0 }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, i) => {
          return (
            <Product
              product={product}
              key={product.id}
              reviews={product.reviews}
            />
          );
        })}
      </div>
      <div className="mt-8">
        <Paginate totalPages={totalPages} />
      </div>
    </div>
  );
}
