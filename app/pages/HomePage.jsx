"use client";
import Image from "next/image";
import {
  ChevronRightIcon,
  DocumentCheckIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Spinner } from "@nextui-org/react";
import ProductCard from "../components/ProductCard";
import ProductSaleInfo from "../components/ProductSaleInfo";
import BrowseCategory from "../components/BrowseCategory";
import { useState, useEffect, Suspense } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [productsLength, setProductsLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState(10);

  const fetchAllProducts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProductsLength(data.length);
      setProducts(data.slice(0, displayedProducts));
    } catch (error) {
      setError("Error fetching products");
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [displayedProducts]);

  const handleViewMore = () => {
    setDisplayedProducts(displayedProducts + 10); // Increase the number of displayed products
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-4 md:max-xl:mx-10 xl:mx-20">
      <div className="flex justify-center gap-x-4 pt-8">
        <div className="">
          <img src="/shopbn1.svg" className="h-72 md:h-[500px] w-auto" />
        </div>
      </div>
      {!loading && products.length > 0 ? (
        <div>
          <div className="bg-gray-50 px-4 py-2 rounded-lg">
            <ProductSaleInfo tag="Today's" tagInfo="Flash Sales" />
          </div>
          <div className="py-8 border-b">
            <ProductCard products={products} />
            {productsLength > displayedProducts && (
              <div className="flex justify-center">
                <Button
                  onClick={handleViewMore}
                  radius="sm"
                  className="bg-red-500 text-white px-12"
                >
                  View More Products
                </Button>
              </div>
            )}
          </div>

          <div className="max-lg:hidden py-8">
            <ProductSaleInfo tag="Categories" tagInfo="Browse By Categories" />
            <div className="flex items-center justify-center py-8 gap-x-4 border-b">
              <BrowseCategory category="phone" categoryName="Phones" />
              <BrowseCategory category="computer" categoryName="Computers" />
              <BrowseCategory category="camera" categoryName="Cameras" />
              <BrowseCategory category="clock" categoryName="Clocks" />
              <BrowseCategory category="tv" categoryName="TV" />
              <BrowseCategory category="home" categoryName="Home" />
            </div>
          </div>

          <div>
            <div>
              <ProductSaleInfo
                tag="This month"
                tagInfo="Best Selling Product"
              />
            </div>

            <div className="py-8 border-b">
              <div>
                <ProductCard products={products} />
                {productsLength > displayedProducts && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleViewMore}
                      radius="sm"
                      className="bg-red-500 text-white px-12"
                    >
                      View More Products
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <ProductSaleInfo
                tag="Our Products"
                tagInfo="Explore Our Products"
              />
            </div>
            <div className="py-8 border-b">
              <ProductCard products={products} />
              {productsLength > displayedProducts && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleViewMore}
                    radius="sm"
                    className="bg-red-500 text-white px-12"
                  >
                    View More Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-60">
          <Spinner
            label="Loading Products..."
            color="danger"
            labelColor="danger"
          />
        </div>
      )}

      <div className="flex flex-col max-md:gap-y-4 sm:flex-row justify-center gap-x-8 py-8">
        <div className="flex flex-col items-center">
          <div className="bg-black w-fit border-8 border-gray-300 p-2 rounded-full">
            <TruckIcon className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col items-center mt-2">
            <p className="text-sm font-semibold">FREE AND FAST DELIVERY</p>
            <p className="text-xs font-semibold">
              Free delivery for all orders over $140
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-black w-fit border-8 border-gray-300 p-2 rounded-full">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col items-center mt-2">
            <p className="text-sm font-semibold">24/7 CUSTOMER SERVICE</p>
            <p className="text-xs font-semibold">
              Friendly 24/7 customer support
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-black w-fit border-8 border-gray-300 p-2 rounded-full">
            <DocumentCheckIcon className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col items-center mt-2">
            <p className="text-sm font-semibold">MONEY BACK GUARANTEE</p>
            <p className="text-xs font-semibold">
              We return money within 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
