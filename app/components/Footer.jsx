import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { Input } from "@nextui-org/react";

const Footer = () => {
  return (
    <div className="py-8 md:py-16 bg-black text-white flex flex-col px-6 md:px-0 max-md:divide-y md:flex-row gap-y-4 justify-center gap-x-12">
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-semibold">Shopify</p>
        <p className="text-sm font-semibold">Subscribe</p>
        <p className="text-xs">Get 10% of your first order</p>
        <Input
          type="email"
          className=""
          placeholder="you@example.com"
          labelPlacement="outside"
          endContent={
            <ChevronDoubleRightIcon className="text-2xl w-6 h-6 text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-semibold">Support</p>
        <p className="text-xs">
          111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
        </p>
        <p className="text-xs">rahulgavit@gmail.com</p>
        <p className="text-xs">+88015-88888-9999</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-semibold">Account</p>
        <p className="text-xs">My Account</p>
        <p className="text-xs">Login / Register</p>
        <p className="text-xs">Cart</p>
        <p className="text-xs">Wishlist</p>
        <p className="text-xs">Shop</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-semibold">Quick Link</p>
        <p className="text-xs">Privacy Policy</p>
        <p className="text-xs">Terms Of Use</p>
        <p className="text-xs">Cart</p>
        <p className="text-xs">FAQ</p>
        <p className="text-xs">Contact</p>
      </div>
    </div>
  );
};

export default Footer;
