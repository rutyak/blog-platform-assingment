import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Signin from "./pages/Auth/signin";
import Signup from "./pages/Auth/signup";
import BlogForm from "./components/BlogForm";
const Profile = lazy(() => import("./pages/Profile/Profile"));

const Fallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin border-4 border-t-4 border-gray-500 border-solid w-16 h-16 rounded-full"></div>
    <span className="ml-4 text-xl text-gray-700">Loading...</span>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "createblog",
        element: (
          <PrivateRoute>
            <BlogForm />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Fallback />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
