//Menghandle semua routingnya
import express from "express";
import { 
    registerUser,
    loginHandler,
    logout,
    getNotes, 
    getNoteById, 
    createNote, 
    updateNote, 
    deleteNote, 
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

//Buat Endpoint
router.post("/register", registerUser);  //bisa
router.post("/login", loginHandler);  //bisa
router.post("/logout", verifyToken, logout);  //bisa
router.get("/notes", verifyToken, getNotes); //bisa
router.get("/notes/:id", verifyToken, getNoteById); //bisa
router.post("/notes", verifyToken, createNote); //bisa
router.put("/notes/:id", verifyToken, updateNote);
router.delete("/notes/:id", verifyToken, deleteNote); //bisa

export default router;