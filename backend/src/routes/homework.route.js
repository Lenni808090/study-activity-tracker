import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"
import { addHomework, getHomework, getEveryHomework, completeHomework } from "../controllers/homework.controller.js";
const router = express.Router();

router.post(`/addHomework/`, protectRoute, addHomework);
router.get(`/getHomework/:subjectId`, protectRoute, getHomework);
router.get(`/getEveryHomework`, protectRoute, getEveryHomework);
router.post("/completeHomework", protectRoute, completeHomework);
export default router;