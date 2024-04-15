import { User } from "../db/models/User.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const updateUserToken = async (id) => {
  const token = jwt.sign({ id }, SECRET_KEY);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });

  return user;
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  await newUser.save();
  const userUpdate = await updateUserToken(newUser._id);
  return userUpdate;
};
