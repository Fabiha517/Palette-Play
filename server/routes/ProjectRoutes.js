import express from "express"
import { createProject,getProjects,deleteProject,getProjectById,addVersion } from "../controllers/projectController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router=express.Router()
router.get("/",authMiddleware,getProjects)
router.post("/",authMiddleware,createProject)
router.delete("/:id", authMiddleware, deleteProject);
router.get("/:id", authMiddleware, getProjectById);
router.post("/:projectId/versions",authMiddleware,addVersion)

export default router;