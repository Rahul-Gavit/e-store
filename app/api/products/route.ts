import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Product from "../../../models/product";
import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
  // Connect to MongoDB
  await connectMongoDB();

  try {
    // Fetch products from the database
    const products = await Product.find({});

    // Return the fetched products as JSON response
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // If an error occurs, return an error response
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: any) {
  const body = await req.json();
  const { name, price, description, category, images, stockQuantity, color } =
    body;

  await connectMongoDB();
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

  try {
    await newProduct.save();
    return new NextResponse("Product Created", { status: 201 });
  } catch (error) {
    console.error("Error during product creation:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating product.",
      },
      { status: 500 }
    );
  }

  // const {
  //   title,
  //   price,
  //   description,
  //   category,
  //   image,
  //   rating,
  //   quantity,
  //   color,
  // } = await request.json();
  // await connectMongoDB();
  // await Product.create({
  //   title,
  //   price,
  //   description,
  //   category,
  //   image,
  //   rating,
  //   quantity,
  //   color,
  // });
  // return NextResponse.json({ message: "Product Created" }, { status: 201 });
}
