// import contactsService from "../services/contactsServices.js";

import { findAllContacts } from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const contacts = await findAllContacts(_id);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
