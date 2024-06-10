import { auth } from "@/auth";
import connectMongoDB from "@/libs/mongodb";
import Order from "@/models/order";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      throw new Error("userId query parameter is missing");
    }

    const orders = await Order.find({ userId });

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching orders:", error.message);
    return NextResponse.json(
      {
        message: "An error occurred while fetching the orders.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { userId, products, totalAmount, shippingAddress, paymentMode } =
      body;
    await connectMongoDB();

    const newOrder = new Order({
      orderId: uuidv4(),
      userId,
      products,
      totalAmount,
      shippingAddress: shippingAddress[0],
      paymentMethod: paymentMode,
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Product ordered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during order placement:", error);
    return NextResponse.json(
      {
        message: "An error occurred while placing the order.",
      },
      { status: 500 }
    );
  }
}
