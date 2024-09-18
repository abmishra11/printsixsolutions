import React from "react";
import AdminDashboardNotification from "./notifications/AdminDashboardNotification";
import VendorDashboardNotification from "./notifications/VendorDashboardNotification";
import UserDashboardNotification from "./notifications/UserDashboardNotification";

export default function DashboardNotifications({ user }) {
  const role = user.role;
  if (role === "ADMIN") {
    const outOfStockProducts = [];
    return (
      <AdminDashboardNotification outOfStockProducts={outOfStockProducts} />
    );
  }
  if (role === "VENDOR") {
    return <VendorDashboardNotification />;
  }
  if (role === "USER") {
    return <UserDashboardNotification />;
  }
}
