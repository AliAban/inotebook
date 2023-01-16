import React, { useState, useRef} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3000";

  const initialNotes = [];
  //setting state
  const [notes, setNotes] = useState(initialNotes);

  // fetch all notes
  const getAllNotes = async () => {
    // API CALL to add the note to db
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMTRjYmE2YjRiNTliNTFlZDVhZDQ2In0sImlhdCI6MTY3MjU2MzkzOH0.CxsOInLXjfE_7GzC1aMYpp5tcEe6A7zhlRZ1lO1thHU",
      },
    });
    const allNotes = await response.json(); // parses JSON response into native JavaScript objects
    console.log(allNotes);
    setNotes(allNotes);
  };

  // Adding a note
  const addNote = async (title, description, tag) => {
    // API CALL to add the note to db
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMTRjYmE2YjRiNTliNTFlZDVhZDQ2In0sImlhdCI6MTY3MjU2MzkzOH0.CxsOInLXjfE_7GzC1aMYpp5tcEe6A7zhlRZ1lO1thHU",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const addedNote = await response.json(); // parses JSON response into native JavaScript objects
    console.log(addedNote);

    // client side logic
   
    setNotes(notes.concat(addedNote));
    console.log("Adding a new note !");
  };

  // Deleting a note
  const deleteNote = async (NoteId) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deleteNote/${NoteId}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMTRjYmE2YjRiNTliNTFlZDVhZDQ2In0sImlhdCI6MTY3MjU2MzkzOH0.CxsOInLXjfE_7GzC1aMYpp5tcEe6A7zhlRZ1lO1thHU",
      },
    });
    const json = await response.json();

    console.log("deleting a the node with id" + NoteId + " response: " + json);
    const newNotes = notes.filter((note) => {
      return note._id !== NoteId;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (NoteId, title, description, tag) => {
    try {
      // API CALL
      const response = await fetch(`${host}/api/notes/updateNote/${NoteId}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMTRjYmE2YjRiNTliNTFlZDVhZDQ2In0sImlhdCI6MTY3MjU2MzkzOH0.CxsOInLXjfE_7GzC1aMYpp5tcEe6A7zhlRZ1lO1thHU",
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json);

    getAllNotes(); 
    } catch (error) {
      console.error(error)
    }
  };

  //Adding a note
  const [note, setSingleNote] = useState({ title: "", description: "", tag:""});

  const handleAddNote = (e) => {
    e.preventDefault();
    // if(note.title.length < 3 || note.description.length < 5){
    //   alert("title should have min 3 characters and description should have min 5 characters!")
    //   console.log("title should have min 3 characters and description should have min 5 characters!")
    // }
    addNote(note.title, note.description, note.tag);
    setSingleNote({title: "", description: "", tag:""})
   console.log(localStorage.getItem("token"));
  };
  const handleOnChange = (e) => {
    setSingleNote({ ...note, [e.target.name]: e.target.value }); // ...note is spread operator, it says that all the value which are there in note will stay, and the values after that if not present in note should be added to the note or if already there should be updated
  };

  //editing a note
  const [edtNote, setEdtNote] = useState({
    id:"",
    edtTitle: "",
    edtDescription: "",
    edtTag: "general",
  });
  const refCloseModal = useRef(null);

  const handleEditNote = (note_id) => {
    // e.preventDefault();
    console.log(`preview: ${edtNote}` + edtNote.edtTitle);
    editNote(note_id, edtNote.edtTitle, edtNote.edtDescription, edtNote.edtTag);
    refCloseModal.current.click();
  };

  const handleOnChangeEditNote = (e) => {
    setEdtNote({ ...edtNote, [e.target.name]: e.target.value }); // ...note is spread operator, it says that all the value which are there in note will stay, and the values after that if not present in note should be added to the note or if already there should be updated
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        note,
        edtNote,
        setEdtNote,
        handleAddNote,
        setSingleNote,
        handleEditNote,
        handleOnChange,
        handleOnChangeEditNote,
        editNote,
        deleteNote,
        addNote,
        getAllNotes,
        refCloseModal
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
