"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
  ShoppingBagIcon,
  XCircleIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

import useStore from "/app/store/store";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import SideBar from "/app/components/SideBar";

const Navbar = () => {
  const addedProducts = useStore((state) => state.addedProducts);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="py-4 px-12 border-b flex justify-between items-center">
        <div className="md:hidden z-20">
          <SideBar />
        </div>
        <div className="max-md:hidden">
          <h1 className="text-lg font-bold">Exclusive</h1>
        </div>

        <div className="flex gap-x-4 md:gap-x-8 text-sm font-medium max-md:hidden">
          <Link href={"/"}>Home</Link>
          <Link href={"#"}>Contact</Link>
          <Link href={"#"}>About</Link>
          <Link href={"/signup"}>Sign Up</Link>
        </div>

        <div>
          <div className="flex items-center gap-x-4">
            <Input
              type="text"
              className=""
              placeholder="What your looking for ?"
              endContent={
                <MagnifyingGlassIcon className="text-2xl text-gray-500 w-6 h-6 pointer-events-none flex-shrink-0" />
              }
            />
            <HeartIcon className="h-6 w-6" />
            <Link href={"/cart"}>
              <div className="relative">
                {addedProducts.length > 0 ? (
                  <span className="absolute -right-4 -top-4 shadow-sm shadow-black/30 px-1.5 rounded-full">
                    {addedProducts.length}
                  </span>
                ) : null}

                <ShoppingCartIcon className="h-5 w-5" />
              </div>
            </Link>
            <div>
              <Popover
                isOpen={popoverOpen}
                onOpenChange={(isOpen) => setPopoverOpen(isOpen)}
                placement="bottom"
                offset={10}
              >
                <PopoverTrigger>
                  <UserCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                  {(titleProps) => (
                    <div className="p-2 w-full">
                      <div className="mt-2 flex flex-col w-full space-y-1">
                        <div
                          className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                          onClick={handlePopoverClose}
                        >
                          <UserIcon className="h-5 w-5 text-indigo-500" />
                          <p>Manage My Account</p>
                        </div>
                        <div
                          className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                          onClick={handlePopoverClose}
                        >
                          <ShoppingBagIcon className="h-5 w-5 text-blue-500" />
                          <p>My Order</p>
                        </div>
                        <div
                          className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                          onClick={handlePopoverClose}
                        >
                          <XCircleIcon className="h-5 w-5 text-red-300" />
                          <p>My Cancellations</p>
                        </div>
                        <Link href={"/login"}>
                          <div
                            className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                            onClick={handlePopoverClose}
                          >
                            <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-green-500" />
                            <p>LogIn</p>
                          </div>
                        </Link>
                        <Link href={"#"}>
                          <div
                            className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 px-4 rounded-md"
                            onClick={handlePopoverClose}
                          >
                            <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-red-500" />
                            <p>LogOut</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
