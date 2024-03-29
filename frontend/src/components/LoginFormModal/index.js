import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sign-in-button" onClick={() => setShowModal(true)}>
        Sign In
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} className="auth-modal">
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
