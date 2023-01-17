import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { note,handleAddNote, handleOnChange} = context;

  // const [note, setSingleNote] = useState({title:"", description:""});

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addNote(note.title,note.description, note.tag);
  // };

  // const handleOnChange = (e)=>{
  //   setSingleNote({...note, [e.target.name]: e.target.value}); // ...note is spread operator, it says that all the value which are there in note will stay, and the values after that if not present in note should be added to the note or if already there should be updated
  // }

  return (
    <div className="my-5">
      <h2>Add a Note</h2>
      <form className="my-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input value={note.title}
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
          <input value={note.description}
            type="text"
            name="description"
            className="form-control"
            id="description" onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input value={note.tag}
            type="text"
            name="tag"
            className="form-control"
            id="tag" onChange={handleOnChange}
          />
        </div>
        <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleAddNote}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
