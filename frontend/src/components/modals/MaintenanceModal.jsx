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
  service_type: yup.string().min(3).max(30).required(),
  service_desc: yup.string().min(3).max(30),
});

const MaintenanceModal = (
  visible,
  setVisible,
  type,
  service_id = null,
  service_info = null
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: service_info,
  });



  return <div>MaintenanceModal</div>;
};

export default MaintenanceModal;
