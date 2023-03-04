// import { set } from "immer/dist/internal";
import { useState } from "react";
import { Modal, Button } from "react-daisyui";

const FuelModal = ({ visible, setVisible }) => {
  //   const [visible, setVisible] = useState(false);

//   const toggleVisible = () => {
//     setVisible(!visible);
//   };
  return (
    <div className="font-sans">
      {/* <Button onClick={toggleVisible}>Open Modal</Button> */}
      <Modal open={visible}>
        <Modal.Header className="font-bold">
          Congratulations random Interner user!
        </Modal.Header>

        <Modal.Body>
          You've been selected for a chance to get one year of subscription to
          use Wikipedia for free!
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={() => setVisible(!visible)}>Yay!</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default FuelModal;
