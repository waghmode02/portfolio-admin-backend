// models/projectModel.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  githubPath: {
    type: String,
    required: true,
  },
  demoPath: {
    type: String,
    required: true,
  },
  imagePath: { // Renamed from imagePath to avoid confusion
    type: String,
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
