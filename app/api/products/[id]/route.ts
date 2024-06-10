import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  try {
    const { id } = params;

    await connectMongoDB();

    const product = await Product.findOne({ _id: id });

    if (!product) {
      throw new Error("Product not found");
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching product:", error.message);
    return NextResponse.json(
      {
        message: "An error occurred while fetching the product.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any, { params }: any) {
  try {
    const { id } = params;

    await connectMongoDB();

    const product = await Product.findOneAndDelete({ productI: id });

    if (!product) {
      throw new Error("Product not found");
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting product:", error.message);
    return NextResponse.json(
      {
        message: "An error occurred while deleting the product.",
      },
      { status: 500 }
    );
  }
}
