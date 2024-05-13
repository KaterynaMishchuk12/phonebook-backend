import express from "express";
import {
  current,
  login,
  logout,
  registerUser,
  updateName,
} from "../controllers/userController.js";
import {
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
} from "../schemas/userSchema.js";
import validateBody from "../helpers/validateBody.js";
import { authentification } from "../middleware/authentification.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerUserSchema), registerUser);
usersRouter.post("/login", validateBody(loginUserSchema), login);
usersRouter.post("/logout", authentification, logout);
usersRouter.get("/current", authentification, current);
usersRouter.patch(
  "/name",
  authentification,
  validateBody(updateUserSchema),
  updateName
);

export default usersRouter;
