import { createContext, useState } from "react";
// import { useJwt } from "react-jwt";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user_id, setUser_id] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null); // takes in veh_id
  const [vehicles, setVehicles] = useState([]); // stores all vehicles
  const [vehName, setVehName] = useState("");

  const [fuelLogs, setFuelLogs] = useState([]); // stores all fuel logs
  const [serviceLogs, setServiceLogs] = useState([]); // stores all service logs
  const [serviceTypes, setServiceTypes] = useState([]); // stores all service types. we will want to fetch once, and use it for the drop options in the maintenance modal

  const logout = () => {
    setAuth({});
    localStorage.removeItem("refresh");
  };

  // const { decodedToken, isExpired } = useJwt(auth.refresh);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        user_id,
        setUser_id,
        isAdmin,
        setIsAdmin,
        selectedVehicle,
        setSelectedVehicle,
        vehicles,
        setVehicles,
        vehName,
        setVehName,
        fuelLogs,
        setFuelLogs,
        serviceLogs,
        setServiceLogs,
        serviceTypes,
        setServiceTypes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
