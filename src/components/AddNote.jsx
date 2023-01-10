import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title:"", description:""});

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title,note.description);
  };

  const handleOnChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value}); // ...note is spread operator, it says that all the value which are there in note stay, and the values after that if not present in note should be added to the note or if already there should be updated
  }

  return (
    <div className="my-5">
      <h2>Add a Note</h2>
      <form className="my-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="description" onChange={handleOnChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;