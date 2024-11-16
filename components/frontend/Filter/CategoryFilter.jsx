import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function CategoryFilter({ categories = [], slug = "" }) {
  const parentCategories = useMemo(
    () => categories.filter((cat) => !cat.parentId),
    [categories]
  );
  const subCategories = useMemo(
    () => categories.filter((cat) => cat.parentId),
    [categories]
  );

  // Function to calculate total product count for a parent category
  const getTotalProductCount = (parentId) => {
    const parentCategory = parentCategories.find((cat) => cat.id === parentId);
    const childCategories = subCategories.filter(
      (sub) => sub.parentId === parentId
    );

    const childProductCount = childCategories.reduce(
      (sum, sub) => sum + sub.products.length,
      0
    );
    return parentCategory.products.length + childProductCount;
  };

  const loadedSubCategory = subCategories.find((cat) => cat.slug === slug);
  const initialParentId = loadedSubCategory ? loadedSubCategory.parentId : null;

  const [visibleCategory, setVisibleCategory] = useState(initialParentId);

  const toggleSubcategories = (parentId) => {
    setVisibleCategory(visibleCategory === parentId ? null : parentId);
  };

  return (
    <div>
      <h3 className="text-xl text-gray-800 mb-3 font-medium">Categories</h3>
      <div className="space-y-2">
        {parentCategories.map((parent) => (
          <div key={parent.id} className="mb-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/category/${parent.slug}`}
                className={
                  parent.slug === slug
                    ? "cursor-pointer text-primary"
                    : "cursor-pointer text-gray-600"
                }
                aria-label={`Filter by ${parent.title} category`}
              >
                {parent.title}
                <span
                  className={
                    parent.slug === slug
                      ? `ml-2 text-primary text-sm`
                      : `ml-2 text-gray-600 text-sm`
                  }
                >
                  ({getTotalProductCount(parent.id)})
                </span>
              </Link>
              {subCategories.some((sub) => sub.parentId === parent.id) && (
                <button
                  className="text-sm text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubcategories(parent.id);
                  }}
                  aria-expanded={visibleCategory === parent.id}
                >
                  {visibleCategory === parent.id ? (
                    <ChevronDown />
                  ) : (
                    <ChevronRight />
                  )}
                </button>
              )}
            </div>
            {visibleCategory === parent.id && (
              <div className="mt-2 space-y-2">
                {subCategories
                  .filter((sub) => sub.parentId === parent.id)
                  .map((sub) => (
                    <div key={sub.id} className="flex items-center">
                      <Link
                        href={`/category/${sub.slug}`}
                        className={
                          sub.slug === slug
                            ? "cursor-pointer text-primary"
                            : "cursor-pointer text-gray-600"
                        }
                        aria-label={`Filter by ${sub.title} subcategory`}
                      >
                        <span>
                          <ChevronRight className="inline-block" />
                          {sub.title}
                        </span>
                        <span
                          className={
                            sub.slug === slug
                              ? `ml-2 text-primary text-sm`
                              : `ml-2 text-gray-600 text-sm`
                          }
                        >
                          ({sub.products.length})
                        </span>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
