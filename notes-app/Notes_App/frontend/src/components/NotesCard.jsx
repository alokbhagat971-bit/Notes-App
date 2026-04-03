import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DeleteNote from "./DeleteNote";
import "../assets/NotesCard.css";
import "../assets/pages.css";

function NotesCard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchNotes(token, "");
  }, [navigate]);

  const fetchNotes = async (token, query) => {
    setLoadingNotes(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/notes?search=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setSaved(data || []);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleSearch = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchNotes(token, search);
  };

  const addNote = async () => {
  if (!title.trim() && !content.trim()) return;

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title.trim(),
        content: content.trim(),
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (data && data._id) {
      setSaved((prev) => [data, ...prev]);
      setTitle("");
      setContent("");
    }
  } catch (err) {
    console.error("Failed to add note:", err);
  }
};

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await fetch(`${BASE_URL}/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSaved((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className="notes-page">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>

      <h1>My Notes</h1>
      <p className="notes-subtitle">Capture your thoughts, organize your ideas</p>

      <div className="search-row">
        <input
          type="text"
          placeholder="Search notes by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="note-input search-input"
        />
        <button onClick={handleSearch} className="add-btn search-btn">
          Search
        </button>
      </div>

      <div className="add-note-box">
        <div className="input-row">
          <input
            type="text"
            value={title}
            placeholder="Note title..."
            onChange={(e) => setTitle(e.target.value)}
            className="note-input title-input"
          />

          <textarea
            value={content}
            placeholder="Write your note here..."
            onChange={(e) => setContent(e.target.value)}
            className="note-input content-input"
          />
        </div>

        <button onClick={addNote} className="add-btn">
          Add Note
        </button>
      </div>

      <div className="notes-header-row">
        <h2>Your Notes</h2>
        <span className="notes-count">{saved.length} notes</span>
      </div>

      {loadingNotes ? (
        <p className="loading-text">Loading notes...</p>
      ) : saved.length === 0 ? (
        <p className="note-empty">No notes found.</p>
      ) : (
        <div className="notes-grid">
          {saved.map((item) => (
            <div className="note-card" key={item._id}>
              <h3 className="note-title">{item.title || "Untitled Note"}</h3>
              <p className="note-content">{item.content || "No content"}</p>
              <DeleteNote onDelete={() => deleteNote(item._id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesCard;