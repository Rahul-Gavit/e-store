import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const ProductSaleInfo = ({ tag, tagInfo }) => {
  return (
    <>
      <div className="flex items-center gap-x-2 mt-4">
        <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
        <h1 className="text-red-500 text-sm md:text-base font-medium">{tag}</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-16">
          <p className="text-xl md:text-2xl font-semibold">{tagInfo}</p>
        </div>
      </div>
    </>
  );
};

export default ProductSaleInfo;
