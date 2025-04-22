import connectMongoDB from '../../../../config/mongodb';
import { NextResponse } from "next/server";
import User from "@/models/UserSchema";

export const POST = async (req: Request) => {
  const { username, studyRoomId } = await req.json();

  if (!username || !studyRoomId) {
    return new NextResponse("Missing data", { status: 400 });
  }

  await connectMongoDB();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    await User.findByIdAndUpdate(user._id, {
      $addToSet: { favorites: studyRoomId }
    });

    return new NextResponse("Added to favorites", { status: 200 });
  } catch (err: any) {
    console.error("Error adding favorite:", err);
    return new NextResponse("Error adding favorite", { status: 500 });
  }
};
