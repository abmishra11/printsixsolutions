import React from "react";
import Product from "../Product";
import Paginate from "./Paginate";

export default async function FilteredProducts({
  products = [],
  productCount,
}) {
  // Pagination
  const pageSize = 1;
  const totalPages = Math.ceil(productCount / pageSize);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, i) => {
          return (
            <Product product={product} key={i} reviews={product.reviews} />
          );
        })}
      </div>
      <div className="p-8 mx-auto flex items-center justify-center">
        {/* <Paginate totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
