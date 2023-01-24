import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorScreen from "../features/error/ErrorScreen";
import LandingScreen from "../features/landing/LandingScreen";
import RegisterScreen from "../features/auth/RegisterScreen";
import LoginScreen from "../features/auth/LoginScreen";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingScreen />,
        errorElement: <ErrorScreen />,
    },
    {
        path: "/u/signup",
        element: <RegisterScreen />,
        errorElement: <ErrorScreen />,
    },
    {
        path: "/u/login",
        element: <LoginScreen />,
        errorElement: <ErrorScreen />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
