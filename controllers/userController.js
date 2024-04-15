import { findUserByEmail } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "Email already in use");
    }
  } catch (error) {
    next(error);
  }
};
