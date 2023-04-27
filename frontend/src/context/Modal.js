import React, { useContext, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const Modal = ({ onClose, children, className }) => {
  const modalNode = useContext(ModalContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <div id="modal-content" className={className}>
        <button className="close-auth-modal" onClick={onClose}>
          <span className="close-auth-modal-button-span">
            <svg viewBox="0 0 24 24" focusable="false">
              <g fill="none" fillRule="evenodd">
                <path
                  d="M11,11 L11,4.5 C11,4.22385763 11.2238576,4 11.5,4 L12.5,4 C12.7761424,4 13,4.22385763 13,4.5 L13,11 L19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 L13,13 L13,19.5 C13,19.7761424 12.7761424,20 12.5,20 L11.5,20 C11.2238576,20 11,19.7761424 11,19.5 L11,13 L4.5,13 C4.22385763,13 4,12.7761424 4,12.5 L4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L11,11 Z"
                  fill="#2d333f"
                  fillRule="nonzero"
                  transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000)"
                ></path>
              </g>
            </svg>
          </span>
        </button>
        {children}
      </div>
    </div>,
    modalNode
  );
};
