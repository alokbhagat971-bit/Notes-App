import Notes from "../models/Notes.js";

export const getNotes = async (req, res) => {
  try {
    const search = req.query.search || "";

    const notes = await Notes.find({
      user: req.user._id,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

// Add note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!content) return res.status(400).json({ message: "Content is required" });

    const note = await Notes.create({
      title,
      content,
      user: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note" });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    await Notes.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};