import { Contact } from "../db/models/Contact.js";

export const findAllContacts = (owner) => Contact.find({ owner });

export const addContact = (owner, contactData) =>
  Contact.create({ owner, ...contactData });

export const removeContact = (owner, _id) =>
  Contact.findByIdAndDelete({ owner, _id });
