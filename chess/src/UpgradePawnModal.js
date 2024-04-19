import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./App.css";
function UpgradePawnModal(props) {
  const {
    showModal,
    setShowModal,
    blackChesses,
    setBlackChesses,
    setWhiteChesses,
    whiteChesses,
    whitePawnToUpgrade,
    blackPawnToUpgrade,
  } = props;
  const [name, setName] = useState("Q");
  const names = ["Q", "E", "H", "C"];
  const updGradePawn = () => {
    if (whitePawnToUpgrade) {
      let img;
      switch (name) {
        case "Q":
          img = "WQ.png";
          break;
        case "C":
          img = "WC.png";
          break;
        case "H":
          img = "WH.png";
          break;
        default:
          img = "WE.png";
      }
      setWhiteChesses(
        whiteChesses.map((c) =>
          c.id === whitePawnToUpgrade.id
            ? { ...whitePawnToUpgrade, name: name, img: img }
            : c
        )
      );
    }
    if (blackPawnToUpgrade) {
      let img;
      switch (name) {
        case "Q":
          img = "WQ.png";
          break;
        case "C":
          img = "WC.png";
          break;
        case "H":
          img = "WH.png";
          break;
        default:
          img = "WE.png";
      }
      setBlackChesses(
        blackChesses.map((c) =>
          c.id === blackPawnToUpgrade.id
            ? { ...blackPawnToUpgrade, name: name, img: img }
            : c
        )
      );
    }
    setShowModal(false);
  };
  const items = names.map((n) => {
    return (
      <Button
        onClick={() => {
          setName(n);
        }}
        className="baseFlex"
        id={name === n ? "selected" : "uns"}
      >
        <img className="icon" alt={n} src={`/imgs/${n}.png`}></img>
      </Button>
    );
  });
  return (
    <Modal className="Modal" isOpen={showModal} fade={false}>
      <ModalHeader className="header">Chọn quân muốn phong cấp</ModalHeader>
      <ModalBody className="body">{items}</ModalBody>
      <ModalFooter>
        <Button onClick={updGradePawn} color="success">
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default UpgradePawnModal;
