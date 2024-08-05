"use client";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import React, {useEffect, useState} from "react";
import {fetchDataFromApi} from "../../../../utils/api";
import useSWR from "swr";

const maxResult = 6;

const Category = (slug) => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  // console.log(slug.params.slug);
  useEffect(() => {
    if (slug.params.slug) {
      fetchCategoryAndProducts();
    }
  }, [slug.params.slug, pageIndex]);

  const fetchCategoryAndProducts = async () => {
    const categoryData = await fetchDataFromApi(
      `/api/categories?filters[slug][$eq]=${slug.params.slug}`
    );
    setCategory(categoryData);
    // console.log(category);
    const productsData = await fetchDataFromApi(
      `/api/products?populate=*&[filters][categories][slug][$eq]=${slug.params.slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`
    );
    setProducts(productsData);
  };

  useEffect(() => {
    setPageIndex(1);
  }, [slug]);

  const {data, error, isLoading} = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug.params.slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    {
      fallbackData: products,
    }
  );

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category?.data?.[0]?.attributes?.name}
            {/* {slug.params.slug} */}
          </div>
        </div>
        {/* <h2>{products?.data?.[0]?.attributes?.name}</h2> */}

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
        {/* products grid end */}

        {/* PAGINATION BUTTONS START */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* PAGINATION BUTTONS END */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;

// export async function getStaticPaths() {
//   const category = await fetchDataFromApi("/api/categories?populate=*");

//   const paths = category.data.map((c) => ({
//     params: {
//       slug: c.attributes.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// // `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps({params: {slug}}) {
//   const category = await fetchDataFromApi(
//     `/api/categories?filters[slug][$eq]=${slug}`
//   );
//   const products = await fetchDataFromApi(
//     `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}`
//   );

//   return {
//     props: {
//       category,
//       products,
//       slug,
//     },
//   };
// }
