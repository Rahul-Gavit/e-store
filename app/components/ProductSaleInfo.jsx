import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const ProductSaleInfo = ({ tag, tagInfo }) => {
  return (
    <>
      <div className="flex items-center gap-x-2 mt-4">
        <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
        <h1 className="text-red-500 font-medium">{tag}</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-16">
          <p className="text-2xl font-semibold">{tagInfo}</p>
          <div className="flex gap-x-4">
            <span>
              <p className="text-xs font-semibold">Days</p>
              <p className="text-2xl font-semibold">03</p>
            </span>
            <span>
              <p className="text-xs font-semibold">Hours</p>
              <p className="text-2xl font-semibold">23</p>
            </span>
            <span>
              <p className="text-xs font-semibold">Minutes</p>
              <p className="text-2xl font-semibold">19</p>
            </span>
            <span>
              <p className="text-xs font-semibold">Seconds</p>
              <p className="text-2xl font-semibold">56</p>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="bg-gray-200 border p-2 rounded-full">
            <ArrowLeftIcon className="h-5 w-5" />
          </span>
          <span className="bg-gray-200 border p-2 rounded-full">
            <ArrowRightIcon className="h-5 w-5" />
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductSaleInfo;
