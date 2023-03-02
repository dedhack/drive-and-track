import { createContext, useState } from "react";
// import { useJwt } from "react-jwt";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const logout = () => {
    setAuth({});
    localStorage.removeItem("refresh");
  };

  // const { decodedToken, isExpired } = useJwt(auth.refresh);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
