import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorScreen from "../screens/ErrorScreen";
import LandingScreen from "../screens/LandingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import PriceScreen from "../screens/PriceScreen";
import ProtectedRoute from "../routing/ProtectedRoute";
import WalletsScreen from "../screens/WalletsScreen";

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
                path: "/u/wallets",
                element: <WalletsScreen />,
                errorElement: <ErrorScreen />,
            },
            {
                path: "/price",
                element: <PriceScreen />,
                errorElement: <ErrorScreen />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
