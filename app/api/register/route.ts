import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { userSchema } from "@/app/schemas/userSchema";

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface UserRequestBody {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: Address;
}

export async function POST(req: NextRequest) {
  try {
    const body: UserRequestBody = await req.json();

    // Validate request body against userSchema
    const { name, email, password, phoneNumber, address } =
      userSchema.parse(body);

    await connectMongoDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      userId: uuidv4(),
      name,
      email,
      password: hashPassword,
      phoneNumber,
      address: ?address ?? {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    });

    // Save the new user to the database
    await newUser.save();

    return new NextResponse("User registered", { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error);
    return new NextResponse("An error occurred while registering user.", {
      status: 500,
    });
  }
}
