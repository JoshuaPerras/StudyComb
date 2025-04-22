import connectMongoDB from '../../../../config/mongodb';
import { NextResponse } from "next/server";
import User from "@/models/UserSchema";

// handles post request to add a study room to user's favorites
export const POST = async (req: Request) => {
  const { username, studyRoomId } = await req.json();

  // return 400 if required data is missing
  if (!username || !studyRoomId) {
    return new NextResponse("Missing data", { status: 400 });
  }

  // connect to mongodb
  await connectMongoDB();

  try {
    // find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      // return 404 if user does not exist
      return new NextResponse("User not found", { status: 404 });
    }

    // add studyRoomId to the user's favorites array, avoiding duplicates
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { favorites: studyRoomId }
    });

    // return success response
    return new NextResponse("Added to favorites", { status: 200 });
  } catch (err: any) {
    // log error and return 500 response on failure
    console.error("Error adding favorite:", err);
    return new NextResponse("Error adding favorite", { status: 500 });
  }
};
