import React, { useState } from "react";
import { Modal, Button } from "react-daisyui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner";

const schema = yup.object().shape({
  datetime: yup.string().required(), // double check
  odometer: yup.number().min(1).required(),
  price: yup.number().min(1).required(),
  location: yup.string().min(3).max(30),
  fuel_grade: yup.string().min(3).max(30).required(),
  fuel_amount: yup.number().min(1).required(),
  is_full: yup.boolean(),
});

const FuelModal = ({
  visible,
  setVisible,
  type,
  veh_id = null,
  veh_info = null,
}) => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // console.log(watch("datetime"));
  // selected vehicle -> veh_id
  const { user_id, selectedVehicle } = useAuth();

  // FETCHING STUFF
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (formData) => {
    console.log("form data", formData);
    console.log(errors);
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

        <Modal.Header className="font-bold">{`${type} Fuel & Fuel ID: ${veh_id}`}</Modal.Header>

        <Modal.Body>
          <form
            className="form-control w-full mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="01/01/2023"
                  className="input input-bordered w-full"
                  {...register("datetime")}
                />
                <p className="text-center text-red-600">
                  {errors.datetime?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Odometer</span>
                </label>
                <input
                  type="text"
                  placeholder="1000"
                  className="input input-bordered w-full"
                  {...register("Odometer")}
                />
                <p className="text-center text-red-600">
                  {errors.Odometer?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="40.50"
                  className="input input-bordered w-full"
                  {...register("price")}
                />
                <p className="text-center text-red-600">
                  {errors.price?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Location :(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Sinopec Bukit Timah"
                  className="input input-bordered w-full"
                  {...register("location")}
                />
                <p className="text-center text-red-600">
                  {errors.location?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Fuel Grade</span>
                </label>
                <input
                  type="text"
                  placeholder="RON 95"
                  className="input input-bordered w-full"
                  {...register("fuel_grade")}
                />
                <p className="text-center text-red-600">
                  {errors.fuel_grade?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Fuel Amount</span>
                </label>
                <input
                  type="number"
                  placeholder="40"
                  className="input input-bordered w-full"
                  {...register("fuel_amount")}
                />
                <p className="text-center text-red-600">
                  {errors.fuel_amount?.message}
                </p>
              </div>
              {/* <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Full Tank? </span>
                </label>
                <input
                  type="checkbox"
                  placeholder="190-H-123"
                  className="input input-bordered w-8"
                  {...register("is_full")}
                />
                <p className="text-center text-red-600">
                  {errors.is_full?.message}
                </p>
              </div> */}
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

export default FuelModal;
