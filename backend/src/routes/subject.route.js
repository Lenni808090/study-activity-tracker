import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"
import {createSubject, deleteSubject, getSubjects, updateStudyDuration, editSubject} from "../controllers/subject.controller.js";

const router = express.Router();


router.post("/createSubject",protectRoute, createSubject);
router.post("/deleteSubject",protectRoute, deleteSubject);
router.get("/getSubjects",protectRoute, getSubjects);
router.post("/updateStudyDuration", protectRoute, updateStudyDuration);
router.post("/editSubject", protectRoute, editSubject)


export default router;