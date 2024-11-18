import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 

const Base_url = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(`${Base_url}/login`, credentials);
      
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      const decodedToken = jwtDecode(data.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        throw new Error("Token has expired");
      }

      setUser(decodedToken); 
      setUserData(data?.user);
      return { success: true, message: data.message }; 
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const register = async (credentials) => {
    try {
      const { data } = await axios.post(`${Base_url}/register`, credentials);
      return { success: true, message: data.message }; 
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserData(null); 
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        setUser(decodedToken);

        if (storedUser) {
          setUserData(JSON.parse(storedUser)); 
        }
      } catch (error) {
        console.error("Invalid or expired token:", error.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
