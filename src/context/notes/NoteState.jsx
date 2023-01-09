import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  
    const initialNotes = [
    {
      _id: "63b1824f70496c7a043bacad",
      user: "63b14cba6b4b59b51ed5ad46",
      title: "get up early",
      description: "hey bro this is you. get up early",
      tag: "lifestyle",
      date: "2023-01-01T12:53:35.608Z",
      __v: 0,
    },
    {
      _id: "63b199e6b3ce24e162fdf811",
      user: "63b14cba6b4b59b51ed5ad46",
      title: "both server running",
      description: "server was started for backend and also frontend",
      tag: "development",
      date: "2023-01-01T14:34:14.994Z",
      __v: 0,
    },
    {
        _id: "63b1824f70496c7a043bacad",
        user: "63b14cba6b4b59b51ed5ad46",
        title: "get up early",
        description: "hey bro this is you. get up early",
        tag: "lifestyle",
        date: "2023-01-01T12:53:35.608Z",
        __v: 0,
      },
      {
        _id: "63b199e6b3ce24e162fdf811",
        user: "63b14cba6b4b59b51ed5ad46",
        title: "both server running",
        description: "server was started for backend and also frontend",
        tag: "development",
        date: "2023-01-01T14:34:14.994Z",
        __v: 0,
      },
      {
        _id: "63b1824f70496c7a043bacad",
        user: "63b14cba6b4b59b51ed5ad46",
        title: "get up early",
        description: "hey bro this is you. get up early",
        tag: "lifestyle",
        date: "2023-01-01T12:53:35.608Z",
        __v: 0,
      },
      {
        _id: "63b199e6b3ce24e162fdf811",
        user: "63b14cba6b4b59b51ed5ad46",
        title: "both server running",
        description: "server was started for backend and also frontend",
        tag: "development",
        date: "2023-01-01T14:34:14.994Z",
        __v: 0,
      },
      {
        _id: "63b1824f70496c7a043bacad",
        user: "63b14cba6b4b59b51ed5ad46",
        title: "get up early",
        description: "hey bro this is you. get up early",
        tag: "lifestyle",
        date: "2023-01-01T12:53:35.608Z",
        __v: 0,
      },
      {
        _id: "63b199e6b3ce24e162fdf811",
        user: "63b14cba6b4b59b51ed5ad46",
        title: "both server running",
        description: "server was started for backend and also frontend",
        tag: "development",
        date: "2023-01-01T14:34:14.994Z",
        __v: 0,
      },
  ];
  const [notes, setNotes] = useState(initialNotes);
  return (
    <NoteContext.Provider value={{ notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
