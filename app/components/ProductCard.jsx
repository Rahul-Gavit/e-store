"use client";

import React from "react";
import "../style/main.css";
import { useState, useEffect } from "react";
import Link from "next/link";

const ProductCard = ({ products }) => {
  return (
    <div className="grid mx-4 grid-cols-1 max-sm:place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6 max-md:mb-6 md:my-6">
      {products.map((product) => (
        <Link href={`/products/${product._id}`} key={product._id}>
          <div className="bg-white relative  cursor-pointer max-sm:w-72 hover:border-none shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] flex flex-col  justify-center p-6  h-full rounded-xl">
            <div className="flex justify-center bg-red-500 mb-24">
              <img src={product.images[0]} alt="NA" className="w-30 h-30" />
            </div>

            <div className="absolute left-0 px-6 bottom-0">
              <p className="text-sm font-light text-gray-600">{product.name}</p>
              <div className="flex gap-x-2 text-xs">
                <span className="text-red-500">₹{product.price}</span>
                <span className="line-through text-gray-500">
                  RS.{(product.price * 1.1).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-x-2 mb-2">
                <div className="rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <React.Fragment key={i}>
                      <input
                        type="radio"
                        id={`star${5 - i}-${product._id}`}
                        name={`rate-${product._id}`}
                        defaultChecked={5 - i === Math.round(product.rating)}
                      />
                      <label
                        title="text"
                        className=""
                        htmlFor={`star${5 - i}-${product._id}`}
                      />
                    </React.Fragment>
                  ))}
                </div>
                <span>NA</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
