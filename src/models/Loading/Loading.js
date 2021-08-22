import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import "./_Loading.scss";
const LoadingModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="Loading-modal"
        style={{
          display: "table",
          position: "relative",
          margin: "0 auto",
          top: "calc(50% - 24px)",
        }}
      >
        <div class="box">
          <div class="container">
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoadingModal;
