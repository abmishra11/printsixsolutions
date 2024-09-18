import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Carousel } from "nuka-carousel";
import React from "react";

export default function HeroCarousel() {
  const config = {
    nextButtonClassName: "rounded-full",
    nextButtonText: <ChevronRight />,
    pagingDotsClassName: "me-2 w-4 h-4",
    prevButtonClassName: "rounded-full",
    prevButtonText: <ChevronLeft />,
  };
  return (
    <Carousel
      autoplay
      defaultControlsConfig={config}
      className="rounded-md overflow-hidden"
      showArrows
    >
      <Image
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
      />
    </Carousel>
  );
}
