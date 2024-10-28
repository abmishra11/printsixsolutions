import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CustomerProfile({ userProfile }) {
  console.log("User Profile", userProfile);

  return (
    <div className="min-h-screen dark:bg-slate-900 flex flex-col">
      <div className="">
        <div className="dark:bg-slate-800 dark:text-slate-50 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="w-full md:w-1/4 p-4 border-r">
              <div className="flex flex-col items-center">
                <Image
                  src={userProfile?.profile?.profileImageUrl}
                  alt="Profile"
                  className="rounded-full w-32 h-32 object-cover"
                  width={200}
                  height={200}
                />
                <Link
                  href={"/dashboard/customer/profile"}
                  className="py-2 px-4 bg-primary text-white rounded-md mt-4"
                >
                  Update Profile Info
                </Link>
              </div>
            </div>

            {/* Profile Details */}
            <div className="w-full md:w-3/4 p-6">
              {/* Personal Details */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <p className="text-lg font-medium">{userProfile?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <p className="text-lg font-medium">
                      {userProfile?.profile?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Phone Number
                    </label>
                    <p className="text-lg font-medium">
                      {userProfile?.profile?.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Date of Birth
                    </label>
                    <p className="text-lg font-medium">
                      {convertIsoDateToNormal(
                        userProfile?.profile?.dateOfBirth
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
