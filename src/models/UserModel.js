import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "member",
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("users", UserSchema);
export default User;
