import Link from "next/link";

export default function CategoryFilter({ categories }) {

  return (
    <div>
      <h3 className="text-xl text-gray-800 mb-3 font-medium">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => {

          const isSelected = false

          return (
            <div className="flex items-center" key={category.slug}>
              {/* <input
                type="checkbox"
                id="cat-1"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              /> */}
              <Link
                href={`/category/${category.slug}`}
                className={`cursor-pointer text-gray-600`}
                onClick={() => handleCategoryClick(category.slug)} // Update selected category on click
                aria-label={`Filter by ${category.title} category`}
              >
                {category.title}
              </Link>
              <div className="ml-auto text-gray-600 text-sm">
                ({category.products.length})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
