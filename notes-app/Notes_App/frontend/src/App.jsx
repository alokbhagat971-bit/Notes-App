import NotesCard from "./components/NotesCard"
import { Routes,Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import "./App.css"


function App(){
  return (
    <>
    <Routes>
      <Route path="/" element={<NotesCard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}
export default App;