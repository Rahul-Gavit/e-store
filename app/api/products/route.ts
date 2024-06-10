import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Product from "../../../models/product";
import { v4 as uuidv4 } from "uuid";

// Function to fetch products
export async function GET(request: any) {
  await connectMongoDB();

  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Function to create a new product
export async function POST(req: any) {
  await connectMongoDB();

  try {
    const { name, price, description, category, images, stockQuantity, color } =
      await req.json();
    const newProduct = new Product({
      productId: uuidv4(),
      name,
      price,
      description,
      category,
      images,
      stockQuantity,
      color,
    });
    await newProduct.save();
    return new NextResponse("Product Created", { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "An error occurred while creating product." },
      { status: 500 }
    );
  }
}
