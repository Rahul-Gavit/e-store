"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input, Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formInput, setFormInput] = useState(initialValues);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");

    const { email, password } = formInput;

    if (!email || !password) {
      setError("All fields are necessary!");
      setPending(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      setPending(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      setPending(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password!");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("An error occurred during login:", err);
      setError("An error occurred during login: " + err.message);
    } finally {
      setPending(false);
    }
  };

  const toggleVisibility = () => setIsVisible((prevVisible) => !prevVisible);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000); // Clear the error message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-around my-24 max-md:px-10">
      <div className="max-lg:hidden shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-lg p-12 -rotate-6">
        <img src="/login.svg" alt="NA" className="w-72 h-72 xl:w-96 xl:h-96" />
      </div>
      <div className="w-full md:w-1/2 px-4 sm:px-12 lg:w-1/3 py-6 md:py-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold">Log in to Exclusive</h1>
            <p className="text-xs font-medium">Enter your details below</p>
          </div>

          <div className="flex flex-col gap-y-2 mt-4 md:my-6">
            {pending ? (
              <div className="flex justify-center h-60">
                <Spinner
                  label="Loading..."
                  color="danger"
                  labelColor="danger"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-y-2">
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
              <span className="text-red-500 text-xs rounded-md">{error}</span>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 md:my-8">
            <Button type="submit" radius="sm" className="bg-red-500 text-white">
              Login
            </Button>
            <Link href="/forgot-password" className="text-sm text-red-500">
              Forget Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
