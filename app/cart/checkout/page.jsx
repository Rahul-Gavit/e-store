"use client";

import {
  Input,
  Checkbox,
  Button,
  RadioGroup,
  Radio,
  Spinner,
} from "@nextui-org/react";
import React, { useState } from "react";
import useStore from "/app/store/store";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const CheckOut = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const userId = session?.user?.userId;

  const { addedProducts, clearCart } = useStore((state) => ({
    addedProducts: state.addedProducts,
    clearCart: state.clearCart,
  }));

  const [billingDetails, setBillingDetails] = useState({
    street: "",
    state: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMode: "cod",
    orderedProducts: [],
    totalAmount: "",
    shippingAddress: [],
  });

  // Unique products with quantity and productTotal calculation
  const uniqueProducts = addedProducts.reduce((acc, product) => {
    if (acc[product._id]) {
      acc[product._id].quantity += 1;
      acc[product._id].productTotal += product.price;
    } else {
      acc[product._id] = {
        ...product,
        quantity: 1,
        productTotal: product.price,
      };
    }
    return acc;
  }, {});

  const productArray = Object.values(uniqueProducts);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setBillingDetails({
      ...billingDetails,
      [name]: newValue,
    });
  };

  // Calculate total amount
  const totalAmount = productArray.reduce(
    (acc, product) => acc + product.productTotal,
    0
  );

  const handleBillingDetails = async () => {
    setPending(true);
    if (
      !billingDetails.city ||
      !billingDetails.country ||
      !billingDetails.paymentMode ||
      !billingDetails.state ||
      !billingDetails.street
    ) {
      setError("All fields are necessary!");
      setPending(false);
      return;
    }
    const filteredProducts = productArray.map(
      ({ productId, name, price, quantity, productTotal }) => ({
        productId,
        name,
        price,
        quantity,
        productTotal,
      })
    );
    const shippingAddress = [
      // Create shippingAddress array
      {
        street: billingDetails.street,
        state: billingDetails.state,
        city: billingDetails.city,
        postalCode: billingDetails.postalCode,
        country: billingDetails.country,
      },
    ];

    const updatedBillingDetails = {
      userId: session?.user?.userId,
      products: filteredProducts,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentMode: billingDetails.paymentMode,
    };

    setBillingDetails(updatedBillingDetails);

    try {
      const response = await axios.post("/api/order", updatedBillingDetails);
      if (response.status === 200) {
        console.log("product ordered successfully");
        clearCart();
        setPaymentDone(true);
      }
    } catch (error) {
      console.log(error);
    }
    setPending(false);
  };

  return (
    <div className="px-4 md:px-20 pt-10 pb-20">
      {!pending && !paymentDone ? (
        <div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 place-items-end lg:place-items-center max-lg:space-y-8 mt-8">
            <div className="px-8 py-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md w-full">
              <div className="z-0">
                <h1 className="text-2xl font-medium mb-4">Billing Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    label="Street Address"
                    value={billingDetails.street}
                    name="street"
                    required
                    placeholder="street"
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
                    type="text"
                    label="state"
                    name="state"
                    value={billingDetails.state}
                    placeholder="state"
                    labelPlacement="outside"
                    onChange={handleInputChange}
                  />
                  <Input
                    type="number"
                    name="postalCode"
                    value={billingDetails.postalCode}
                    label="Postal Code"
                    placeholder="postal code"
                    labelPlacement="outside"
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="country"
                    value={billingDetails.country}
                    label="Country"
                    placeholder="country"
                    labelPlacement="outside"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                {error && (
                  <span className=" text-red-500 text-xs rounded-md">
                    {error}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <Checkbox defaultSelected color="danger">
                  Save this information for faster checkout next time
                </Checkbox>
              </div>
            </div>
            <div>
              <div className="w-80 sm:w-96 p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
                {productArray.map((pd) => (
                  <div key={pd._id}>
                    <div className="flex justify-between text-sm py-2 gap-x-4 ">
                      <span className="">{pd.name}</span>
                      <span className="flex items-center gap-x-1">
                        ₹{pd.price}
                        <XMarkIcon className="h-4 w-4" />
                        <span>{pd.quantity}</span>
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between text-sm py-2 border-b">
                  <span>Subtotal:</span>
                  <span>
                    ₹
                    {productArray.reduce(
                      (acc, product) => acc + product.productTotal,
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
                      (acc, product) => acc + product.productTotal,
                      0
                    )}
                  </span>
                </div>

                <div>
                  <RadioGroup
                    onChange={handleInputChange}
                    name="paymentMode"
                    defaultValue="cod"
                    label="Payment Mode"
                  >
                    <Radio name="paymentMode" value="bank">
                      Bank
                    </Radio>
                    <Radio name="paymentMode" value="cod">
                      Cash on delivery
                    </Radio>
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
      ) : pending ? (
        <div className="flex justify-center h-60">
          <Spinner label="Loading..." color="danger" labelColor="danger" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="/paymentDone.svg"
            alt="No Data"
            className="w-16 h-16 sm:h-96 sm:w-auto  p-2 "
          />
          <div
            onClick={() => {
              setPending(true);
              router.push(`/account/${userId}/orders`);
              setPending(false);
              setPaymentDone(false);
            }}
            className="flex  rounded-md hover:bg-gray-200 items-center gap-x-2 cursor-pointer bg-gray-100 px-4 py-2"
          >
            <p className="text-base font-medium">Go to orders</p>
            <ChevronRightIcon className="h-5 w-5" />
          </div>

          <p className="text-sm font-light mt-2">Thanks for ordering here!</p>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
