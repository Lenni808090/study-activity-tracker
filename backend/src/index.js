import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // Add this import

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import subjectRoutes from "./routes/subject.route.js";
import timetableRoutes from "./routes/timetable.route.js";
import homeworkRoutes from "./routes/homework.route.js";
import friendRequestRoutes from "./routes/friendrequest.route.js";
import socialRoutes from "./routes/social.route.js";
import gradesRoute from "./routes/grades.route.js"

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser()); // Add this middleware

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});

//routes 
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/homework", homeworkRoutes)
app.use("/api/friend-requests", friendRequestRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/grades", gradesRoute);
