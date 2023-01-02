import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
const Users = mongoose.model("Users", userSchema);

export default Users;
