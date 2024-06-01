"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const AddToCart = () => {
  const [add, setAdd] = useState(0);

  const handleAddToCart = () => {
    setAdd(add + 1);
    console.log("clicked");
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        size="sm"
        radius="sm"
        className="bg-red-500 text-white px-8"
      >
        Hello
      </Button>
    </>
  );
};

export default AddToCart;
