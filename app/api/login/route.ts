import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any, res: any) {
  try {
    const body = await req.json();
    const { email, password } = body;

    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Invalid email or password", { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse("Invalid email or password", { status: 400 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("An error occurred during login:", error);
    return new NextResponse("An error occurred during login", { status: 500 });
  }
}
