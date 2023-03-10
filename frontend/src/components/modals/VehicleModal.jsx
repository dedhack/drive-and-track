import React, { useState } from "react";
import { Modal, Button } from "react-daisyui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner";
import ErrAlert from "../ErrAlert";
import {
  createVehicle,
  getVehicles,
  updateVehicleLog,
} from "../../apis/vehiclesAPI";

const schema = yup.object().shape({
  veh_name: yup.string().min(3).max(30).required(),
  make: yup.string().min(3).max(30).required(),
  model: yup.string().min(3).max(30).required(),
  year: yup.number().min(1900).required(),
  vin: yup.string().min(3).max(30),
  ins_pol: yup.string().min(3).max(30),
  capacity: yup.number().min(1).required(),
  veh_desc: yup.string().min(3).max(30),
});

const VehicleModal = ({
  visible,
  setVisible,
  type,
  veh_id = null,
  veh_info = null,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: veh_info,
  });

  const { auth, user_id, setVehicles } = useAuth();

  // FETCHING STUFF
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchVehicles = async () => {
    const [data, error] = await getVehicles({ user_id: user_id }, auth);

    if (Array.isArray(data)) {
      setVehicles(data);
    }
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    console.log("data: ", formData);
    const payload = { ...formData, user_id: user_id };
    console.log("payload: ", payload);
    // if type === "Register"
    // const [data, error] = await createVehicle(payload);
    if (type === "Register") {
      console.log("Register path");
      const [data, error] = await createVehicle(payload, auth);

      if (data) {
        setSuccess("Vehicle created successfully");
        setVisible(false);
        await fetchVehicles();
      }
      if (error) {
        setError(error.response.data.message);
      }
    } else if (type === "Update") {
      console.log("Update path");

      const [data, error] = await updateVehicleLog(payload, auth);

      if (data) {
        setSuccess("Vehicle created successfully");
        setVisible(false);
        await fetchVehicles();
      }
      if (error) {
        setError(error.response.data.message);
      }
      console.log("data: ", data);
      console.log("error: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="font-sans  text-white">
      {/* <Button onClick={toggleVisible}>Open Modal</Button> */}
      <Modal className="relative bg-neutral" open={visible}>
        <Button
          className="absolute top-2 right-2"
          onClick={() => setVisible(!visible)}
        >
          X
        </Button>

        <Modal.Header className="font-bold">{`${type} Vehicle`}</Modal.Header>

        <Modal.Body>
          <form
            className="form-control w-full mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Vehicle Name</span>
                </label>
                <input
                  type="text"
                  placeholder="veh_name"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("veh_name")}
                />
                <p className="text-center text-red-600">
                  {errors.veh_name?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Make</span>
                </label>
                <input
                  type="text"
                  placeholder="Nissan"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("make")}
                />
                <p className="text-center text-red-600">
                  {errors.make?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Model</span>
                </label>
                <input
                  type="text"
                  placeholder="GTR"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("model")}
                />
                <p className="text-center text-red-600">
                  {errors.model?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Year</span>
                </label>
                <input
                  type="number"
                  placeholder="2020"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("year")}
                />
                <p className="text-center text-red-600">
                  {errors.year?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Tank Capacity</span>
                </label>
                <input
                  type="number"
                  placeholder="40"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("capacity")}
                />
                <p className="text-center text-red-600">
                  {errors.year?.message}
                </p>
              </div>

              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">VIN</span>
                </label>
                <input
                  type="text"
                  placeholder="190-H-123"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("vin")}
                />
                <p className="text-center text-red-600">
                  {errors.vin?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">
                    Insurance Policy
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="AXA"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("ins_pol")}
                />
                <p className="text-center text-red-600">
                  {errors.ins_pol?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Fav car"
                  className="input input-sm input-bordered w-full text-black"
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
