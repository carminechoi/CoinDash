import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorScreen from "../screens/ErrorScreen";
import LandingScreen from "../screens/LandingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import CryptoPriceScreen from "../screens/CryptoPriceScreen";
import ProtectedRoute from "../routing/ProtectedRoute";

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
    {
        element: <ProtectedRoute />,
        errorElement: <ErrorScreen />,
        children: [
            {
                path: "/u/dashboard",
                element: <DashboardScreen />,
                errorElement: <ErrorScreen />,
            },
            {
                path: "/price",
                element: <CryptoPriceScreen />,
                errorElement: <ErrorScreen />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
