import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"
import {saveTimetable, getTimetable} from "../controllers/timetable.controller.js"
const router = express.Router();

router.post("/saveTimetable",protectRoute, saveTimetable );
router.get("/getTimetable",protectRoute, getTimetable );

export default router;