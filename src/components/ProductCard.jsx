import Image from "next/image";
import Link from "next/link";
import React from "react";
import {getDiscountPricePercentage} from "../../utils/helper";
import {API_URL, STRAPI_API_TOKEN} from "../../utils/urls";

const ProductCard = ({data: {attributes: p, id}}) => {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${p?.thumbnail?.data?.attributes?.url}`}
        // src={`${API_URL}${p?.thumbnail?.data?.attributes?.url}`}
        // src={`http://127.0.0.1:1337${p?.thumbnail?.data?.attributes?.url}`}
        alt={p.name}
      />

      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{p.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">${p.price}</p>
          {p.original_price && (
            <>
              <p className="text-base font-medium line-through">
                ${p.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountPricePercentage(p.original_price, p.price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
