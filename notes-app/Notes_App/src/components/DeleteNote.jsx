import bin from "../assets/bin.png" ;
import PropTypes from "prop-types";
import "../assets/DeleteNote.css";

function DeleteNote({onDelete}){
  return (
    <img 
    src={bin}
    onClick={onDelete}
    style={{
      width:"24px",
      height:"24px",
      cursor:"pointer",
    }}
    />
  );
}
DeleteNote.propTypes={
  onDelete: PropTypes.func.isRequired,
}
export default DeleteNote;