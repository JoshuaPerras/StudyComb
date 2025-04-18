import mongoose, { Schema, Document, Model } from "mongoose";

// Mongoose provides properties such as the _id in Document, we extend this
interface IRoom extends Document {
  name: string;
  location?: string;
  rating?: number;
  description?: string;
  url?: string;
}

const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
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
  },
}, { collection: "studyRooms" });

const Item: Model<IRoom> = mongoose.models.Item || mongoose.model<IRoom>("Room", roomSchema);
export default Item;
