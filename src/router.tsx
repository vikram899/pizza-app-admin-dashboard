import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/Login";
import Dashboard from "./layout/Dashboard";
import NonAuth from "./layout/NonAuth";
import Root from "./layout/Root";
import Users from "./pages/users/users";
import Restaurants from "./pages/restaurants/Restaurants";
import Products from "./pages/products/products";

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
          {
            path: "products",
            element: <Products />,
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
