
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js"
import projectRoutes from "./routes/ProjectRoutes.js"
import imageRoutes from "./routes/imageRoute.js"
import pollinationsRoutes from "./routes/PollinationsRoutes.js"
import User from "./models/User.js";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users",UserRoutes)
app.use("/projects",projectRoutes)
app.use("/images",imageRoutes)
app.use("/ai",pollinationsRoutes)
connectDB()
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>{
    console.log(`Server running on port ${PORT}`);
});