import React from "react";
import SmallCard from "./SmallCard";
import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from "lucide-react";

export default function SmallCards({ orders }) {
  const status = {
    pending: "PENDING",
    processing: "PROCESSING",
    shipped: "SHIPPED",
    delivered: "DELIVERED",
    canceled: "CANCELED",
  };

  function getOrdersCountByStatus(status) {
    const filteredOrders = orders.filter(
      (order) => order.orderStatus === status
    );
    const count = filteredOrders.length.toString().padStart(2, "0");
    return count;
  }
  const orderCount = orders.length.toString().padStart(2, "0");
  const pendingOrdersCount = getOrdersCountByStatus(status.pending);
  const processingOrdersCount = getOrdersCountByStatus(status.processing);
  const deliveredOrdersCount = getOrdersCountByStatus(status.delivered);
  const orderStatus = [
    {
      title: "Total Order",
      numbers: orderCount,
      iconBg: "bg-green-600",
      icon: ShoppingCart,
    },
    {
      title: "Order Pending",
      numbers: pendingOrdersCount,
      iconBg: "bg-blue-600",
      icon: Loader2,
    },
    {
      title: "Order Processing",
      numbers: processingOrdersCount,
      iconBg: "bg-orange-600",
      icon: RefreshCcw,
    },
    {
      title: "Orders Delivered",
      numbers: deliveredOrdersCount,
      iconBg: "bg-purple-600",
      icon: CheckCheck,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-4 mb-4">
      {orderStatus.map((data, i) => {
        return <SmallCard data={data} key={i} className="mb-4" />;
      })}
    </div>
  );
}
