import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;

  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">
          {note.title.charAt(0).toUpperCase() + note.title.slice(1)}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
        <p className="card-text">
          {note.description.length > 40
            ? note.description.slice(0, 40) + "..."
            : note.description}
        </p>
        {/* delete button */}
        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
        {/* edit button */}
        <i className="far fa-edit mx-2" data-bs-toggle="modal"
        data-bs-target="#staticBackdrop" onClick={()=>{updateNote(note)}}></i>
      </div>
    </div>
  );
};

export default NoteItem;
