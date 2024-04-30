import mongoose from "mongoose";
const { Schema } = mongoose;

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

const User = mongoose.models.User
  ? mongoose.models.User
  : mongoose.model("User", userSchema);

export default User;
