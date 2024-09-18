import OrderCard from "@/components/Order/OrderCard";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { id } }) {
  const order = await getData(`orders/${id}`);
  return <OrderCard order={order} />;
}
