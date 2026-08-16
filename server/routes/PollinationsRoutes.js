

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateImages,connectPollinations,pollinationsCallback,getPollinationsStatus } from "../controllers/pollinationsController.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateImages);
router.get("/connect",authMiddleware,connectPollinations)
router.get("/callback",pollinationsCallback)
router.get("/status",authMiddleware,getPollinationsStatus)
export default router;