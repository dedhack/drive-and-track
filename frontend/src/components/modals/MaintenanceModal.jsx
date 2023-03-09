import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-daisyui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner";
import {
  getServices,
  createService,
  updateService,
} from "../../apis/servicesAPI";

const schema = yup.object().shape({
  datetime: yup.string().required(), // double check
  odometer: yup.number().min(1).required(),
  price: yup.number().min(1).required(),
  location: yup.string().min(3).max(30),
  service_type: yup.number().min(1).required(),
  service_desc: yup.string().min(3).max(30),
});

const MaintenanceModal = ({
  visible,
  setVisible,
  type,
  service_id = null,
  service_info = null,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: service_info,
  });

  const { auth, selectedVehicle, setServiceLogs, serviceTypes } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (formData) => {
    console.log("service form data", formData);
    setLoading(true);
    const payload = { ...formData, veh_id: selectedVehicle };
    console.log("payload", payload);
    if (type === "Create") {
      const [data, error] = await createService(payload, auth);

      if (data) {
        setSuccess("Successfully created service");
        setVisible(false);
        const [data, error] = await getServices(
          { veh_id: selectedVehicle },
          auth
        );
        if (data) {
          setServiceLogs(data);
        }
      } else {
        setError(error);
      }
    } else if (type === "Update") {
      const [data, error] = await updateService(payload, auth);

      if (data) {
        setSuccess("Successfully updated service");
        setVisible(false);
        const [data, error] = await getServices(
          { veh_id: selectedVehicle },
          auth
        );
        if (data) {
          setServiceLogs(data);
        }
      } else {
        setError(error);
      }
    }
    setLoading(false);
  };

  // create the drop options for the service type
  const serviceTypeOptions = serviceTypes.map((type) => (
    <option key={type.type_id} value={type.type_id}>
      {type.type_name}
    </option>
  ));

  return (
    <div className="font-sans text-white">
      {/* <Button onClick={toggleVisible}>Open Modal</Button> */}
      <Modal className="relative bg-neutral" open={visible}>
        <Button
          className="absolute top-2 right-2"
          onClick={() => setVisible(!visible)}
        >
          X
        </Button>

        <Modal.Header className="font-bold">{`${type} Service`}</Modal.Header>

        <Modal.Body>
          <form
            className="form-control w-full mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Date</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="01/01/2023"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("datetime")}
                />
                <p className="text-center text-red-600">
                  {errors.datetime?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Odometer</span>
                </label>
                <input
                  type="text"
                  placeholder="10000"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("odometer")}
                />
                <p className="text-center text-red-600">
                  {errors.odometer?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Price</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="109.00"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("price")}
                />
                <p className="text-center text-red-600">
                  {errors.price?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-tex text-white">Location</span>
                </label>
                <input
                  type="text"
                  placeholder="Ah Huat Garage"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("location")}
                />
                <p className="text-center text-red-600">
                  {errors.location?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Type of Service</span>
                </label>
                <select
                  className="input input-sm input-bordered w-full text-black"
                  {...register("service_type")}
                >
                  <option value="">Select a service type</option>
                  {serviceTypeOptions}
                </select>
                <p className="text-center text-red-600">
                  {errors.service_type?.message}
                </p>
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text text-white">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Did a routine oil change"
                  className="input input-sm input-bordered w-full text-black"
                  {...register("service_desc")}
                />
                <p className="text-center text-red-600">
                  {errors.service_desc?.message}
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

export default MaintenanceModal;
