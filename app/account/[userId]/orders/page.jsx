"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Progress, Spinner } from "@nextui-org/react";
import {
  ArrowUpTrayIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/solid";

const Orders = () => {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const userId = params.userId;
      try {
        const response = await fetch(`/api/order?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const getStatusProgressValue = (status) => {
    switch (status) {
      case "pending":
        return 20;
      case "shipped":
        return 40;
      case "outofdelivery":
        return 70;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="m-6 md:m-12 space-y-8">
      {!loading && orders.length > 0 ? (
        orders.map((order) => (
          <div
            className="bg-white w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-4"
            key={order.orderId}
          >
            <div className="grid grid-cols-3">
              <div>
                <p className="text-sm text-gray-700 font-medium p-2">
                  Product Name
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium p-2">
                  Ordered Quantity
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium p-2">
                  Product Price
                </p>
              </div>
            </div>

            {order.products.map((product) => (
              <div className="grid grid-cols-3" key={product.productId}>
                <div>
                  <p className="text-xs p-2">{product.name}</p>
                </div>
                <div>
                  <p className="text-xs p-2">{product.quantity}</p>
                </div>
                <div>
                  <p className="text-xs p-2">₹{product.price}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6 mt-4  xl:pr-20">
              <div>
                <div className="flex items-center gap-x-2 pl-2">
                  <p className="text-sm font-medium">Total Amount: </p>
                  <p className="text-xs">₹{order.totalAmount}</p>
                </div>
                <div className="pl-2">
                  <p className="text-sm font-medium">Shipping Address: </p>
                  <p className="text-xs">
                    {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 max-md:pt-8">
                {/* Progress bar */}
                <div className="">
                  <Progress
                    size="sm"
                    value={getStatusProgressValue(order.status)}
                    color="success"
                    className="w-72 sm:w-96"
                  />
                </div>
                {/* Dots */}
                <div className="">
                  <div className="flex justify-between">
                    <span
                      className={
                        order.status === "pending"
                          ? "text-xs text-green-500"
                          : "text-xs"
                      }
                    >
                      Order Confirmed
                    </span>
                    <span
                      className={
                        order.status === "shipped"
                          ? "text-xs max-sm:hidden text-green-500"
                          : "text-xs max-sm:hidden"
                      }
                    >
                      Shipped
                    </span>
                    <span
                      className={
                        order.status === "outofdelivery"
                          ? "text-xs max-sm:hidden text-green-500 "
                          : "text-xs max-sm:hidden"
                      }
                    >
                      Out Of Delivery
                    </span>
                    <span
                      className={
                        order.status === "delivered"
                          ? "text-xs text-green-500"
                          : "text-xs"
                      }
                    >
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : loading ? (
        <div className="flex justify-center h-60">
          <Spinner label="Loading..." color="danger" labelColor="danger" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="/No data.svg"
            alt="No Data"
            className="w-16 h-16 sm:h-96 sm:w-auto p-2"
          />
          <p className="text-base font-medium">No Orders Found </p>
          <p className="text-sm font-light">Please purchase products</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
