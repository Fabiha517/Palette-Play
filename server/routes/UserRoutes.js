import {signup,login,getMe,updateProfile,updateProfilePhoto,changePassword,resetPassword,forgotPassword } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import express from "express"
import multer from "multer"
const upload = multer({
    storage: multer.memoryStorage(),
});
const router=express.Router()
router.post("/signup",signup)
router.post("/login",login)
router.get("/me",authMiddleware,getMe)
router.put("/profile",authMiddleware,updateProfile)
router.put("/profile/photo",authMiddleware,upload.single("image"),updateProfilePhoto,
);
router.put("/change-password",authMiddleware,changePassword)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword)
export default router