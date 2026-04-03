import bin from "../assets/bin.png";
import PropTypes from "prop-types";
import "../assets/DeleteNote.css";

function DeleteNote({ onDelete }) {
  return <img src={bin} onClick={onDelete} className="delete-icon" alt="Delete note" />;
}

DeleteNote.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteNote;