import React, { useState } from "react";
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
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMTRjYmE2YjRiNTliNTFlZDVhZDQ2In0sImlhdCI6MTY3MjU2MzkzOH0.CxsOInLXjfE_7GzC1aMYpp5tcEe6A7zhlRZ1lO1thHU",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    // client side logic
    const newNote = {
      _id: "63b199e6b3ce28e172fdf811",
      user: "63b14cba6b4b59b51ed5ad46",
      title: title,
      description: description,
      tag: tag,
      date: "2023-01-01T14:34:14.994Z",
      __v: 0,
    };
    setNotes(notes.concat(newNote));
    console.log("Adding a new note !");
  };

  // Deleting a note
  const deleteNote = async (NoteId) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deleteNote/${NoteId}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiMTRjYmE2YjRiNTliNTFlZDVhZDQ2In0sImlhdCI6MTY3MjU2MzkzOH0.CxsOInLXjfE_7GzC1aMYpp5tcEe6A7zhlRZ1lO1thHU",
      },
    });
    const json = await response.json();

    console.log("deleting a the node with id" + NoteId + " response: " +json);
    const newNotes = notes.filter((note) => {
      return note._id !== NoteId;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (NoteId, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updateNote/${NoteId}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();

    // logic to edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, editNote, deleteNote, addNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
