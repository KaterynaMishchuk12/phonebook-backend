import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import path from "path";

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/userRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const tempDir = path.join(_dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
});
const upload = multer({
  storage: multerConfig,
});

app.use("/users", upload, usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
