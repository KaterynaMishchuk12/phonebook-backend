import express from "express";
import {
  getAllContacts,
  // getOneContact,
  deleteContact,
  createContact,
  // updateContact,
} from "../controllers/contactsControllers.js";
import { authentification } from "../middleware/authentification.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authentification, getAllContacts);

contactsRouter.delete("/:id", authentification, deleteContact);

contactsRouter.post(
  "/",
  authentification,
  validateBody(createContactSchema),
  createContact
);

export default contactsRouter;
