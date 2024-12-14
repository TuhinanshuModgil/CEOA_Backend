import { fileURLToPath } from "url";
import path from "path";
import fs from "node:fs";
import { Course } from "../models/course.model.js";
// console.log("this is dirname: ", dirname(__filename))
// console.log("This is log:", __dirname)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const addCourse = async (req, res) => {
  try {
    // Form fields
    const {
      name,
      mode,
      courseCode,
      description,
      imageAlt,
      faculties,
      eligibility,
      startDate,
      endDate,
      programName,
      paymentInstructions,
      brocherLink,
      paymentLinks,
      status,
    } = req.body;
    console.log("reached here: ", name, courseCode);

    // Image file
    const imageFile = req.file;
    console.log("type of ", imageFile.path);
    // getting the absolute path to image
    const filePath = path.resolve(__dirname, "../../files", req.file.filename);

    // Read the file and convert to Base64
    const fileData = fs.readFileSync(filePath);
    const base64Image = fileData.toString("base64");
    const base64Prefix = `data:${req.file.mimetype};base64,${base64Image}`;
    console.log("this is image: ", base64Image.slice(10, 20));
    // deleting the image from the file ones its converted
    fs.unlinkSync(filePath);

    // Parse arrays from JSON strings
    const parsedFaculties = JSON.parse(faculties || "[]");
    const parsedEligibility = JSON.parse(eligibility || "[]");
    const pardedPaymentLinks = JSON.parse(paymentLinks || "[]");

    // Simulate saving to database
    const course = {
      name,
      mode,
      courseCode,
      description,
      image: {
        data: base64Prefix,
        contentType: req.file.mimetype,
      },
      imageAlt,
      faculties: parsedFaculties,
      eligibility: parsedEligibility,
      startDate,
      programName,
      endDate,
      paymentInstructions,
      paymentLinks: pardedPaymentLinks,
      brocherLink,
      status,
    };
    console.log("This is course: ", course);

    const newCourse = await Course.create(course);
    // Simulated response (replace with database save logic)
    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating course", error });
  }
};

export const getCourses = async (req, res) => {
  try {
    const programName = req.params.id;
    const courses = await Course.find({ programName: programName }).select(
      "-faculties -eligibility -paymentInstructions -paymentLinks -brocherLink"
    );

    if (!courses) courses = [];
    // console.log(": ", courses);
    res.status(200).json({ message: "successfully", data: courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting course", error });
  }
};

export const getCourse = async (req, res) => {
  try {
    console.log("Reached getCourse ");
    const courseId = req.params.id
    const course = await Course.findById(courseId)
    if(course){
        res.status(200).json({ message: "successfully", data: course });
    }
    else{
        res.status(404).json({ message: "course not found"});
    }
    // res.status(200).json({ message: "successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting course", error });
  }
};
