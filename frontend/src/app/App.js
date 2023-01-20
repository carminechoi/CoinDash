import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorScreen from "../features/error/ErrorScreen";
import LandingScreen from "../features/landing/LandingScreen";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingScreen />,
		errorElement: <ErrorScreen />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
