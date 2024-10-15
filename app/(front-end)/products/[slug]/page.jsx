import AddToCartButton from "@/components/frontend/AddToCartButton";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CategoryCarousel from "@/components/frontend/CategoryCarousel";
import ProductImageCarousel from "@/components/frontend/ProductImageCarousel";
import ProductReview from "@/components/frontend/productreview/ProductReview";
import ProductReviewForm from "@/components/frontend/productreview/ProductReviewForm";
import ProductShareButton from "@/components/frontend/ProductShareButton";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import {
  BaggageClaim,
  Minus,
  Plus,
  Send,
  Share2,
  Star,
  Tag,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductDetailPage({ params: { slug } }) {
  const product = await getData(`/products/product/${slug}`);
  const productReviews = await getData(`review/product/${product?.id}`);

  const catId = product.categoryId;
  const category = await getData(`categories/${catId}`);
  const categoryProducts = category.products;
  const similarProducts = categoryProducts.filter(
    (similarProduct) => similarProduct.id !== product.id
  );

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user?.id;

  const userData = userId ? await getData(`users/${userId}`) : null;
  console.log("userData:", userData);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlToShare = `${baseUrl}/products/${slug}`;
  return (
    <div className="container py-4">
      <Breadcrumb />
      <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
        <div className="md:col-span-4 col-span-1">
          <ProductImageCarousel
            productImages={product.productImages}
            thumbnail={product.imageUrl}
          />
        </div>
        <div className="md:col-span-5 col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-medium">{product.title}</h2>
            <ProductShareButton urlToShare={urlToShare} />
          </div>
          <div className="border-b border-gray-500">
            <p className="py-2">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>SKU: {product.sku}</p>
            <p className="bg-primary text-white py-1.5 px-4 rounded">
              <b>Stock: </b>
              {product.productStock}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              <span>
                <Star />
              </span>
              <span>
                <Star />
              </span>
              <span>
                <Star />
              </span>
              <span>
                <Star />
              </span>
              <span>
                <Star />
              </span>
            </div>
            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
          </div>
          <div className="flex items-center gap-4 pt-4 border-b border-gray-500 pb-4">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-2xl">$ {product.salePrice}</h4>
              <del className="text-slate-400 text-sm">
                $ {product.productPrice}
              </del>
            </div>
            {/* <p className="flex items-center">
              <Tag className="w-5 h-5 text-slate-400 me-2" />
              <span>Save 50% right now</span>
            </p> */}
          </div>
          <div className="flex justify-between items-center py-6">
            <AddToCartButton product={product} />
          </div>
        </div>
        <div className="md:col-span-3 col-span-1 sm:block hidden bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden">
          <h2 className="bg-primary text-white py-3 px-6 font-semibold">
            Delivery & Returns
          </h2>
          <div className="p-4">
            <div className="flex rounded-lg py-2 px-4 bg-primary text-white items-center gap-3">
              <span>PrintSix Express</span>
              <Send />
            </div>
            <div className="py-3 text-slate-100 border-b border-gray-500">
              Eligible for Free Delivery <Link href={"#"}>View Details</Link>
            </div>
            <h2 className="text-slate-200 py-2">Choose your Location</h2>
            <div className="pb-3">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="pb-3">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div className="bg-white dark:bg-slate-700 p-4 my-8 rounded-xl">
          <h2 className="mb-4 text-xl font-semibold text-slate-200 ml-3">
            Similar Products
          </h2>
          <CategoryCarousel products={similarProducts} />
        </div>
      )}
      <ProductReviewForm
        product={product}
        productReviews={productReviews ? productReviews : []}
        userId={userId}
        userData={userData}
      />
    </div>
  );
}
