import CategoryList from "@/components/frontend/CategoryList";
import HomeBanner from "@/components/frontend/HomeBanner";
import Navbar from "@/components/frontend/Navbar";
import NewArivals from "@/components/frontend/NewArivals";
import ShopByCategory from "@/components/frontend/ShopByCategory";
import SupportSection from "@/components/frontend/SupportSection";
import VendorList from "@/components/frontend/VendorList";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter(
    (category) => category.products.length > 0 && category.parentId === null
  );

  const products = await getData("products");

  return (
    <div className="min-h-screen">
      <HomeBanner />
      <SupportSection />
      <ShopByCategory categories={categories} />
      <NewArivals products={products?.products} />
      {/* <Hero categories={categories}/> */}
      {/* <VendorList/> */}
      {/* {
        categories.map( (category, i) => {
          return(
            <div key={i} className="py-8">
              <CategoryList category={category}/>
            </div>
          )
        })
      } */}
    </div>
  );
}
