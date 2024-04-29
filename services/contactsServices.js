import { Contact } from "../db/models/Contact.js";

export const findAllContacts = (owner) => Contact.find({ owner });
