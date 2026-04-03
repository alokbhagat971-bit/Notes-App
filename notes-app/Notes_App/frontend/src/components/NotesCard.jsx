import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DeleteNote from "./DeleteNote";
import "../assets/NotesCard.css";
import { Link } from "react-router-dom";
import "../assets/pages.css";

function NotesCard(){
  const [note,setNote] = useState("");
  const [saved,setSaved] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  fetch("http://localhost:4000/api/notes", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => setSaved(data));
}, [navigate]);
  async function handleNote(e){
    if(e.key==='Enter'){
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/notes",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          title:note,
          content:note
        })
      });

      const data = await res.json();
      setSaved([...saved,data]);
      setNote("");
    }
  }
  async function Deletenote(id){
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:4000/api/notes/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    setSaved(saved.filter(item => item._id!==id));
  }
  return (
    <>
      <h1>My Notes</h1>
      <div className="nav-links">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
      
      <input 
        type="text" 
        value={note}
        placeholder="Add your note..."
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={handleNote}
        className="note-input"
        />
            <div className="notes-grid">
            {saved.map((item) => (
            <div className="note-card" key={item._id}>
            <span className="note-text">{item.title}</span>
            <DeleteNote onDelete={() => Deletenote(item._id)} />
          </div>
        ))}
      </div>
    </>
  );      
}
export default NotesCard;