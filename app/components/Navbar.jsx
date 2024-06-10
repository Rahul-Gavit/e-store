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
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import useStore from "/app/store/store";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import SideBar from "/app/components/SideBar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const addedProducts = useStore((state) => state.addedProducts);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false);
  const [userPopoverOpen, setUserPopoverOpen] = useState(false);
  const userId = session?.user?.userId;

  const handleCategoryPopoverClose = () => {
    setCategoryPopoverOpen(false);
  };

  const handleUserPopoverClose = () => {
    setUserPopoverOpen(false);
  };

  const handleMyAccountClick = () => {
    handleUserPopoverClose();
    if (userId) {
      router.push(`/account/${userId}`);
    }
  };
  const handleAdminClick = () => {
    handleUserPopoverClose();
    router.push(`/admin`);
  };
  const handleMyOrdersClick = () => {
    handleUserPopoverClose();
    if (userId) {
      router.push(`/account/${userId}/orders`);
    }
  };

  const handleLogoutClick = () => {
    handleUserPopoverClose();

    signOut();
  };

  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="py-4 px-4 md:px-12 border-b flex justify-between items-center">
        <div className="md:hidden z-20">
          <SideBar />
        </div>
        <div className="max-lg:hidden">
          <h1 className="text-lg font-bold">Exclusive</h1>
        </div>

        <div className="flex gap-x-4 md:gap-x-8 text-sm font-medium max-md:hidden">
          <Link href={"/"}>Home</Link>
          <Link href={"#"}>Contact</Link>
          <Link href={"#"}>About</Link>
          {!userId ? (
            <Link href={"/signup"}>Sign Up</Link>
          ) : (
            <div>
              <Popover
                isOpen={categoryPopoverOpen}
                onOpenChange={(isOpen) => setCategoryPopoverOpen(isOpen)}
                placement="bottom"
                offset={10}
              >
                <PopoverTrigger>
                  <span className="cursor-pointer">Categories</span>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                  {(titleProps) => (
                    <div className="p-2 w-full">
                      <div className="mt-2 flex  flex-col w-full  space-y-1">
                        <Link href={"/mobiles"}>
                          <div
                            onClick={() => handleCategoryPopoverClose()}
                            className="flex gap-x-2 items-center justify-between cursor-pointer hover:font-medium hover:text-red-400  py-2 pl-4 rounded-md"
                          >
                            <p>Mobiles</p>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </Link>

                        <Link href={"/headphones"}>
                          <div
                            onClick={() => handleCategoryPopoverClose()}
                            className="flex gap-x-2 items-center justify-between cursor-pointer hover:font-medium hover:text-red-400 py-2 pl-4 rounded-md"
                          >
                            <p>Headphones</p>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </Link>
                        <Link href={"/watches"}>
                          <div
                            onClick={() => handleCategoryPopoverClose()}
                            className="flex gap-x-2 items-center justify-between cursor-pointer hover:font-medium hover:text-red-400 py-2 pl-4 rounded-md"
                          >
                            <p>Watches</p>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </Link>
                        <Link href={"/televisions"}>
                          <div
                            onClick={() => handleCategoryPopoverClose()}
                            className="flex gap-x-2 items-center justify-between cursor-pointer hover:font-medium hover:text-red-400 py-2 pl-4 rounded-md"
                          >
                            <p>Televisions</p>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </Link>
                        <Link href={"/homelifestyles"}>
                          <div
                            onClick={() => handleCategoryPopoverClose()}
                            className="flex gap-x-2 items-center justify-between cursor-pointer hover:font-medium hover:text-red-400 py-2 pl-4 rounded-md"
                          >
                            <p>Home & LifeStyles</p>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </Link>
                        <Link href={"/electronics"}>
                          <div
                            onClick={() => handleCategoryPopoverClose()}
                            className="flex gap-x-2 items-center justify-between cursor-pointer hover:font-medium hover:text-red-400 py-2 pl-4 rounded-md"
                          >
                            <p>Electronics</p>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </Link>
                        <Link href={"/groceries"}>
                          <div
                            onClick={() => handleCategoryPopoverClose()}
                            className="flex gap-x-2 items-center justify-between cursor-pointer hover:font-medium hover:text-red-400 py-2 pl-4 rounded-md"
                          >
                            <p>Groceries</p>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-x-4">
            <div className="max-md:hidden">
              <Input
                type="text"
                className=""
                placeholder="What your looking for ?"
                endContent={
                  <MagnifyingGlassIcon className="text-2xl text-gray-500 w-6 h-6 pointer-events-none flex-shrink-0" />
                }
              />
            </div>

            <HeartIcon className="h-5 w-5 cursor-pointer" />
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
                isOpen={userPopoverOpen}
                onOpenChange={(isOpen) => setUserPopoverOpen(isOpen)}
                placement="bottom"
                offset={10}
              >
                <PopoverTrigger>
                  <UserCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                  {(titleProps) => (
                    <div className="py-2 w-full">
                      <div className="mt-2 flex  flex-col w-full  space-y-1">
                        {userId ? (
                          <>
                            {userEmail === "rahul123@gmail.com" && (
                              <div
                                className="flex gap-x-2  cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                                onClick={handleAdminClick}
                              >
                                <UserCircleIcon className="h-5 w-5 text-green-500" />
                                <p className="text-sm font-light">Admin</p>
                              </div>
                            )}
                            <div
                              className="flex gap-x-2  cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                              onClick={handleMyAccountClick}
                            >
                              <UserIcon className="h-5 w-5 text-indigo-500" />
                              <p className="text-sm font-light">
                                Manage My Account
                              </p>
                            </div>
                            <div
                              className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                              onClick={handleMyOrdersClick}
                            >
                              <ShoppingBagIcon className="h-5 w-5 text-blue-500" />
                              <p className="text-sm font-light">My Order</p>
                            </div>

                            <div
                              className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                              onClick={handleUserPopoverClose}
                            >
                              <XCircleIcon className="h-5 w-5 text-red-300" />
                              <p className="text-sm font-light">
                                My Cancellations
                              </p>
                            </div>
                            <div
                              className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 px-4 rounded-md"
                              onClick={handleLogoutClick}
                            >
                              <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-red-500" />
                              <p className="text-sm font-light">LogOut</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Link href={"/login"}>
                              <div
                                className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                                onClick={handleUserPopoverClose}
                              >
                                <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-green-500" />
                                <p className="text-sm font-light">LogIn</p>
                              </div>
                            </Link>
                            <Link href={"/signup"}>
                              <div
                                className="flex gap-x-2 cursor-pointer hover:bg-gray-50 py-2 pl-4 rounded-md"
                                onClick={handleUserPopoverClose}
                              >
                                <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-blue-500" />
                                <p className="text-sm font-light">SignUp</p>
                              </div>
                            </Link>
                          </>
                        )}
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
