import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());


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