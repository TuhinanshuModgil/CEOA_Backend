import { Program } from "../models/program.model.js";

export const addProgram = async (req, res) => {
  try {
    const { name, importantLinks, faqs, description, title, featuresDescription, 
      features } = req.body;
    // console.log("body: ", req.body)
    // const parsedLinks = JSON.parse(importantLinks)
    // const parsedFaqs = JSON.parse(faqs)

    const program = {
      name,
      title, 
      featuresDescription, 
      features, 
      importantLinks,
      faqs,
      description,
    };
    // check that no program with same name should be there 
    const sameNameProgram = await Program.findOne({name: name})
    if(sameNameProgram) {
      res.status(400).json({ message: "Program with same name already exists" });
      return
    }
  
    const programInstance = new Program(program);
    const createdProgram = await programInstance.save()
    if (createdProgram) {
      res.status(201).json({
        message: "Program created successfully",
        data: createdProgram,
      });
    } else {
      res.status(400).json({ message: "Failed to create program" });
    }
  } catch (error) {
    console.log("Error occured while creating program: ", error.message);
    res.status(500).json({
      message: "Server error while creating program",
    });
  }
};

export const getProgram = async (req, res) => {
  try {
    // get the program name in the id
    const { id } = req.params;

    console.log("this is id: ", id)
    // use the name to find the program
    const program = await Program.findOne({ name: id });

    // if the program is found then send its data

    if (program) {
      res.status(200).json({
        message: "Program found successfully",
        data: program,
      });
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    console.log("Error occured while getting program: ", error.message);
    res.status(500).json({ message: "Server error while getting program" });
  }
};


// Controller to edit a program
export const editProgram = async (req, res) => {
  try {
    const { id } = req.params; // Program ID from URL
    const updateData = req.body; // Updated fields from the request body
    console.log("This is updated data: ", updateData)
    // Find and update the program by ID
    const updatedProgram = await Program.findOneAndUpdate(
      {name: id},
      { $set: updateData }, // Dynamically set updated fields
      { new: true, runValidators: true } // Return updated document and validate schema
    );

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({
      message: 'Program updated successfully',
      program: updatedProgram,
    });

    
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ message: 'Failed to update program', error });
  }
};