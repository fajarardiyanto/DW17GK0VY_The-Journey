import React from "react";

import { Modal } from "react-bootstrap";

function ModalPhoto(props) {
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        scrollable={true}
        className="set-modal"
      >
        <Modal.Body>{props.body}</Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalPhoto;
