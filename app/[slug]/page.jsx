"use client";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Categories = () => {
  const params = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [sortedProducts, setSortedProducts] = useState(null);

  const filterProductByPrice = (sortBy) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortBy === "$.0") return a.price - b.price;
      else if (sortBy === "$.1") return b.price - a.price;
    });
    setSortedProducts(sortedProducts);
  };

  const handleSelectionChange = (e) => {
    const sortBy = e.target.value;
    setValue(sortBy);
    filterProductByPrice(sortBy);
  };

  const renderProducts = sortedProducts || products;

  const fetchProductsByCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${params.slug}`, {
        cache: "no-store",
      });

      const data = await response.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params.slug) {
      fetchProductsByCategories();
    }
  }, [params.slug]);

  return (
    <div className="py-4 sm:py-8 px-4 md:px-10">
      {loading || !products ? (
        <div className="flex justify-center h-60">
          <Spinner label="Loading..." color="danger" labelColor="danger" />
        </div>
      ) : (
        <div>
          {products.length === 0 ? (
            <div className="flex flex-col items-center">
              <img
                src="/No data.svg"
                alt="No Data"
                className="w-16 h-16 sm:h-96 sm:w-auto  p-2 "
              />
              <p className="text-base font-medium">
                No {params.slug.toLowerCase()} products found{" "}
              </p>
              <p className="text-sm font-light">
                Please Check another products
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-y-3 sm:items-center justify-between p-4">
                <div className="space-x-4 text-gray-500 text-sm">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-black">{params.slug}</span>
                </div>
                <div className="flex">
                  <Select
                    size="sm"
                    label="Sort by: Featured"
                    selectedKeys={[value]}
                    className="w-48"
                    onChange={handleSelectionChange}
                  >
                    <SelectItem value="$0">Price: Low to High</SelectItem>
                    <SelectItem value="$1">Price: High to Low</SelectItem>
                  </Select>
                </div>
              </div>
              <ProductCard products={renderProducts} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
