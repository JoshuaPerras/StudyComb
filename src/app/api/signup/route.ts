import { NextResponse } from "next/server";
import User from "@/models/UserSchema";

import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../config/mongodb";

// post handle for signup
export const POST = async (request: { json: () => PromiseLike<{ username: any; email: any; password: any; }> | { username: any; email: any; password: any; }; }) => {
  const {username, email, password} = await request.json();

  console.log(username, email, password); // Print out username, email, pw

  await connectMongoDB();
  const hashedPassword = await bcrypt.hash(password, 5); // encrypt password
  const newUser = { // newUser 
    username,
    password: hashedPassword,
    email
  }
  try {
    await User.create(newUser); // create a new user
  } catch (e: any) {
    return new NextResponse(e.message, { // failed
      status: 500,
    });
  }

  return new NextResponse("User has been created", { // succeeded
    status: 201,
  });

 }