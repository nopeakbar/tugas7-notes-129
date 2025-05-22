import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";

import "./models/UserModel.js";
import "./models/NoteModel.js";
import "./models/associations.js";

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true // ⚠️ izinkan semua origin, aman untuk testing tapi jangan dibiarkan untuk production
}));

app.use(express.json());

app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);

const PORT = process.env.PORT || 5005;

(async () => {
  try {
    await db.sync();
    console.log("Database synced!");
    
    app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
  } catch (error) {
    console.error("DB Sync Error:", error);
  }
})();
