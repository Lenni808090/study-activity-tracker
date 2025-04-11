import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSubjectsofUser } from "../controllers/social.controller.js";

router.get("/subjects/:userId", protectRoute, getSubjectsofUser);

export default router;