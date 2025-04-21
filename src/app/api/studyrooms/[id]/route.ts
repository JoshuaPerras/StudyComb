import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 });
  }

  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db(); // your database name
    const collection = db.collection('studyrooms'); // your collection name

    const studyRoom = await collection.findOne({ name });

    if (!studyRoom) {
      return NextResponse.json({ error: 'Study room not found' }, { status: 404 });
    }

    return NextResponse.json(studyRoom);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  } finally {
    await client.close();
  }
}