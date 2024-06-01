"use client";
import React from "react";
import Image from "next/image";
import { Input, Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: null,
};

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formInput, setFormInput] = useState(initialValues);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = async (e) => {
    setPending(true);
    e.preventDefault();

    if (!formInput.name || !formInput.email || !formInput.password) {
      setError("All fields are necessary!");
      setPending(false);

      return;
    }

    if (!validateEmail(formInput.email)) {
      setError("Please enter a valid email address!");
      setPending(false);

      return;
    }

    if (formInput.password.length < 8) {
      setError("Password must be at least 8 characters long!");
      setPending(false);

      return;
    }
    if (formInput.phoneNumber.length < 10) {
      setError("Phone number must be 10 digits!");
      setPending(false);

      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formInput),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      } else if (res.ok) {
        setError("");
        setFormInput(initialValues);
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log(error);
    }
    setPending(false);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex items-center justify-around my-12 max-md:px-10">
      <div className="max-lg:hidden shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-lg p-12 -rotate-6">
        <img
          src="/sign-up.svg"
          alt="NA"
          className="w-72 h-72 xl:w-96 xl:h-96"
        />
      </div>
      <div className="w-full md:w-1/2 px-4 sm:px-12 lg:w-1/3 py-12 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-4">Create an account</h1>
            <p className="text-xs font-medium mb-2 pl-2">
              Enter your details below
            </p>
          </div>

          {pending ? (
            <div className="flex justify-center h-60">
              <Spinner label="Loading..." color="danger" labelColor="danger" />
            </div>
          ) : (
            <div className="flex flex-col gap-y-2">
              <Input
                value={formInput.name}
                onChange={handleInputChange}
                type="text"
                variant="flat"
                label="Name"
                name="name"
                required={true}
                className="py-1"
              />
              <Input
                value={formInput.email}
                onChange={handleInputChange}
                type="email"
                variant="flat"
                label="Email"
                required
                name="email"
                className="py-1"
              />
              <Input
                value={formInput.phoneNumber}
                onChange={handleInputChange}
                type="number"
                variant="flat"
                label="Phone No."
                required
                name="phoneNumber"
                className="py-1"
              />
              <Input
                label="Password"
                variant="flat"
                name="password"
                required
                value={formInput.password}
                onChange={handleInputChange}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeIcon className="text-2xl w-5 h-5 mb-2 text-default-400 pointer-events-none" />
                    ) : (
                      <EyeSlashIcon className="text-2xl w-5 h-5 mb-2 text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="py-1"
              />
            </div>
          )}

          {error && (
            <span className=" text-red-500 text-xs rounded-md">{error}</span>
          )}

          <div className="flex flex-col my-8 gap-y-2">
            <Button
              type="submit"
              radius="sm"
              className="bg-red-500 w-full text-white"
            >
              Create Account
            </Button>
            <Button
              type="button"
              radius="sm"
              color="default"
              className="w-full"
            >
              Sign Up with Google
            </Button>
          </div>

          <div className="flex justify-center gap-x-2 text-sm">
            <p>Already have an account?</p>
            <Link className="font-semibold" href={"/login"}>
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
