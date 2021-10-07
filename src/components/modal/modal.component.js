import React from "react";

import "./modal.styles.css";

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="overlay" onClick={props.onCloseModal} />
      <div className="modal-container">
        <button className="modal-close" onClick={props.onCloseModal}>
          x
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
