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
    <Carousel
      autoplay
      defaultControlsConfig={config}
      className="rounded-md overflow-hidden"
      showArrows
    >
      {/* {banners.map((banner) => {
        <div
          key={banner.id} // Always add a unique key when mapping over items
          className="bg-cover bg-no-repeat bg-center py-36 w-full"
          style={{
            backgroundImage: `url(/upload/bannerimage/${banner.image})`,
          }}
        >
          <div className="container">
            <h1 className="text-6xl text-white font-medium mb-4 capitalize">
              Increase print profits <br /> by lowering costs.
            </h1>
            <p className="text-primary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nulla
              <br /> saepe blanditiis vitae officiis alias facere laudantium
              reprehenderit et id quae porro nam aperiam placeat illum delectus,
              tenetur esse! Quod!
            </p>
            <div className="mt-12">
              <a
                href="/shop"
                className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>;
      })} */}

      <div
        className="bg-cover bg-no-repeat bg-center py-36 w-full"
        style={{
          backgroundImage: `url(/upload/bannerimage/home-banner-one.jpg)`,
        }}
      >
        <div className="container">
          <h1 className="text-6xl text-white font-medium mb-4 capitalize">
            Increase print profits <br /> by lowering costs.
          </h1>
          <p className="text-primary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nulla
            <br /> saepe blanditiis vitae officiis alias facere laudantium
            reprehenderit et id quae porro nam aperiam placeat illum delectus,
            tenetur esse! Quod!
          </p>
          <div className="mt-12">
            <a
              href="/shop"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
      {/* <Image
        src="/upload/bannerimage/home-banner-one.jpg"
        className="w-full"
        width={750}
        height={556}
        alt="Vegetables"
      />
      <Image
        src="/upload/bannerimage/home-banner-two.jpg"
        className="w-full"
        width={750}
        height={556}
        alt="Vegetables"
      />
      <Image
        src="/upload/bannerimage/home-banner-three.jpg"
        className="w-full"
        width={750}
        height={556}
        alt="Vegetables"
      />
      <Image
        src="/upload/bannerimage/home-banner-four.jpg"
        className="w-full"
        width={750}
        height={556}
        alt="Vegetables"
      /> */}
    </Carousel>
  );
}
