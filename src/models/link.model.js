import mongoose from "mongoose";

export const linkSchema = new mongoose.Schema({
    linkName: {
      type: String,
      required: true, // Make this field mandatory
      trim: true, // Removes leading/trailing whitespace
    },
    linkDescription: {
      type: String,
      trim: true,
    },
    href: {
      type: String,
      required: true,
    //   validate: {
    //     validator: function (v) {
    //       // Basic URL validation
    //       return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
    //     },
    //     message: props => `${props.value} is not a valid URL!`,
    //   },
    },
  });