import {
  createUser,
  findUserByEmail,
  removeToken,
  updateUserToken,
  updateUserName,
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

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await removeToken(_id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const current = (req, res) => {
  const { email, name } = req.user;

  res.json({ email, name });
};

export const updateName = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const nameUserUpdate = await updateUserName(_id, req.body);

    res.json({ email: nameUserUpdate.email, name: nameUserUpdate.name });
  } catch (error) {
    next(error);
  }
};
