import mongoose, { Document, Model, ObjectId } from "mongoose";
const { Schema } = mongoose;

export interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  creator: ObjectId;
}

const postSchema = new Schema(
  {
    title: { required: true, type: String, minLength: 3 },
    description: { required: true, type: String, minLength: 10 },
    image: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

type PostModel = Model<IPost>;

const Post: PostModel =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
