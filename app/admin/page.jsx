"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Admin = () => {
  const [loading, setLoading] = useState(false);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { image, ...formDataWithoutImage } = formData;

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

  return (
    <div className="m-12 flex justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-10 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:w-1/2">
          <form onSubmit={handleSubmit}>
            <p className="mb-2">Add Products</p>
            <div className="grid grid-cols-2  gap-4">
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
              <Input
                type="text"
                name="category"
                label="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                classNames={{
                  label: ["font-medium"],
                }}
                labelPlacement="outside"
              />

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
              <Input
                type="text"
                name="color"
                label="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
                classNames={{
                  label: ["font-medium"],
                }}
                labelPlacement="outside"
              />
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
                Add more
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
      )}
    </div>
  );
};

export default Admin;
