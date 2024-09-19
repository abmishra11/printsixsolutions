import Footer from "@/components/frontend/Footer"
import HomeBanner from "@/components/frontend/HomeBanner"
import Navbar from "@/components/frontend/Navbar"
import { getData } from "@/lib/getData"
import React from "react"
export default async function Layout({ children }) {
  const categoriesData = await getData("categories")
  const categories = categoriesData.filter((category) => category.products.length > 0)
  return (
    <div>
      <Navbar categories={categories} />
      <div className="">
      {children}
      </div>
      <Footer />
    </div>
  )
}
