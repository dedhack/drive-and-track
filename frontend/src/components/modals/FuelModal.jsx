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
      <Modal className="relative" open={visible}>
        <Button
          className="absolute top-2 right-2"
          onClick={() => setVisible(!visible)}
        >
          X
        </Button>

        <Modal.Header className="font-bold">Add Fuel Log</Modal.Header>

        <Modal.Body>
          <div className="flex flex-col">
            <div className="mt-10">
              <label htmlFor="">Odometer</label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="">price</label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>{" "}
            <div>
              <label htmlFor="">Fuel amount</label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="">Fuel grade</label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="">Full Tank?</label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="">Location</label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={() => setVisible(!visible)}>Save</Button>

          <Button onClick={() => setVisible(!visible)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default FuelModal;
