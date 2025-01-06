import React from "react";
import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { DetailWidgetProps, AdminCustomer } from "@medusajs/framework/types";

const CustomerIDWidget = ({ data }: DetailWidgetProps<AdminCustomer>) => {
  console.log("Widget Props first name:", data?.first_name);
  return (
    <div className="p-4 border rounded bg-gray-50">
      <h4 className="text-lg font-semibold">Customer ID</h4>
      <p className="text-sm text-gray-700 mt-2">{data?.id}</p>
    </div>
  );
};

/* export const config = defineWidgetConfig({
  zone: "customer.details.before",
}); */

export default CustomerIDWidget;
