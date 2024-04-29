import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("user", userSchema);
