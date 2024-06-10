"use client";

import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import axios from "axios";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const categories = [
  "mobiles",
  "headphones",
  "watches",
  "televisions",
  "homelifestyles",
  "electronics",
  "groceries",
];

const colors = ["black", "white", "gray", "red", "blue", "golden", "silver"];

const Admin = () => {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const userMail = session?.user?.email;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stockQuantity: "",
    color: "",
  });
  const [imageArray, setImageArray] = useState([]);

  const handleChange = (e) => {
    console.log(e.target);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { image, ...formDataWithoutImage } = formData;

      if (
        !formData.name ||
        !formData.price ||
        !formData.description ||
        !formData.category ||
        !formData.stockQuantity ||
        !formData.color
      ) {
        setError("All fields are required!");
        setLoading(false);

        return;
      }

      const requestData = {
        ...formDataWithoutImage,
        images: imageArray, // Add imageArray to the request data
      };
      const response = await axios.post("/api/products", requestData);
      if (response.status === 201) {
        console.log("Product created successfully");
        // Reset the form after successful submission
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          images: [],
          stockQuantity: "",
          color: "",
        });
        // Clear image array after submission
        setImageArray([]);
        setError("");
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const addMoreImages = (image) => {
    setImageArray([...imageArray, image]);
    formData.image = "";
    console.log(imageArray);
  };

  const removeImage = (index) => {
    setImageArray(imageArray.filter((_, idx) => idx !== index));
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading state to false after fetching data
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      if (response.status === 200) {
        // If deletion is successful, update the products state to remove the deleted product
        setProducts(
          products.filter((product) => product.productId !== productId)
        );
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-6 my-12 md:m-12">
      {!loading && userMail === "rahul123@gmail.com" ? (
        <div className="flex  flex-col max-xl:items-center gap-4 xl:flex-row xl:justify-around">
          <div className="px-5 py-10 sm:p-10 rounded-xl sm:w-max shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-fit ">
            <form onSubmit={handleSubmit}>
              <p className="mb-6 font-medium text-gray-800">Add Products</p>
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                <Input
                  type="text"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="name"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />
                <Input
                  type="text"
                  label="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="price"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />
                <Input
                  type="text"
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="description"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />

                <Select
                  label="category"
                  name="category"
                  placeholder="Select category"
                  labelPlacement="outside"
                  className="max-w-xs "
                  value={formData.category}
                  onChange={handleChange}
                  classNames={{ label: "font-medium" }}
                >
                  {categories.map((category, index) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  type="number"
                  name="stockQuantity"
                  label="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />

                <Select
                  label="color"
                  name="color"
                  placeholder="Select color"
                  labelPlacement="outside"
                  className="max-w-xs "
                  value={formData.color}
                  onChange={handleChange}
                  classNames={{ label: "font-medium" }}
                >
                  {colors.map((color, index) => (
                    <SelectItem key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex items-end gap-x-4 my-4">
                <Input
                  type="text"
                  name="image"
                  label="Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image"
                  classNames={{
                    label: ["font-medium"],
                  }}
                  labelPlacement="outside"
                />
                <Button
                  onClick={() => addMoreImages(formData.image)}
                  type="button"
                  radius="sm"
                  className="bg-red-500 px-8 text-white border-none"
                >
                  Add
                </Button>
              </div>
              {/* Render images */}
              <div className="flex flex-wrap gap-4">
                {imageArray.length > 0 &&
                  imageArray.map((img, index) => (
                    <div
                      className="flex items-center gap-x-2 px-6 py-2 rounded-full bg-gray-100"
                      key={index}
                    >
                      <span className="text-sm">{img}</span>
                      <span
                        onClick={() => removeImage(index)}
                        className="cursor-pointer"
                      >
                        <XMarkIcon className="h-5 w-5 text-red-500 " />
                      </span>
                    </div>
                  ))}
              </div>
              {error && (
                <span className="text-red-500 text-xs rounded-md">{error}</span>
              )}

              <div className="flex justify-end gap-x-2 mt-4">
                <div>
                  <Button radius="sm" variant="bordered" className="px-8">
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    radius="sm"
                    className="bg-red-500 px-8 text-white border-none"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="px-5 py-10 sm:p-10 rounded-xl sm:w-max shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <p className="mb-6 font-medium text-gray-800">Product List</p>

            <div className="space-y-4">
              {products.map((product) => (
                <div
                  className="flex items-center max-md:gap-x-2 justify-between border rounded-lg cursor-pointer px-4 py-2"
                  key={product.productId}
                >
                  <p className="text-xs flex">{product.name}</p>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product.productId)}
                    className="bg-white border p-2 rounded-lg hover:bg-gray-100"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="flex justify-center h-60">
              <Spinner label="Loading..." color="danger" labelColor="danger" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="/No data.svg"
                alt="No Data"
                className="w-16 h-16 sm:h-96 sm:w-auto  p-2 "
              />
              <p className="text-base font-medium">Your not admin </p>
              <p className="text-sm font-light">
                Don't have permission to access admin panel
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
