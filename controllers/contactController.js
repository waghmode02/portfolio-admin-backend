// controllers/contactController.js

import Contact from "../models/contactModel.js";

export const addcontact = async (req, res) => {
  try {
    const contactData = new Contact(req.body);
    if (!contactData) {
      return res.status(404).json({ msg: "Contact data not Found" });
    }

    const saveData = await contactData.save();
    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllContact = async (req, res) => {
  try {
    const userData = await Contact.find();
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Contact.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user not Exist" });
    }
    await Contact.findByIdAndDelete(id); // Corrected from User.findByIdAndDelete(id)
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
