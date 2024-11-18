import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    if(!toast.isActive("private-route")){
      toast.error("Please sign in !!", {toastId: "private-router"});
    }

    return <Navigate to="/" replace/>;
  }

  return children; 
};

export default PrivateRoute;
