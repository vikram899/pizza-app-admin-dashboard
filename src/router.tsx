import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/Login";
import Dashboard from "./layout/Dashboard";
import NonAuth from "./layout/NonAuth";
import Root from "./layout/Root";
import Users from "./pages/users/Users";
import Restaurants from "./pages/restaurants/Restaurants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "restaurants",
            element: <Restaurants />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuth />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
