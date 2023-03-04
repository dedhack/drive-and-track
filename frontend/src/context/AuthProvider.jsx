import { createContext, useState } from "react";
// import { useJwt } from "react-jwt";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  // const [decodedToken, setDecodedToken] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user_id, setUser_id] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
