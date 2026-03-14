import {useState,useEffect} from "react";
import DeleteNote from "./DeleteNote";
import "../assets/NotesCard.css";
function NotesCard(){
  const [note,setNote] = useState("");
  const [saved,setSaved] = useState(() => {
    const savedNotes=localStorage.getItem("notess");
    return savedNotes?JSON.parse(savedNotes):[];
  });
  useEffect(() =>{
    localStorage.setItem("notess",JSON.stringify(saved))
  },[saved])
  function handleNote(e){
    if(e.key==='Enter'){
      if(e.target.value!==""){
        setSaved([...saved,note]);
        setNote("");
      }
    }
  }
  function Deletenote(indexToDelete){
    setSaved(saved.filter((_,index) => index !== indexToDelete));
    
  }
  return (
    <>
      <input 
        type="text" 
        value={note}
        placeholder="Add your note..."
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={handleNote}
        className="note-input"
        />
            <div className="notes-grid">
            {saved.map((item, index) => (
            <div className="note-card" key={index}>
            <span className="note-text">{item}</span>
            <DeleteNote onDelete={() => Deletenote(index)} />
          </div>
        ))}
      </div>
    </>
  );
}
export default NotesCard;