import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <div className="bg-[#f5f7fa]">
          <Navbar/>
          <Outlet/>
    </div>
  );
};

export default App;
