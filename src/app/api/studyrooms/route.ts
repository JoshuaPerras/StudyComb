import connectMongoDB from "../../../../config/mongodb";
import Room from "../../../models/studyroomSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {name, location, rating, description, url, tags } = await request.json();
  await connectMongoDB();
  await Room.create({name, location, rating, description, url, tags});
  return NextResponse.json({ message: "Room added successfully" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const items = await Room.find();
    return NextResponse.json({ Room });
  }
