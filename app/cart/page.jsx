"use client";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Button, Input } from "@nextui-org/react";
import useStore from "/app/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { addedProducts, removeProduct } = useStore((state) => ({
    addedProducts: state.addedProducts,
    removeProduct: state.removeProduct,
  }));

  const handleRemoveToCart = (productId) => {
    removeProduct(productId);
    console.log("Product added to cart:");
  };

  // Unique products with quantity and subtotal calculation
  const uniqueProducts = addedProducts.reduce((acc, product) => {
    if (acc[product._id]) {
      acc[product._id].quantity += 1;
      acc[product._id].subtotal += product.price;
    } else {
      acc[product._id] = {
        ...product,
        quantity: 1,
        subtotal: product.price,
      };
    }
    return acc;
  }, {});

  const productArray = Object.values(uniqueProducts);

  return (
    <div className="p-20">
      <div className="space-x-2">
        <span>Home</span>
        <span>/</span>
        <span>Cart</span>
      </div>
      <div>
        <div className="grid grid-cols-5 place-items-center text-sm font-medium border shadow-black/20  p-4 rounded-md shadow-md mt-10">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="col-span-1">Subtotal</span>
        </div>
        {productArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-5 place-items-center text-sm font-medium   p-4 rounded-md shadow-md shadow-black/20 mt-10"
          >
            <div className="rounded-sm flex items-center gap-x-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-24 w-24 md:w-auto shadow-md p-2 rounded-lg"
              />
              <p className="max-md:hidden">{product.title}</p>
            </div>
            <span>{product.price}</span>
            <div className="flex items-center gap-x-3 border px-3 py-1.5 rounded-md">
              <span>{product.quantity}</span>
              <span>
                <ChevronUpIcon className="w-3 h-3" />
                <ChevronDownIcon className="w-3 h-3" />
              </span>
            </div>
            <span>${product.subtotal}</span>
            <div>
              <TrashIcon
                onClick={() => handleRemoveToCart(product._id)}
                className="w-5 h-5 text-red-500 cursor-pointer"
              />
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-between">
          <Link href={"/"}>
            <Button radius="sm" className="bg-white" variant="faded">
              Return To Shop
            </Button>
          </Link>

          <Button radius="sm" className="bg-white" variant="faded">
            Update Cart
          </Button>
        </div>

        <div className="mt-8 w-full flex flex-col max-lg:items-end max-lg:gap-y-4 lg:flex-row max-sm:gap-y-6 max-sm:items-center sm:justify-between">
          <div className="flex gap-x-4">
            <Input
              radius="sm"
              type="text"
              placeholder="Coupon Code"
              className="w-auto  sm:w-60 lg:w-72 h-10"
            />
            <Button
              radius="sm"
              className="bg-red-500 border-none text-white"
              variant="faded"
            >
              Apply Coupon
            </Button>
          </div>
          <div>
            <div className="border-2 rounded-md w-72 sm:w-96 p-4">
              <p className="text-md font-medium py-2">Cart Total</p>
              <div className="text-sm flex justify-between py-2 border-b">
                <span>Subtotal</span>
                <span>
                  $
                  {productArray.reduce(
                    (acc, product) => acc + product.subtotal,
                    0
                  )}
                </span>
              </div>
              <div className="text-sm flex justify-between py-2 border-b">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="text-sm flex justify-between py-2 border-b">
                <span>Total</span>
                <span>
                  $
                  {productArray.reduce(
                    (acc, product) => acc + product.subtotal,
                    0
                  )}
                </span>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => router.push("/cart/checkout")}
                  type="button"
                  radius="sm"
                  className="bg-red-500 border-none text-white"
                  variant="faded"
                >
                  Proceed To Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
