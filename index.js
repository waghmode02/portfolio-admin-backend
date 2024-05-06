import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import route from './routes/portfolioRoute.js';
import fileUpload from "express-fileupload";
dotenv.config({path:".env"});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles:true
}))


const PORT = process.env.PORT || 3000;
const URL = process.env.MONGODB_URI;

mongoose.connect(URL, {})
    .then(() => {
        console.log("DB Connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port :${PORT}`);
        });
    })
    .catch(error => {
        console.error("MongoDB connection error:", error);
        process.exit(1); 
    });

app.use("/api", route);

export default app;
