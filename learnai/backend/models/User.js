import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: false,
  }
});

const User = model("User", userSchema);
export default User;