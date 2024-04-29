import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Contact name"],
    },
    phone: {
      type: String,
      required: [true, "Phone number of the contact"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Contact = model("contact", contactSchema);
