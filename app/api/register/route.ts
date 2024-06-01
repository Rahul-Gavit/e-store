import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { v4 as uuidv4 } from "uuid";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  const body = await req.json();
  const { name, email, password, phoneNumber } = body;

  await connectMongoDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    userId: uuidv4(),
    name,
    email,
    password: hashPassword,
    phoneNumber,
  });

  try {
    await newUser.save();
    return new NextResponse("User registered", { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      {
        message: "An error occurred while registering user.",
      },
      { status: 500 }
    );
  }
}
