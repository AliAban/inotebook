import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

// import "./App.css";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert msg="hello"/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
