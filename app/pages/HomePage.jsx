"use client";
import Image from "next/image";
import {
  ChevronRightIcon,
  DocumentCheckIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "@nextui-org/react";
import ProductCard from "../components/ProductCard";
import ProductSaleInfo from "../components/ProductSaleInfo";
import BrowseCategory from "../components/BrowseCategory";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError("Error fetching products");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="mx-20">
      <div className="flex px-24 gap-x-4 mt-8">
        <div className="w-1/5 border-r flex flex-col">
          <p className="flex justify-between">
            Woman&apos;s Fashion
            <ChevronRightIcon className="h-6 w-6" />
          </p>
          <p className="flex justify-between">
            Men&apos;s Fashion
            <ChevronRightIcon className="h-6 w-6" />
          </p>
          <p>Electronics</p>
          <p>Home & LifeStyle</p>
          <p>Medicine</p>
          <p>Sports & Outdoors</p>
          <p>Baby&apos;s & Toys</p>
          <p>Groceries & Pets</p>
          <p>Health & Beauty</p>
        </div>
        <div className="w-4/5">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Image
                src="/mobile_banner.svg"
                width={800}
                height={800}
                alt="NA"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/homescreen.svg" width={800} height={800} alt="NA" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/homescreen.svg" width={800} height={800} alt="NA" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/homescreen.svg" width={800} height={800} alt="NA" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div>
        <ProductSaleInfo tag="Today's" tagInfo="Flash Sales" />
      </div>
      <div className="py-8 border-b">
        <ProductCard products={products} />
        <div className="flex justify-center">
          <Button radius="sm" color="danger" className="px-12">
            View All Products
          </Button>
        </div>
      </div>

      <div className="py-8">
        <ProductSaleInfo tag="Categories" tagInfo="Browse By Categories" />
        <div className="flex items-center justify-center py-8 gap-x-4 border-b">
          <BrowseCategory category="phone" categoryName="Phones" />
          <BrowseCategory category="computer" categoryName="Computers" />
          <BrowseCategory category="camera" categoryName="Cameras" />
          <BrowseCategory category="clock" categoryName="Clocks" />
        </div>
      </div>

      <div>
        <div>
          <ProductSaleInfo tag="This month" tagInfo="Best Selling Product" />
        </div>
        <div className="py-8 border-b">
          <ProductCard products={products} />
          <div className="flex justify-center">
            <Button radius="sm" color="danger" className="px-12">
              View All Products
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div>
          <ProductSaleInfo tag="Our Products" tagInfo="Explore Our Products" />
        </div>
        <div className="py-8 border-b">
          <ProductCard products={products} />
          <div className="flex justify-center">
            <Button radius="sm" color="danger" className="px-12">
              View All Products
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-x-8 py-8">
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
