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
import MBarChart from "../components/charts/MBarChart";
import { averageCost, totalCost } from "../components/charts/calculations";

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
    <div className="bg-gray-500 h-screen">
      <div className="flex justify-center">
        <div className="mt-[81px]"></div>
      </div>
      <div className="flex max-h-screen ">
        {/* <div className="my-10 mx-20"> */}
        <div className="w-1/3 px-10 pt-2 overflow-y-scroll">
          <ol className="relative border-l-4 border-gray-400">
            {/* <FuelCard /> */}
            {content}
          </ol>
        </div>

        {/* NEXT 2/3 of the page */}
        <div className="w-2/3 bg-gray-100">
          <div className="flex flex-row gap-4 p-4 ">
            <div className="basis-1/3">
              {serviceLogs.length > 0 ? <MDoChart /> : null}
            </div>
            {/* CARD STARTS HERE */}
            <div className="card basis-2/3">
              <div className="card bg-neutral text-primary-content">
                <div className="card-body">
                  <h2 className="card-title italic">Service Logs Summary</h2>
                  <p>Number of entries: {serviceLogs.length}</p>
                  {serviceLogs.length > 0 ? (
                    <>
                      <p>
                        Average Daily Cost for Maintenance:
                        <span>$ {averageCost(serviceLogs).toFixed(2)}</span>
                      </p>
                      <p>
                        Total spent on Maintenance:
                        <span>$ {totalCost(serviceLogs).toFixed(2)}</span>
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            {/* CARD ENDS HERE */}
          </div>
          <div className="h-[500px]">
            {serviceLogs.length > 0 ? <MBarChart /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
