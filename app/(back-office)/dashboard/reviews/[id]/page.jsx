import OrderCard from "@/components/Order/OrderCard";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { id } }) {
  const review = await getData(`review/${id}`);
  console.log("review: ", review);
  
  // return <OrderCard order={order} />;
}
