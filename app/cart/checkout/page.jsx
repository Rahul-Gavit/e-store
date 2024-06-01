"use client";

import { Input, Checkbox, Button, RadioGroup, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import useStore from "/app/store/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const CheckOut = () => {
  const router = useRouter();
  const { addedProducts, removeProduct, clearCart } = useStore((state) => ({
    addedProducts: state.addedProducts,
    removeProduct: state.removeProduct,
    clearCart: state.clearCart,
  }));

  const [billingDetails, setBillingDetails] = useState({
    name: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
    orderedProducts: [],
  });

  // Unique products with buyQuantity and subtotal calculation
  const uniqueProducts = addedProducts.reduce((acc, product) => {
    if (acc[product._id]) {
      acc[product._id].buyQuantity += 1;
      acc[product._id].subtotal += product.price;
    } else {
      acc[product._id] = {
        ...product,
        buyQuantity: 1,
        subtotal: product.price,
      };
    }
    return acc;
  }, {});

  const productArray = Object.values(uniqueProducts);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  const handleBillingDetails = () => {
    const filteredProducts = productArray.map(
      ({ _id, title, price, image, color, buyQuantity, subtotal }) => ({
        _id,
        title,
        price,
        image,
        color,
        buyQuantity,
        subtotal,
      })
    );

    const updatedBillingDetails = {
      ...billingDetails,
      orderedProducts: filteredProducts,
    };

    setBillingDetails(updatedBillingDetails);

    clearCart();

    router.push("/");

    console.log(updatedBillingDetails);
  };

  return (
    <div className="px-20 pt-10 pb-20">
      <div className="space-x-4 text-gray-500 text-sm">
        <span>Account</span>
        <span>/</span>
        <span>My Account</span>
        <span>/</span>
        <span>Product</span>
        <span>/</span>
        <span>View Cart</span>
        <span>/</span>
        <span className="text-black">CheckOut</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center mt-8">
        <div className="px-8 py-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md w-full">
          <div className="z-0">
            <h1 className="text-2xl font-medium ">Billing Details</h1>
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="text"
                label="Name"
                name="name"
                value={billingDetails.name}
                placeholder="name"
                labelPlacement="outside"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                label="Street Address"
                value={billingDetails.address}
                name="address"
                required
                placeholder="address"
                labelPlacement="outside"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="apartment"
                value={billingDetails.apartment}
                label="Apartment, floor, etc. (optional)"
                placeholder="apartment"
                labelPlacement="outside"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="city"
                value={billingDetails.city}
                label="Town/City"
                placeholder="town/city"
                labelPlacement="outside"
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="phone"
                value={billingDetails.phone}
                label="Phone Number"
                placeholder="phone"
                labelPlacement="outside"
                onChange={handleInputChange}
              />
              <Input
                type="email"
                name="email"
                value={billingDetails.email}
                label="Email Address"
                placeholder="email"
                labelPlacement="outside"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <Checkbox defaultSelected color="danger">
              Save this information for faster checkout next time
            </Checkbox>
          </div>
        </div>
        <div>
          <div className="w-96 p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
            {productArray.map((pd) => (
              <div key={pd._id}>
                <div className="flex justify-between text-sm py-2 gap-x-4">
                  <span className="">{pd.title}</span>
                  <span className="flex items-center gap-x-1">
                    ₹{pd.price}
                    <XMarkIcon className="h-4 w-4" />
                    <span>{pd.buyQuantity}</span>
                  </span>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-sm py-2 border-b">
              <span>Subtotal:</span>
              <span>
                ₹
                {productArray.reduce(
                  (acc, product) => acc + product.subtotal,
                  0
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span>Total</span>
              <span>
                ₹
                {productArray.reduce(
                  (acc, product) => acc + product.subtotal,
                  0
                )}
              </span>
            </div>

            <div>
              <RadioGroup label="Payment Mode">
                <Radio value="bank">Bank</Radio>
                <Radio value="cod">Cash on delivery</Radio>
              </RadioGroup>
            </div>
            <div className="flex gap-x-4 mt-4">
              <Input
                radius="sm"
                type="text"
                placeholder="Coupon Code"
                className="w-72 h-10"
              />
              <Button
                radius="sm"
                variant="bordered"
                className="text-red-500 px-8 border-red-500"
              >
                Apply Coupon
              </Button>
            </div>
            <div className="mt-6">
              <Button
                onClick={handleBillingDetails}
                radius="sm"
                className="bg-red-500 border-none w-full text-white"
                variant="faded"
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
