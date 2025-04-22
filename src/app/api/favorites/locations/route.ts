import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
 
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }
  
  const uri = process.env.MONGODB_URI;
 
  if (!uri) {
    return NextResponse.json({ error: 'MongoDB URI error' }, { status: 500 });
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
    const usersCollection = database.collection('Users');
    
    const user = await usersCollection.findOne({ username });
   
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const favoriteIds = user.favorites || [];
   
    if (favoriteIds.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        locations: []
      });
    }
   
    const objectIds = favoriteIds.map(id => {
      return typeof id === 'string' ? new ObjectId(id) : id;
    });
   
    const studySpotsCollection = database.collection('studyRooms');
    
    const locations = await studySpotsCollection.find({
      _id: { $in: objectIds }
    }).toArray();
   
    const response = {
      success: true,
      count: locations.length,
      locations
    };
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch favorite locations',
      message: error instanceof Error ? error.message : 'error occurred'
    }, { status: 500 });
  } finally {
    await client.close();
  }
}