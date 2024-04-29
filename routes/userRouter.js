import express from "express";
import { login, registerUser } from "../controllers/userController.js";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchema.js";
import validateBody from "../helpers/validateBody.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerUserSchema), registerUser);
usersRouter.post("/login", validateBody(loginUserSchema), login);
usersRouter.post("/logout");
usersRouter.get("/current");

export default usersRouter;
