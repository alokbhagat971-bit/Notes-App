import express from "express";
import { getNotes, createNote,deleteNote } from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notes for the logged-in user
router.get("/",authMiddleware,getNotes);

// Add a new note
router.post("/",authMiddleware,createNote);

// Delete a note
router.delete("/:id",authMiddleware,deleteNote);

export default router;