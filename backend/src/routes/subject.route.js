import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();


router.post("/createSubject",protectRoute, createSubject);
router.post("/deleteSubject",protectRoute, deleteSubject);
router.get("/getSubjects",protectRoute, getSubjects);
router.post("/updateStudyDuration", protectRoute, updateStudyDuration);


export default router;