import React from "react";
import "./Modal.css";

import { Modal } from "react-bootstrap";

function Modals(props) {
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        scrollable={true}
        className="set-modal"
        animation={true}
      >
        <Modal.Header
          className={`headers ${props.headerCss}`}
          style={{ marginBottom: "-30px" }}
        >
          {props.header}
        </Modal.Header>
        {props.error && (
          <div className="my-3 alert alert-danger text-center">
            {props.error}
          </div>
        )}
        <Modal.Body className="bodi" style={{ marginTop: "100px" }}>
          {props.form}
        </Modal.Body>
        <Modal.Footer className="footers">{props.footer}</Modal.Footer>
      </Modal>
    </div>
  );
}

export default Modals;
