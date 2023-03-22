import React from "react";
import "./modal.css";
import { RxCross2 } from "react-icons/rx";

const Modal = (props) => {
  return props.showModal ? (
    <div>
      <div className="custom-modal">
        <RxCross2 className="cross-icon" onClick={() => props.closeModal()} />
        {props.children}
      </div>
      <div className="bg" onClick={() => props.closeModal()} />
    </div>
  ) : null;
};

export default Modal;
