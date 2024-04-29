import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUserById } from "../services/userServices.js";

const { SECRET_KEY } = process.env;

export const authentification = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw HttpError(401, "Not authorization");
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await findUserById(id);

    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorization");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
