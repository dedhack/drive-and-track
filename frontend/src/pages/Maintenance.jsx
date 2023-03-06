import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import MaintenanceModal from "../components/modals/MaintenanceModal";
import {
  getServices,
  deleteService,
  getServiceTypes,
} from "../apis/servicesAPI";

const Maintenance = () => {
  const {
    auth,
    selectedVehicle,
    serviceLogs,
    setServiceLogs,
    setServiceTypes,
    serviceTypes,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [serviceVisible, setServiceVisible] = useState(false);
  const [updateService, setUpdateService] = useState(null);

  const fetchService = async () => {
    console.log("selectedVehicle: ", selectedVehicle);
    const [data, error] = await getServices({ veh_id: selectedVehicle }, auth);

    if (data) {
      setServiceLogs(data);
    } else if (data?.message) {
      console.log("message: ", error);
    }
    setIsLoading(false);
  };

  // pre-fetch the service types
  const fetchServiceTypes = async () => {
    const [data, error] = await getServiceTypes();
    if (data) {
      setServiceTypes(data);
    }
  };

  useEffect(() => {
    fetchService();
    if (serviceTypes.length === 0) {
      fetchServiceTypes();
    }
    console.log(serviceLogs);
  }, []);

  const handleDelete = async (service_id) => {
    const [data, error] = await deleteService({ service_id: service_id }, auth);
    if (data) {
      console.log("service deleted data: ", data);
    }
    if (error) {
      console.log("service deleted error: ", error);
    }
    // fetch the services again
    fetchService();
  };

  const handleUpdate = (service_id) => async () => {
    setUpdateService(service_id);
    setServiceVisible(true);
  };

  let content = null;
  if (Array.isArray(serviceLogs) && serviceLogs.length > 0) {
    content = serviceLogs.map((service, index) => {
      return (
        <div
          key={index}
          className="flex flex-row mt-4 bg-slate-100 justify-around w-full"
        >
          <div className="p-4 text-center">date: {service.datetime}</div>
          <div className="p-4 text-center">odometer: {service.odometer} km</div>
          <div className="p-4 text-center">price: ${service.price}</div>
          <div className="p-4 text-center">
            Description: {service.description}
          </div>
          <div>
            <button className="btn" onClick={handleUpdate(service.service_id)}>
              Update
            </button>
            {updateService === service.service_id && (
              <MaintenanceModal
                visible={serviceVisible}
                setVisible={setServiceVisible}
                type={"Update"}
                service_id={service.service_id}
                service_info={service}
              />
            )}
            <button
              className="btn"
              onClick={() => handleDelete(service.service_id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  } else {
    content = <div className="text-center">No services found</div>;
  }

  return (
    <div>
      Maintenance
      {content}
    </div>
  );
};

export default Maintenance;
