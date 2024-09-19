import FormHeader from "@/components/backoffice/FormHeader";
import NewCategoryForm from "@/components/backoffice/forms/NewCategoryForm";
import { getData } from "@/lib/getData";

export default async function NewCategory() {
  const categoriesData = await getData("categories");
  const parentCategories = categoriesData.filter(
    (category) => category.parentId === null
  );

  const categories = parentCategories.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });

  categories.unshift({
    id: "",
    title: "No Parent Category",
  });

  return (
    <div>
      <FormHeader title={"New Category"} />
      <NewCategoryForm categories={categories} />
    </div>
  );
}
