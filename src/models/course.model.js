import mongoose from "mongoose";
import { linkSchema } from "./link.model.js";

// Schema for the Course Model
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mode: {
    type: String,
    enum: ["Online", "Offline", "Hybrid"], // Predefined modes
    required: true,
  },
  status: {
    type: String, 
    enum: ["upcoming", "ongoing", "previous"],
    required: true
  },
  programName: {
    type: String,
    requuired: true,
  },
  courseCode: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    data: String, // Base64 string
    contentType: String, // Image MIME type
  },
  imageAlt: {
    type: String,
    trim: true,
    default: "",
  },
  faculties: {
    type: [String], // Array of faculty names
    required: true,
  },
  eligibility: {
    type: [String], // Array of eligibility descriptions
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  paymentInstructions: {
    type: String,
    trim: true,
    required: true,
  },
  paymentLinks: [linkSchema], // Array of paymentLink objects
  brocherLink: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid URL!`,
    // },
    required: true,
  },
});

// Create the Course Model
export const Course = mongoose.model("Course", courseSchema);
