import { useState } from "react";
import { Modal } from "../../../context/Modal";
import ReservationCancel from "./ReservationCancel";

const ReservationCancelModal = ({ reservation }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReservationCancel reservation={reservation} />
        </Modal>
      )}
    </>
  );
}

export default ReservationCancelModal;