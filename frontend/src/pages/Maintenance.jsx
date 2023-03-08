import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import MaintenanceModal from "../components/modals/MaintenanceModal";
import {
  getServices,
  deleteService,
  getServiceTypes,
} from "../apis/servicesAPI";
import MaintenanceCard from "../components/MaintenanceCard";
import MDoChart from "../components/charts/MDoChart";

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
      const conDate = new Date(service.datetime).toLocaleString();

      return (
        <li key={index} className="mb-10 ml-4">
          <MaintenanceCard service={service} conDate={conDate} />
          <button
            className="btn btn-sm m-1"
            onClick={() => handleUpdate(service.service_id)()}
          >
            Update
          </button>
          <button
            className="btn btn-sm m-1"
            onClick={() => handleDelete(service.service_id)}
          >
            Delete
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
        </li>
      );
    });
  } else {
    content = (
      <div className="text-center">
        No Service Records. Have you selected a vehicle?
      </div>
    );
  }

  return (
    <>
      <div className="mt-20 text-center"></div>
      <div className="flex max-h-screen ">
        {/* <div className="my-10 mx-20"> */}
        <div className="w-1/3 px-10 overflow-y-scroll">
          <ol className="relative border-l border-gray-400">
            {/* <FuelCard /> */}
            {content}
          </ol>
        </div>
        <div className="w-2/3 sticky top-0 right-0 h-screen bg-gray-100">
          NEXT 2 THIRDS
          <MDoChart />
        </div>
      </div>
    </>
  );
};

export default Maintenance;
