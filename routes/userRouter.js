import express from "express";
import { registerUser } from "../controllers/userController.js";
import { registerUserSchema } from "../schemas/userSchema.js";
import { validateBody } from "../helpers/validateBody.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerUserSchema), registerUser);
usersRouter.post("/login");
usersRouter.post("/logout");
usersRouter.get("/current");

export default usersRouter;
