import { createUser, findUserByEmail } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await findUserByEmail(email);

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const newUser = await createUser(req.body);
    res.status(201).json({
      user: {
        name,
        email,
      },
      token: newUser.token,
    });
  } catch (error) {
    next(error);
  }
};
