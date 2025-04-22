import mongoose, { Schema, Document, Model } from "mongoose";

interface IRoom extends Document {
  name: string;
  location?: string;
  rating?: number;
  description?: string;
  url?: string;
  tags?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: false,
    unique: true,
  },
  tags: {
    type: [String],
    default: []
  },
  coordinates: {
    lat: {
      type: Number,
      default: 33.9425 
    },
    lng: {
      type: Number,
      default: -83.3724 
    }
  }
  
}, { collection: "studyRooms" });

const Item: Model<IRoom> = mongoose.models.Room || mongoose.model<IRoom>("Room", roomSchema);
export default Item;