import express from "express";
import { addcontact,getAllContact,deleteContact} from "../controllers/contactController.js";
import {getProject,uploadProjectImage,deleteProject, addSkill }from "../controllers/projectController.js"
import {getSkill,deleteSkill} from "../controllers/skillController.js"
const route = express.Router();
route.post("/addcontact", addcontact); 
route.get("/getallcontact",getAllContact); 
route.delete("/delete/:id", deleteContact);
route.post("/upload",uploadProjectImage);
route.get("/getproject",getProject)
route.delete("/deleteproject/:id",deleteProject);
route.post("/addskill",addSkill);
route.get("/getskill",getSkill);
route.delete("/deleteskill/:id",deleteSkill);
export default route
