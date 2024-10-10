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
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <p>
            Address:
            {" " + streetAddress1}
            {streetAddress2 && ", " + streetAddress2}, {city}, {state},{" "}
            {zipcode}, {country}
          </p>
        </div>
        <div>
          <Link
            href={`/dashboard/customer/addresses/${address.id}`}
            className="bg-primary text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
          >
            Edit
          </Link>

          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => onDelete(address.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Default Labels */}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mb-4">
          {defaultBilling ? (
            <span className="bg-primary text-white px-4 py-2 rounded mr-2">
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
            <span className="bg-primary text-white px-4 py-2 rounded">
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
        </div>
      </div>
    </div>
  );
}
