import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { id, name, email, birthday, userTypes, accessToken, refreshToken } =
    user || {};
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("no access token");
      }
      const response = await axios.get("http://localhost:8000/user/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = response?.data;
      setUser(userData);
    } catch (error) {
      console.log({ error });
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedOut(true);
    window.location.href = "/signin";
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        isLoggedOut: isLoggedOut,
        setIsLoggedOut: setIsLoggedOut,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
