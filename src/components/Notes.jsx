import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes} = context;

  useEffect(() => {
    getAllNotes();
  }, [])
  
  return (
    <>
      <AddNote />
      <div className="container my-5 ">
        <h2 className="my-4 text-center">Your Notes</h2>
        <div className="row d-flex justify-content-center">
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
