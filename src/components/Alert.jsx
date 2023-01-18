import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Alert = (props) => {
  const context = useContext(noteContext)
  const {alert, showAlert} = context;

  const toCapital = (word) => {
    let temp = word.toLowerCase();
    return temp.charAt(0).toUpperCase() + temp.slice(1);
  };
  return (
    <div style={{ height: "5vh" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
};

export default Alert;
