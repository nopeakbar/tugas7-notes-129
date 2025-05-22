import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/Database.js";

// Import semua model dan asosiasi
import "./models/UserModel.js";
import "./models/NoteModel.js";
import "./models/associations.js"; // Tambahkan ini agar relasi antar model aktif

const app = express();
app.set("view engine", "ejs");

dotenv.config();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);

// Sinkronisasi database
(async () => {
  try {
    await db.sync(); // Atau db.sync({ force: true }) jika ingin reset tabel
    console.log("Database synced!");
    
    app.listen(5002, () => console.log("Server connected on port 5002"));
  } catch (error) {
    console.error("DB Sync Error:", error);
  }
})();
