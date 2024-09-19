import React from "react";
import BannerForm from "@/components/backoffice/forms/BannerForm";
import FormHeader from "@/components/backoffice/FormHeader";
import { getData } from "@/lib/getData";

export default async function UpdateBanner({ params: { id } }) {
  const banner = await getData(`banners/${id}`);
  return (
    <div>
      <FormHeader title={"Update Banner"} />
      <BannerForm updateData={banner} />
    </div>
  );
}
