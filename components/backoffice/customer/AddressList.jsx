"use client";
import React from "react";
import { useState } from "react";
import AddressCard from "./AddressCard";
import Link from "next/link";
import { makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function AddressList({ addressesArr }) {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState(addressesArr);

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/customer/addresses");
  }

  const handleSetDefaultBilling = (id) => {
    const filteredAddress = addresses.filter((address) => address.id === id);
    const updateData = {
      userId: filteredAddress.userId,
      streetAddress1: filteredAddress.streetAddress1,
      streetAddress2: filteredAddress.streetAddress2,
      city: filteredAddress.city,
      state: filteredAddress.state,
      zipcode: filteredAddress.zipcode,
      country: filteredAddress.country,
      defaultShipping: filteredAddress.defaultShipping,
      defaultBilling: true,
    };
    try {
      makePutRequest(
        setLoading,
        `api/customer/address/${id}`,
        updateData,
        "Customer Address",
        redirect
      );
      const updatedAddresses = addresses.map((address) => ({
        ...address,
        defaultBilling: address.id === id,
      }));

      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error in setting default billing address", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultShipping = (id) => {
    const filteredAddress = addresses.filter((address) => address.id === id);
    const updateData = {
      userId: filteredAddress.userId,
      streetAddress1: filteredAddress.streetAddress1,
      streetAddress2: filteredAddress.streetAddress2,
      city: filteredAddress.city,
      state: filteredAddress.state,
      zipcode: filteredAddress.zipcode,
      country: filteredAddress.country,
      defaultShipping: true,
      defaultBilling: filteredAddress.defaultBilling,
    };
    try {
      makePutRequest(
        setLoading,
        `api/customer/address/${id}`,
        updateData,
        "Customer Address",
        redirect
      );
      const updatedAddresses = addresses.map((address) => ({
        ...address,
        defaultShipping: address.id === id,
      }));
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error in setting default billing address", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = (id) => {
    // Logic to edit address
    console.log("Editing address with ID:", id);
  };

  const handleDeleteAddress = (id) => {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const res = fetch(`${baseUrl}/api/customer/address/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            setLoading(false);
            toast.success(`Address Deleted Successfully`);
            router.push("/dashboard/customer/addresses");
          }
        } catch (error) {
          console.error("Error in deleting address", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <div>
      <div className="flex flex-1 justify-between">
        <div>
          <h2 className="mb-4">Addresses</h2>
        </div>
        <div>
          <Link
            href={"/dashboard/customer/addresses/new"}
            className="bg-lime-500 text-white py-2 px-4 rounded"
          >
            Add New Address
          </Link>
        </div>
      </div>
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onSetDefaultBilling={handleSetDefaultBilling}
            onSetDefaultShipping={handleSetDefaultShipping}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
          />
        ))
      ) : (
        <p className="text-center">You have not added any addresses yet</p>
      )}
    </div>
  );
}
