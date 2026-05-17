import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
import Protected from "./features/auth/components/protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />  // 🔥 THIS LINE FIXES IT
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/interview",
    element: (
      <Protected>
        <Interview />
      </Protected>
    )
  }
]);