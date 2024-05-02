import crypto from "crypto";
import mongoose, { Document, Model, ObjectId } from "mongoose";
const { Schema } = mongoose;

export interface IUser extends Document {
  name: string;
  email: string;
  picture: string;
  posts: ObjectId[];
  password: string;
  passwordResetToken: string | undefined;
  passwordResetTokenExpire: Date | undefined;
  createPasswordResetToken: () => void;
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
  passwordResetToken: String,
  passwordResetTokenExpire: Date,
});

type UserModel = Model<IUser>;

userSchema.methods.createPasswordResetToken = async function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.passwordResetTokenExpire = Date.now() + 30 * 60 * 1000; //10 minutes
  return verificationToken;
};

const User: UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
