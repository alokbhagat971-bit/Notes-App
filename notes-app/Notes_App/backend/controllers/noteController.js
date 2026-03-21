import Notes from "../models/Notes.js";

export const getNotes = async (req,res) =>{
    const notes = await Notes.find({user:req.user});
    res.json(notes);
}

// Add a new note
export const createNote = async (req,res) =>{
    try{
        const {title,content} = req.body;
        const note = await Notes.create({
          title,
          content,
          user:req.user
        });
        res.status(201).json(note);
    }catch(error){
        res.status(500).json({message:"Failed to create note"});
    }
}

//Delete a note

export const deleteNote = async(req,res) =>{
    await Notes.findOneAndDelete({
    _id: req.params.id,
    user: req.user
});
    res.json({message:"Deleted"});
}