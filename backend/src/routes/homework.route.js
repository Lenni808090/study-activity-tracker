import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"
import { addHomework, getHomework } from "../controllers/homework.controller.js";
const router = express.Router();

router.post(`/addHomework/`,protectRoute,  addHomework);
router.get(`/getHomework/`,protectRoute,  getHomework);

export default router;