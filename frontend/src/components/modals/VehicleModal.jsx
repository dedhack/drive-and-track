import React, { useState } from "react";
import { Modal, Button } from "react-daisyui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner";
import ErrAlert from "../ErrAlert";
import { createVehicle } from "../../apis/vehiclesAPI";

const schema = yup.object().shape({
  veh_name: yup.string().min(3).max(30).required(),
  make: yup.string().min(3).max(30).required(),
  model: yup.string().min(3).max(30).required(),
  year: yup.number().min(1900).required(),
  color: yup.string().min(3).max(30),
  vin: yup.string().min(3).max(30),
  ins_pol: yup.string().min(3).max(30),
  capacity: yup.number().min(1).required(),
  veh_desc: yup.string().min(3).max(30),
});

const VehicleModal = ({ visible, setVisible }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user_id } = useAuth();

  // FETCHING STUFF
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (formData) => {
    setLoading(true);
    console.log("data: ", formData);
    const payload = { ...formData, user_id: user_id };
    console.log("payload: ", payload);
    const [data, error] = await createVehicle(payload);

    if (data) {
      setSuccess("Vehicle created successfully");
      setVisible(false);
    }
    if (error) {
      setError(error.response.data.message);
    }
    console.log("data: ", data);
    console.log("error: ", error);
    setLoading(false);
  };

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

        <Modal.Header className="font-bold">Register New Vehicle</Modal.Header>

        <Modal.Body>
          <form
            className="form-control w-full mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Vehicle Name</span>
                </label>
                <input
                  type="text"
                  placeholder="veh_name"
                  className="input input-bordered w-full"
                  {...register("veh_name")}
                />
                <p className="text-center text-red-600">
                  {errors.veh_name?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Make</span>
                </label>
                <input
                  type="text"
                  placeholder="Nissan"
                  className="input input-bordered w-full"
                  {...register("make")}
                />
                <p className="text-center text-red-600">
                  {errors.make?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Model</span>
                </label>
                <input
                  type="text"
                  placeholder="GTR"
                  className="input input-bordered w-full"
                  {...register("model")}
                />
                <p className="text-center text-red-600">
                  {errors.model?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Year</span>
                </label>
                <input
                  type="number"
                  placeholder="2020"
                  className="input input-bordered w-full"
                  {...register("year")}
                />
                <p className="text-center text-red-600">
                  {errors.year?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Tank Capacity</span>
                </label>
                <input
                  type="number"
                  placeholder="40"
                  className="input input-bordered w-full"
                  {...register("capacity")}
                />
                <p className="text-center text-red-600">
                  {errors.year?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Color : (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Blue"
                  className="input input-bordered w-full"
                  {...register("color")}
                />
                <p className="text-center text-red-600">
                  {errors.color?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">VIN : (Optional) </span>
                </label>
                <input
                  type="text"
                  placeholder="190-H-123"
                  className="input input-bordered w-full"
                  {...register("vin")}
                />
                <p className="text-center text-red-600">
                  {errors.vin?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">
                    Insurance Policy : (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="AXA"
                  className="input input-bordered w-full"
                  {...register("ins_pol")}
                />
                <p className="text-center text-red-600">
                  {errors.ins_pol?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">
                    Description
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Fav car"
                  className="input input-bordered w-full"
                  {...register("veh_desc")}
                />
                <p className="text-center text-red-600">
                  {errors.ins_pol?.message}
                </p>
              </div>
            </div>

            {/* Submit button */}
            <div className="text-center">
              <button type="submit" className="btn mt-10">
                {loading ? <Spinner /> : "Save"}
              </button>
            </div>
          </form>
        </Modal.Body>

        <Modal.Actions>
          {/* <Button onClick={() => setVisible(!visible)}>Save</Button> */}

          {/* <Button onClick={() => setVisible(!visible)}>Close</Button> */}
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default VehicleModal;
