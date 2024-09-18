import React from "react";
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import ProductForm from "@/components/backoffice/forms/ProductForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function NewProduct() {
  // Categories and Farmers
  const categoriesData = await getData("categories");
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });

  // Getting logged in user id
  const session = await getServerSession(authOptions);
  if (!session) return;
  const vendor = {
    id: session?.user?.id,
    title: session?.user?.name,
  };

  return (
    <div>
      <FormHeader title={"New Product"} />
      <ProductForm categories={categories} vendor={vendor} />;
    </div>
  );
}
