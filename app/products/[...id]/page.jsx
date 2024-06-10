"use client";

import { useEffect, useState } from "react";
import {
  ArrowPathIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { Button, Spinner } from "@nextui-org/react";
import useStore from "/app/store/store";
import { useRouter } from "next/navigation";
const ProductPage = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [productCount, setProductCount] = useState(1);
  const [selectedImg, setSelectedImg] = useState("");
  const [toggleCart, setToggleCart] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addProduct } = useStore((state) => ({
    addProduct: state.addProduct,
  })); // Get the addProduct function from the store

  const handleProductCount = (type) => {
    console.log(productCount);
    setProductCount((prevCount) => {
      if (type === "increment") {
        return Math.min(prevCount + 1, product.stockQuantity);
      } else if (type === "decrement") {
        return Math.max(prevCount - 1, 1);
      }
    });
  };

  const handleAddToCart = () => {
    setToggleCart(!toggleCart);

    for (let i = 0; i < productCount; i++) {
      addProduct(product);
    }
  };

  const handleImgChange = (index) => {
    setSelectedImg(
      product.images.filter((_, idx) => {
        return idx === index;
      })
    );
    console.log(selectedImg);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${params.id}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  return (
    <>
      {loading || !product ? (
        <div className="flex justify-center h-60">
          <Spinner label="Loading..." color="danger" labelColor="danger" />
        </div>
      ) : (
        <div className="my-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-around px-4">
            <div className="flex lg:w-1/2 flex-col items-center gap-y-12">
              <div className=" rounded-sm flex ">
                {selectedImg === "" ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-72 lg:h-96 w-auto"
                  />
                ) : (
                  <img
                    src={selectedImg}
                    alt={product.name}
                    className="h-72 lg:h-96 w-auto"
                  />
                )}
              </div>
              <div className=" rounded-sm flex gap-x-4 cursor-pointer">
                {product.images.map((item, index) => (
                  <div
                    className=""
                    onClick={() => handleImgChange(index)}
                    key={index}
                  >
                    <img
                      src={item}
                      alt={item}
                      className=" h-16 lg:h-24 w-auto border hover:border-red-500 focus:outline-none py-2  lg:py-4 px-4 lg:px-8 rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className=" p-2 xl:pr-20">
                <div className="flex flex-col items-start border-b-2 border-gray-400 py-4">
                  <h1 className="text-xl font-normal text-gray-700">
                    {product.name}
                  </h1>

                  {/* <div className="rating">
                  <input defaultValue={5} name="rate" id="star5" type="radio" />
                  <label title="text" htmlFor="star5" />
                  <input defaultValue={4} name="rate" id="star4" type="radio" />
                  <label title="text" htmlFor="star4" />
                  <input
                    defaultValue={3}
                    name="rate"
                    id="star3"
                    type="radio"
                    defaultChecked
                  />
                  <label title="text" htmlFor="star3" />
                  <input defaultValue={2} name="rate" id="star2" type="radio" />
                  <label title="text" htmlFor="star2" />
                  <input defaultValue={1} name="rate" id="star1" type="radio" />
                  <label title="text" htmlFor="star1" />
                </div> */}
                </div>
                <div className="mt-4">
                  <div className="flex gap-x-2 items-center">
                    <span className="text-sm font-light">Colors:</span>
                    <div className="h-5 w-5 bg-red-500 rounded-full cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"></div>
                    <div className="h-5 w-5 bg-blue-500 rounded-full cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"></div>
                  </div>
                  <div className="flex items-center gap-x-2 my-4">
                    <span className="text-sm font-light">Size: </span>
                    <div className="text-sm p-1 h-7 w-7 flex items-center justify-center border rounded-md cursor-pointer">
                      XS
                    </div>
                    <div className="text-sm p-1 h-7 w-7 flex items-center justify-center border rounded-md cursor-pointer">
                      S
                    </div>
                    <div className="text-sm p-1 h-7 w-7 flex items-center text-white bg-red-500 justify-center border rounded-md cursor-pointer">
                      M
                    </div>
                    <div className="text-sm p-1 h-7 w-7 flex items-center justify-center border rounded-md cursor-pointer">
                      L
                    </div>
                    <div className="text-sm p-1 h-7 w-7 flex items-center justify-center border rounded-md cursor-pointer">
                      XL
                    </div>
                  </div>

                  <div className="flex gap-x-4 my-4">
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => handleProductCount("decrement")}
                        className="border rounded-l-md flex items-center p-1"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <div className="border-t border-b px-6 flex items-center">
                        {productCount}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleProductCount("increment")}
                        className="border rounded-r-md p-1 flex items-center text-white bg-red-500"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>

                    {toggleCart ? (
                      <div>
                        <Button
                          size="sm"
                          radius="sm"
                          onClick={(event) => {
                            event.preventDefault();
                            setToggleCart(!toggleCart);
                            router.push("/cart");
                          }}
                          className="bg-red-500 text-white px-8"
                        >
                          Go To Cart
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          onClick={handleAddToCart}
                          size="sm"
                          radius="sm"
                          className="bg-red-500 text-white px-8"
                        >
                          Buy Now
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center border rounded-md px-1 cursor-pointer">
                      <HeartIcon className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center space-x-4 border rounded-t-md p-3">
                      <TruckIcon className="h-6 w-6 text-indigo-500" />
                      <div>
                        <span className="font-semibold">Free Delivery</span>
                        <p className="text-sm underline font-light">
                          Enter Your postal code for delivery available
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border rounded-b-md p-3">
                      <ArrowPathIcon className="h-6 w-6 text-red-500" />
                      <div>
                        <span className="font-semibold">Return Delivery</span>
                        <p className="text-sm font-light">
                          Free 30 Days Delivery Returns.{" "}
                          <span className="underline">Details</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-t-2 mt-4 pt-4">
                  <p className="text-base font-light">About Product: </p>
                  <p className="text-sm mt-2 font-light">
                    {showFullDescription ? (
                      product.description
                    ) : (
                      <>
                        {product.description.split(" ").slice(0, 70).join(" ")}
                        {product.description.split(" ").length > 70 && " ..."}
                      </>
                    )}
                    <span
                      className="text-red-400 text-sm cursor-pointer"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "View Less" : "View More"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;

{
  /* <p className="text-sm">
                  {product.description.split(" ").slice(0, 20).join(" ") +
                    (product.description.split(" ").length > 20 ? "..." : "")}
                </p> */
}
