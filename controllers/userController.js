import {
  createUser,
  findUserByEmail,
  updateUserToken,
} from "../services/userServices.js";
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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const comparePasswordUser = await user.comparePassword(password);

    if (!comparePasswordUser) {
      throw HttpError(401, "Email or password is wrong");
    }

    const userUpdateToken = await updateUserToken(user._id);

    res.json({
      user: {
        name: user.name,
        email,
      },
      token: userUpdateToken.token,
    });
  } catch (error) {
    next(error);
  }
};
