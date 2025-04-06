import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"
import { addHomework, getHomework, getEveryHomework } from "../controllers/homework.controller.js";
const router = express.Router();

router.post(`/addHomework/`, protectRoute, addHomework);
router.get(`/getHomework/:subjectId`, protectRoute, getHomework);
router.get(`/getEveryHomework`, protectRoute, getEveryHomework);

export default router;