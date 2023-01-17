import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();

  const context = useContext(noteContext);
  const {
    notes,
    note,
    edtNote,
    setEdtNote,
    getAllNotes,
    handleEditNote,
    handleOnChange,
    handleOnChangeEditNote,
    refCloseModal
  } = context;


  useEffect(() => {
    if(localStorage.getItem("token")){
      getAllNotes();
    }else{
      navigate("/login");
    }
  }, []);

  const updateNote = (currentNote) => {
    console.log(`updated the note, id: ${currentNote}`);
    setEdtNote({
      id:currentNote._id,
      edtTitle: currentNote.title,
      edtDescription: currentNote.description,
      edtTag: currentNote.tag,
    });
   
  };
  return (
    <>
      <AddNote />

      {/* modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit the note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-4">
                <div className="mb-3">
                  <label htmlFor="edtTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edtTitle"
                    name="edtTitle"
                    value={edtNote.edtTitle}
                    onChange={handleOnChangeEditNote}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edtDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="edtDescription"
                    className="form-control"
                    id="edtDescription"
                    value={edtNote.edtDescription}
                    onChange={handleOnChangeEditNote}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edtTag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="edtTag"
                    className="form-control"
                    id="edtTag"
                    value={edtNote.edtTag}
                    onChange={handleOnChangeEditNote}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refCloseModal}
              >
                Close
              </button>
              <button
                disabled={edtNote.edtTitle.length < 5 || edtNote.edtDescription.length < 5} 
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleEditNote(edtNote.id);
                }}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 ">
        <h2 className="my-4 text-center">Your Notes</h2>
        <div className="row d-flex justify-content-center my-3">
          {notes.length === 0 ? "No notes to Display": notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
