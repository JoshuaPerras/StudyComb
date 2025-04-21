import { MongoClient, ObjectId } from 'mongodb';
import '../Details.css';

type StudyRoom = {
  _id: string;
  name: string;
  url: string;
  rating: number;
  location: string;
  description: string;
};

async function getStudyRoom(id: string): Promise<StudyRoom | null> {
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('studyRooms');
    const studyRoom = await collection.findOne({ _id: new ObjectId(id) });

    if (!studyRoom) return null;

    return {
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

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Details(props: PageProps) {
    const { id } = await props.params; 
    const studyRoom = await getStudyRoom(id);

  if (!studyRoom) {
    return <div className="page-container"><p>Study room not found.</p></div>;
  }

  return (
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
