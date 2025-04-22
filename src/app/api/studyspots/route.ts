import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

// get handle for study spots
export async function GET() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    return NextResponse.json({ error: 'mongo URI error' }, { status: 500 });
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    
    const database = client.db('test');
    const collection = database.collection('studyRooms');
    
    const studySpots = await collection.find({}).toArray();
    
    return NextResponse.json({
      success: true,
      count: studySpots.length,
      studySpots
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch study spots',
      message: error instanceof Error ? error.message : 'idk why its not working'
    }, { status: 500 });
  } finally {
    await client.close();
  }
}