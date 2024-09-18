import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";
import Orders from "@/components/Order/Orders";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session?.user?.id;
  const role = session?.user?.role;

  const orders = await getData("orders");
  if (orders.length === 0 || !orders) {
    return <p>You have not make any order yet</p>;
  }
  const userOrders = orders.filter((order) => order.userId === userId);

  return (
    <div className="py-8">
      {role === "USER" ? (
        <Orders orders={userOrders} />
      ) : (
        <p>You have not make any order yet</p>
      )}
    </div>
  );
}
