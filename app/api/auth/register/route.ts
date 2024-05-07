import User from "@/models/user";
import connectToDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  await connectToDB();

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    console.error("Error during user registration:", error);
    return new NextResponse("Failed to register user", { status: 500 });
  }
};
