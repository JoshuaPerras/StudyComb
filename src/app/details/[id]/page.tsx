import { MongoClient, ObjectId } from 'mongodb';
import '../Details.css';

// array setup
type StudyRoom = {
  _id: string;
  name: string;
  url: string;
  rating: number;
  location: string;
  description: string;
};

async function getStudyRoom(id: string): Promise<StudyRoom | null> { // grabs study room by object id 
  // grab Mongodb uri from .env.local
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db('test'); // database var
    const collection = db.collection('studyRooms'); // collection var
    const studyRoom = await collection.findOne({ _id: new ObjectId(id) }); // object id var

    if (!studyRoom) return null; // if objectid is not found

    return { // else return all info 
      _id: studyRoom._id.toString(),
      name: studyRoom.name,
      url: studyRoom.url,
      rating: studyRoom.rating,
      location: studyRoom.location,
      description: studyRoom.description,
    };
  } finally {
    await client.close();
  }
}

interface PageProps { // specify param
  params: {
    id: string;
  };
}

export default async function Details(props: PageProps) {
    const { id } = await props.params; 
    const studyRoom = await getStudyRoom(id); // export info of study room

  if (!studyRoom) { // display study room not found if invalid
    return <div className="page-container"><p>Study room not found.</p></div>;
  }

  return ( // ui skeleton of details page, replaced with specific info of each studyroom 
    <div className="page-container"> 
      <section className="details">
        <h2 className="title">{studyRoom.name}</h2> 

        <div className="imageCard">
          <img src={studyRoom.url} alt={studyRoom.name} />
        </div>

        <div className="rating-container">
            {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>
                {i < Math.round(studyRoom.rating) ? '★' : '☆'}
            </span>
            ))}
        </div>

        <div className="location">
          <h4>{studyRoom.location}</h4>
        </div>

        <p>{studyRoom.description}</p>
      </section>
    </div>
  );
}
