import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    // Connect to MongoDB
    await connectMongoDB;

    // Fetch products based on category slug
    const products = await Product.find({ category: slug });

    // Return products with a success status
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
