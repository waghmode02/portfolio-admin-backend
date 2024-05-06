import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false // Making title optional
  },
  style: {
    type: String,
    required: false // Making style optional
  },
  imageScr: {
    type: String,
    required: true
  }
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
