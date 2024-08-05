"use client";
import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";

import Image from "next/image";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const HeroBanner = () => {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div onClick={clickHandler}>
            <MdOutlineKeyboardArrowLeft className="absolute right-[52px] md:right-[72px] bottom-[10px] z-10 w-[50px] md:w-[70px] h-[30px] md:h-[50px] bg-black cursor-pointer hover:opacity-90" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div onClick={clickHandler} className="">
            <MdOutlineKeyboardArrowRight className="absolute right-0 md:right-0 bottom-[10px] z-10 w-[50px] md:w-[70px] h-[30px] md:h-[50px] bg-black cursor-pointer hover:opacity-90" />
          </div>
        )}
      >
        <div>
          <Image
            src="/slide-1.png"
            alt="slide-1"
            width={1360}
            height={70}
            quality={100}
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="font-oswald px-[15px] md:px-[40px] py-[10px] md:py-[25px] text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90 bg-white absolute bottom-[25px] md:bottom-[75px] left-0">
            Shop now
          </div>
        </div>
        <div>
          <Image
            src="/slide-2.png"
            alt="slide-2"
            width={1360}
            height={70}
            quality={100}
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="font-oswald px-[15px] md:px-[40px] py-[10px] md:py-[25px] text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90 bg-white absolute bottom-[25px] md:bottom-[75px] left-0">
            Shop now
          </div>
        </div>
        <div>
          <Image
            src="/slide-3.png"
            alt="slide-3"
            width={1360}
            height={70}
            quality={100}
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="font-oswald px-[15px] md:px-[40px] py-[10px] md:py-[25px] text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90 bg-white absolute bottom-[25px] md:bottom-[75px] left-0">
            Shop now
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
