import React from "react";
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import ProductForm from "@/components/backoffice/forms/ProductForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function UpdateProduct({ params: { id } }) {
  // Update data
  const product = await getData(`products/${id}`);

  // Categories and Farmers
  const categoriesData = await getData("categories");
  const categories = categoriesData.map((category) => category);

  // Getting logged in user id
  const session = await getServerSession(authOptions);
  if (!session) return;
  const vendor = {
    id: session?.user?.id,
    title: session?.user?.name,
  };
  return (
    <div>
      <FormHeader title={"Update Product"} />
      <ProductForm
        categories={categories}
        vendor={vendor}
        updateData={product}
      />
    </div>
  );
}
