"use client";
import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import {API_URL, STRAPI_API_TOKEN} from "../../utils/urls";

const ProductDetailsCarousel = ({images}) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img) => (
          <img
            key={img.id}
            src={`${API_URL}${img.attributes.url}`}
            // src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${img.attributes.url}`}
            // src={`http://127.0.0.1:1337${img.attributes.url}`}
            // {`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${p?.thumbnail?.data?.attributes?.url}`}
            alt={img.attributes.name}
          />
        ))}
        {/* <img src="/p2.png" />
        <img src="/p3.png" />
        <img src="/p4.png" />
        <img src="/p5.png" />
        <img src="/p6.png" />
        <img src="/p7.png" /> */}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
