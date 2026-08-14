import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/imageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    "/upload",
    authMiddleware,
    upload.single("image"),
    uploadImage
);

export default router;