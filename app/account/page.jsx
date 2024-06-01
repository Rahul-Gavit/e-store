import { Button, Input } from "@nextui-org/react";
import React from "react";

const Account = () => {
  return (
    <div className="px-20 pb-8">
      <div>
        <div className="flex justify-between py-8">
          <div className=" space-x-4 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span className="text-black">My Account</span>
          </div>
          <div className="text-sm">
            <span>
              Welcome! <span className="text-red-500">Rahul</span>
            </span>
          </div>
        </div>

        <div className="flex w-full my-4">
          <div className="sm:w-3/12 space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Manage My Account</p>
              <p className="text-sm text-gray-600 pl-6">My Profile</p>
              <p className="text-sm text-gray-600 pl-6">Address Book</p>
              <p className="text-sm text-gray-600 pl-6">My Payment Options</p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">My Orders</p>
              <p className="text-sm text-gray-600 pl-6">My Returns</p>
              <p className="text-sm text-gray-600 pl-6">My Collections</p>
            </div>
            <div>
              <p className="font-medium">My WishList</p>
            </div>
          </div>
          <div className="border rounded-md shadow-md mx-8 py-12 px-20 sm:w-9/12">
            <p className="text-lg text-red-500 font-medium">
              Edit Your Profile
            </p>
            <div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-12 my-4">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="first name"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="last name"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />
                <Input
                  type="email"
                  label="Email"
                  placeholder="email@gmail.com"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />
                <Input
                  type="text"
                  label="Address"
                  placeholder="address"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />
              </div>
              <div className="flex flex-col gap-y-4 mt-6">
                <Input
                  type="text"
                  label="Password Changes"
                  placeholder="Current Password"
                  labelPlacement="outside"
                  classNames={{
                    label: ["font-medium"],
                  }}
                />
                <Input
                  type="text"
                  placeholder="New Password"
                  labelPlacement="outside"
                />
                <Input
                  type="text"
                  placeholder="Confirm New Password"
                  labelPlacement="outside"
                />
              </div>
              <div className="flex justify-end gap-x-2 mt-4">
                <div>
                  <Button radius="sm" variant="bordered" className="px-8">
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    radius="sm"
                    className="bg-red-500 px-8 text-white border-none"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
