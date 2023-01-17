import React, { useState, useRef } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3000";

  //setting state for user data
  const [userData, setUserData] = useState({});

  const getUserData =async ()=>{
     //getting auth-token
     const authToken = localStorage.getItem("token");
     if (!authToken) {
       showAlert("Authentication Failed", "danger");
       return;
     }
 
     // API CALL to add the note to db
     const response = await fetch(`http://localhost:3000/api/auth/getUser`, {
       method: "POST", // *GET, POST, PUT, DELETE, etc.
 
       headers: {
         "Content-Type": "application/json",
         "auth-token": authToken,
       },
     });
     const UserData = await response.json();
     setUserData(UserData);

  } 

  const initialNotes = [];
  //setting state 
  const [notes, setNotes] = useState(initialNotes);
  // fetch all notes
  const getAllNotes = async () => {
    //getting auth-token
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      showAlert("Authentication Failed", "danger");
      return;
    }

    // API CALL to add the note to db
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const allNotes = await response.json(); // parses JSON response into native JavaScript objects
    console.log(allNotes);
    setNotes(allNotes);
  };

  // Adding a note
  const addNote = async (title, description, tag) => {
    //getting auth-token
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      showAlert("Authentication Failed", "danger");
      return;
    }
    // API CALL to add the note to db
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
         authToken,
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
    //getting auth-token
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      showAlert("Authentication Failed", "danger");
      return;
    }

    // API CALL
    const response = await fetch(`${host}/api/notes/deleteNote/${NoteId}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          authToken,
      },
    });
    const json = await response.json();

    console.log("deleting a the node with id" + NoteId + " response: " + json);
    const newNotes = notes.filter((note) => {
      return note._id !== NoteId;
    });
    setNotes(newNotes);
    showAlert("Deleted The Note", "success");
  };

  // Edit a note
  const editNote = async (NoteId, title, description, tag) => {
    try {
      //getting auth-token
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        showAlert("Authentication Failed", "danger");
        return;
      }
      // API CALL
      const response = await fetch(`${host}/api/notes/updateNote/${NoteId}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            authToken,
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json);

      getAllNotes();
    } catch (error) {
      console.error(error);
    }
  };

  //Adding a note
  const [note, setSingleNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    // if(note.title.length < 3 || note.description.length < 5){
    //   alert("title should have min 3 characters and description should have min 5 characters!")
    //   console.log("title should have min 3 characters and description should have min 5 characters!")
    // }
    addNote(note.title, note.description, note.tag);

    //after adding the note clear the input fields
    setSingleNote({ title: "", description: "", tag: "" });
    showAlert("Note Has Been Added", "success");
    console.log(localStorage.getItem("token"));
  };
  const handleOnChange = (e) => {
    setSingleNote({ ...note, [e.target.name]: e.target.value }); // ...note is spread operator, it says that all the value which are there in note will stay, and the values after that if not present in note should be added to the note or if already there should be updated
  };

  //editing a note
  const [edtNote, setEdtNote] = useState({
    id: "",
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
    showAlert("Edited The Note", "success");
  };

  const handleOnChangeEditNote = (e) => {
    setEdtNote({ ...edtNote, [e.target.name]: e.target.value }); // ...note is spread operator, it says that all the value which are there in note will stay, and the values after that if not present in note should be added to the note or if already there should be updated
  };

  // code for alert
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    if (message === null) {
      setAlert(null);
      return;
    }
    setAlert({
      msg: message,
      type: type,
    });

    //after 3 seconds make the alert null.
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <NoteContext.Provider
      value={{
        alert,
        notes,
        userData,
        note,
        edtNote,
        refCloseModal,
        showAlert,
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
        getUserData
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
