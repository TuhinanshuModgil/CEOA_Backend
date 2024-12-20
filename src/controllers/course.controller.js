import { fileURLToPath } from "url";
import path from "path";
import fs from "node:fs";
import { Course } from "../models/course.model.js";
// console.log("this is dirname: ", dirname(__filename))
// console.log("This is log:", __dirname)
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const addCourse = async (req, res) => {
  try {
    const { body, file } = req;
    // console.log("file: ", file)
    // const filePath = path.resolve(__dirname, "../../files", req.file.filename);

    const fileBuffer = req?.file?.buffer;
//     // Read the file and convert to Base64
    // const fileData = fs.readFileSync(filePath);
    // const base64Image = fileData? fileData.toString("base64"): null
    const base64Image = fileBuffer?.toString("base64");
    const base64Prefix = `data:${req?.file?.mimetype};base64,${base64Image}`;

    // Convert the uploaded image to base64
    // const base64Image = file
    //   ? fs.readFileSync(file.path, { encoding: "base64" })
    //   : null;

    const courseData = {
      ...body,
      image: base64Image
        ? { data: base64Prefix, contentType: file.mimetype }
        : null,
      faculties: JSON.parse(body.faculties),
      eligibility: JSON.parse(body.eligibility),
      paymentLinks: JSON.parse(body.paymentLinks),
    };

    const newCourse = new Course(courseData);
    await newCourse.save();
    // fs.unlinkSync(filePath);

    res.status(201).json({ message: "Course added successfully", data:newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Failed to add course: " + error.message, error });
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
    res.status(500).json({ message: "Error getting course: " + error.message, error });
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
    res.status(500).json({ message: "Error getting course: "+ error.message, error });
  }
};

// Edit an existing course
export const editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, file } = req;
    // console.log("File:", file)
    let base64Image = null 
    let base64Prefix = null
    let filePath = null
    if(file){
      // filePath = path.resolve(__dirname, "../../files", req?.file?.filename);
      const fileBuffer = req.file.buffer;

//     // Read the file and convert to Base64
      // const fileData = fs.readFileSync(filePath);
      base64Image = fileBuffer?.toString("base64");
      base64Prefix = `data:${req?.file?.mimetype};base64,${base64Image}`;
    }
    
    // Convert the uploaded image to base64 if provided
    // let base64Image = null;
    // if (file) {
    //   base64Image = fs.readFileSync(file.path, { encoding: "base64" });
    // }

    const updatedData = {
      ...body,
      image: base64Image
        ? { data: base64Prefix, contentType: file.mimetype }
        : undefined, // If no image uploaded, keep the existing one
      faculties: JSON.parse(body.faculties),
      eligibility: JSON.parse(body.eligibility),
      paymentLinks: JSON.parse(body.paymentLinks),
    };

    const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    // if(filePath){

    //   fs.unlinkSync(filePath);
    // }

    res.status(200).json({ message: "Course updated successfully", data:updatedCourse });
  } catch (error) {
    console.error("Error editing course:", error);
    res.status(500).json({ message: "Failed to edit course: "+ error.message, error });
  }
};