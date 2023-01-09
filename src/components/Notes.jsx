import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem"

const Notes = () => {
  const context = useContext(noteContext);
  const {notes, setNotes} = context;
  console.log(context);  
  return (
    <div className="row d-flex justify-content-center">
      {notes.map((note) => {
        return <NoteItem note={note}/>
      })}
    </div>
  );
};

export default Notes;
