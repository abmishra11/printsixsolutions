import Image from "next/image";
import Link from "next/link";
import React from "react";
//import Carousel from "react-multi-carousel";

export default function VendorsCarousel({ vendors }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };
  //   return (
  //     <Carousel
  //       swipeable={flase}
  //       draggable={flase}
  //       showDots={true}
  //       responsive={responsive}
  //       ssr={true}
  //       infinite={true}
  //       autoPlay={true}
  //       autoPlaySpeed={1000}
  //       keyBoardControl={true}
  //       customTransition="all .5"
  //       transitionDuration={500}
  //       containerClass="carousel-container"
  //       removeArrowOnDeviceType={["tablet", "mobile"]}
  //       dotListClass="custom-dot-list-style"
  //       itemClass="px-4"
  //     >
  //       {vendors.map((vendor, i) => {
  //         return (
  //           <Link
  //             key={i}
  //             href={`/vendor/${vendor.slug}`}
  //             className="rounded-lg mr-3 bg-red-400"
  //           >
  //             <Image
  //               src={""}
  //               alt={""}
  //               width={556}
  //               height={556}
  //               className="w-full rounded-2xl"
  //             />
  //             <h2 className="text-center dark:text-slate-200 text-slate-800 mt-2">
  //               {vendor.title}
  //             </h2>
  //           </Link>
  //         );
  //       })}
  //     </Carousel>
  //   );
}
