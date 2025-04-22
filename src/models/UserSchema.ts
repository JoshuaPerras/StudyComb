import mongoose, { Document, Schema, Model} from "mongoose";
import { Interface } from "readline";

export interface IUser extends Document {
    username: string;
    email: string;
    password: String;
    favorites: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Room",
            default: [],
        }
    ]
}, { collection: "Users" });
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;