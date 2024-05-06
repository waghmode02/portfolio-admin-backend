import Project from '../models/projectModel.js';
import Skill from '../models/skillModel.js';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME.trim();
const apiKey = process.env.CLOUDINARY_API_KEY.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET.trim();

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export const uploadProjectImage = async (req, res) => {
  try {

    const { title, description, githubPath, demoPath } = req.body;
    
    const uploadedFile = req.files.file;
    const cloudinaryUploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload(uploadedFile.tempFilePath, (error, result) => {
        if (error) {
          console.error(error);
          reject('Error uploading file to Cloudinary');
        } else {
          resolve(result.secure_url);
        }
      });
    });

    const cloudinaryImageUrl = await cloudinaryUploadPromise;

    const project = new Project({
      title,
      description,
      githubPath,
      demoPath,
      imagePath: cloudinaryImageUrl 
    });

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProject = async (req, res) => {
  try {
    const userData = await  Project.find();
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    else{
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    else{
  
      await Project.findByIdAndDelete(projectId);
  
      res.status(200).json({ success: true, message: 'Project deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { title, style } = req.body;
    
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const uploadSkill = req.files.file;
    const cloudinaryUploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload(uploadSkill.tempFilePath, (error, result) => {
        if (error) {
          console.error(error);
          reject('Error uploading file to Cloudinary');
        } else {
          resolve(result.secure_url);
        }
      });
    });

    const imageUrl = await cloudinaryUploadPromise;

    const skill = new Skill({
      title,
      style,
      imageScr: imageUrl
    });

    await skill.save();

    res.status(200).json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



