import BannerForm from "@/components/backoffice/forms/BannerForm";
import FormHeader from "@/components/backoffice/FormHeader";

export default function NewBanner() {
  return (
    <div>
      <FormHeader title={"New Banner"} />
      <BannerForm />
    </div>
  );
}
