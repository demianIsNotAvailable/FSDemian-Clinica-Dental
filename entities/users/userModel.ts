import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "DOCTOR", "ADMIN"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
