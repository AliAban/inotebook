import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div class="card col-md-3 m-1">
      <div class="card-body">
        <h5 class="card-title">{note.title.charAt(0).toUpperCase()+note.title.slice(1)}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{note.tag}</h6>
        <p class="card-text">
         {note.description.length > 40 ? note.description.slice(0, 40) + "..." : note.description}
        </p>
      </div>
    </div>
  );
};

export default NoteItem;
