

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateImages } from "../controllers/pollinationsController.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateImages);

export default router;