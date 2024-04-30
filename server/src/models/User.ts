import mongoose, { Document, Model, ObjectId } from "mongoose";
const { Schema } = mongoose;

export interface IUser extends Document {
  name: string;
  email: string;
  picture: string;
  posts: ObjectId[]; // Assuming posts are represented by an array of strings
  password: string; // Optional password field
}

const userSchema = new Schema({
  name: { required: true, type: String },
  email: { required: true, unique: true, type: String },
  password: {
    minLength: 8,
    type: String,
  },
  picture: {
    type: String,
    default: "https://vectorified.com/images/no-profile-picture-icon-14.png",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

type UserModel = Model<IUser>;

const User: UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
