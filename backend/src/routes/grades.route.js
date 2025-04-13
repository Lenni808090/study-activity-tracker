import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import {saveWrittenGrade, saveSpokenGrade, getGrades } from "../controllers/grades.controller.js";

router.post("/saveWrittenGrade", protectRoute, saveWrittenGrade);
router.post("/saveSpokenGrade", protectRoute, saveSpokenGrade);
router.get("/getGrades/", protectRoute, getGrades)

export default router;