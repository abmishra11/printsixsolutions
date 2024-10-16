import Link from "next/link";
import React from "react";

export default function AddressCard({
  address,
  onSetDefaultBilling,
  onSetDefaultShipping,
  onEdit,
  onDelete,
}) {
  const {
    streetAddress1,
    streetAddress2,
    city,
    state,
    zipcode,
    country,
    defaultBilling,
    defaultShipping,
  } = address;

  return (
    <div className="bg-slate-800 shadow-md rounded-md p-4 mb-4">
      {/* Address Details */}
      <div className="grid grid-cols-2">
        <div className="md:col-span-1 col-span-2 flex items-center">
          <p>
            {streetAddress1}
            {streetAddress2 && ", " + streetAddress2}, {city}, {state},{" "}
            {zipcode}, {country}
          </p>
        </div>
        <div className="md:col-span-1 col-span-2 mt-4">
          <div className="flex flex-col md:flex-row gap-2">
            {defaultBilling ? (
              <span className="py-2 px-4 bg-lime-500 text-white rounded-md mb-2 text-center">
                Default Billing Address
              </span>
            ) : (
              <button
                className={`bg-green-500 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 ${
                  defaultBilling ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => onSetDefaultBilling(address.id)}
                disabled={defaultBilling}
              >
                {defaultBilling
                  ? "Billing Set"
                  : "Set as Default Billing Address"}
              </button>
            )}
            {defaultShipping ? (
              <span className="py-2 px-4 bg-lime-500 text-white rounded-md mb-2 text-center">
                Default Shipping Address
              </span>
            ) : (
              <button
                className={`bg-green-500 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 ${
                  defaultShipping ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => onSetDefaultShipping(address.id)}
                disabled={defaultShipping}
              >
                {defaultShipping
                  ? "Shipping Set"
                  : "Set as Default Shipping Address"}
              </button>
            )}
            <Link
              href={`/dashboard/customer/addresses/${address.id}`}
              className="bg-lime-500 text-white text-center py-2 px-4 rounded-md"
            >
              Edit
            </Link>

            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md"
              onClick={() => onDelete(address.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Default Labels */}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mb-4"></div>
      </div>
    </div>
  );
}
