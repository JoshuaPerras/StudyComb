import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

// purpose is to get the favorite location from users collection
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
 
  // return 400 if username is missing
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }
  
  const uri = process.env.MONGODB_URI;
 
  // return 500 if mongodb uri is not defined in environment variables
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
    // connect to the mongodb database
    await client.connect();
    
    const database = client.db('test');
    const usersCollection = database.collection('Users');
    
    // find the user by username
    const user = await usersCollection.findOne({ username });
   
    // return 404 if user not found
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // get the array of favorite location ids
    const favoriteIds = user.favorites || [];
   
    // return early if no favorites
    if (favoriteIds.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        locations: []
      });
    }
   
    // convert each favorite id to an ObjectId
    const objectIds = favoriteIds.map(id => {
      return typeof id === 'string' ? new ObjectId(id) : id;
    });
   
    const studySpotsCollection = database.collection('studyRooms');
    
    // find all study rooms that match the favorite ids
    const locations = await studySpotsCollection.find({
      _id: { $in: objectIds }
    }).toArray();
   
    // prepare the response with locations data
    const response = {
      success: true,
      count: locations.length,
      locations
    };
    
    return NextResponse.json(response);
  } catch (error) {
    // handle any unexpected errors during the process
    return NextResponse.json({
      error: 'Failed to fetch favorite locations',
      message: error instanceof Error ? error.message : 'error occurred'
    }, { status: 500 });
  } finally {
    // always close the mongodb client connection
    await client.close();
  }
}
