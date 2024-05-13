// import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

import {
  findAllContacts,
  addContact,
  removeContact,
} from "../services/contactsServices.js";

import { isValidObjectId } from "mongoose";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const contacts = await findAllContacts(_id);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// export const getOneContact = (req, res) => {};

export const deleteContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const isValidId = isValidObjectId(id);

    if (!isValidId) {
      throw HttpError(404);
    }

    const deleteContact = await removeContact(_id, id);

    if (!deleteContact) {
      throw HttpError(404);
    }

    res.json(deleteContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const contact = await addContact(_id, req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

// export const updateContact = (req, res) => {};
