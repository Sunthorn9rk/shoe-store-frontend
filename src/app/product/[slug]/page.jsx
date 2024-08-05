"use client";
import React, {useEffect, useState} from "react";
import Wrapper from "@/components/Wrapper";
import {IoMdHeartEmpty} from "react-icons/io";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelateProducts from "@/components/RelateProducts";
import {fetchDataFromApi} from "../../../../utils/api";
import {getDiscountPricePercentage} from "../../../../utils/helper";
import ReactMarkdown from "react-markdown";
import {useSelector, useDispatch} from "react-redux";
import {addToCart} from "../../../../store/cartSlice";

import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = (slug) => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const p = product?.data?.[0]?.attributes;
  const [selectedSize, setSelectedsize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (slug.params.slug) {
      fetchProductDetails();
    }
  }, [slug.params.slug]);

  const fetchProductDetails = async () => {
    const productData = await fetchDataFromApi(
      `/api/products?populate=*&filters[slug][$eq]=${slug.params.slug}`
    );

    setProduct(productData);

    const ProductsData = await fetchDataFromApi(
      `/api/products?populate=*&filters[slug][$ne]=${slug.params.slug}`
    );

    setProducts(ProductsData);
  };

  if (!product) return <div>Loading...</div>;

  // console.log(product?.data?.[0]?.attributes?.name);
  // console.log(product?.data?.[0]?.attributes?.image?.data?.[0]?.attributes?.url);
  // console.log(products?.data?.[0]?.attributes?.name);
  // {
  //   products?.data?.map((product) => console.log(product.attributes?.name));
  // }

  const renderDescription = (description) => {
    return description?.map((item, index) => {
      if (item.type === "paragraph") {
        return (
          <p key={index}>
            {item.children.map((child, childIndex) => {
              if (child.type === "text") {
                if (child.bold) {
                  return <strong key={childIndex}>{child.text}</strong>;
                }
                return child.text;
              }
              return null;
            })}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p?.image?.data} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p?.name}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5">{p?.subtitle}</div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center text-black/[0.5]">
              <p className="mr-2 text-lg font-semibold">${p?.price}</p>
              {p?.original_price && (
                <>
                  <p className="text-base font-medium line-through">
                    ${p?.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountPricePercentage(p?.original_price, p?.price)}%
                    off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className=" text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* PRODUCT SIZE RANGE START */}
            <div className="mb-10">
              {/* HEADING START */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-medium">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* HEADING END */}

              {/* SIZE START */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p?.size?.data?.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedsize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item?.size}
                  </div>
                ))}
                {/* <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6.6
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 7
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 7.5
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 8
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 8.5
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 9
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 9.5
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 10
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 10.5
                </div>
                <div className="border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50">
                  UK 11
                </div> */}
              </div>
              {/* SIZE END */}

              {/* SHOW ERROR START */}
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
              {/* SHOW ERROR END */}
            </div>
            {/* PRODUCT SIZE RANGE END */}

            {/* ADD TO CART BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      selectedSize,
                      oneQuantityPrice: p.price,
                    })
                  );
                  notify();
                }
              }}
            >
              Add to Cart
            </button>
            {/* ADD TO CART BUTTON END */}

            {/* WHISHLIST BUTTON START */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* WHISHLIST BUTTON END */}

            {/* DETAIL PRODUCT START */}
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                {renderDescription(p?.description)}
              </div>
              {/* <div className="markdown text-md mb-5">
                Feel unbeatable from the tee box to the final putt in a design
                is pure early MJ: speed, class and laden with true early '90s
                touches like visible Air and a translucent rubber sole that
                continue to stand the test of time. This model fuses the strut
                of 1st MJ’s championship with some of our best golf technology,
                helping you make a statement of confidence when it comes time to
                tame the course.
              </div> */}
            </div>
            {/* DETAIL PRODUCT END */}
          </div>
          {/* right column end */}
        </div>

        <RelateProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

// export async function getStaticPaths() {
//   const products = await fetchDataFromApi("/api/products?populate=*");

//   const paths = products.data.map((p) => ({
//     params: {
//       slug: p.attributes.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// // `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps({params: {slug}}) {
//   const product = await fetchDataFromApi(
//     `/api/products?populate=*filters[slug][$eq]=${slug}`
//   );
//   const products = await fetchDataFromApi(
//     `/api/products?populate=*&[filters][slug][$ne]=${slug}`
//   );

//   return {
//     props: {
//       product,
//       products,
//     },
//   };
// }
