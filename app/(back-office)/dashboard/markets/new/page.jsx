import NewMarketForm from "@/components/backoffice/NewMarketForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page() {
  const categoriesData = await getData("categories");
  console.log("Fetched categories data:", categoriesData);

  const categories =
    categoriesData && categoriesData.length > 0
      ? categoriesData.map((category) => ({
          id: category.id,
          title: category.title,
        }))
      : [];

  return <NewMarketForm categories={categories} />;
}
