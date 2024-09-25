"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Carousel } from "nuka-carousel";
import React from "react";

export default function HomeBanner() {
  const config = {
    nextButtonClassName: "rounded-full",
    nextButtonText: <ChevronRight />,
    pagingDotsClassName: "me-2 w-4 h-4",
    prevButtonClassName: "rounded-full",
    prevButtonText: <ChevronLeft />,
  };

  const banners = [
    {
      id: 1,
      image: "/upload/bannerimage/home-banner-one.jpg",
      title: "Increase print profits <br /> by lowering costs.",
      description:
        "With our help, you can reduce your printing costs and maximize your profit margin.",
    },
    {
      id: 2,
      image: "/upload/bannerimage/home-banner-two.jpg",
      title: "Increase print profits <br /> by lowering costs.",
      description:
        "With our help, you can reduce your printing costs and maximize your profit margin.",
    },
    {
      id: 3,
      image: "/upload/bannerimage/home-banner-three.jpg",
      title: "Increase print profits <br /> by lowering costs.",
      description:
        "With our help, you can reduce your printing costs and maximize your profit margin.",
    },
    {
      id: 4,
      image: "/upload/bannerimage/home-banner-four.jpg",
      title: "Increase print profits <br /> by lowering costs.",
      description:
        "With our help, you can reduce your printing costs and maximize your profit margin.",
    },
  ];

  return (
    <div
      className="bg-cover bg-no-repeat bg-center w-full"
      style={{
        backgroundImage: `url(/upload/bannerimage/home-banner-one.jpg)`,
      }}
    >
      <div className="container lg:py-36 md:py-36 py-8">
        <h1 className="lg:text-6xl md:text-4xl text-2xl text-white font-medium lg:mb-16 md:mb-16 mb-4 capitalize">
          Increase print profits <br /> by lowering costs
        </h1>
        <p className="text-primary lg:mb-16 md:mb-16 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nulla
          <br /> saepe blanditiis vitae officiis alias sit amet consectetur
          adipisicing elit
        </p>
        <div>
          <a
            href="/shop"
            className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
