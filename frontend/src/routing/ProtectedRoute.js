import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetUserDetailsMutation } from "../features/user/userApi";
import { Box } from "@mui/material";
import Spinner from "../components/Spinner";

function ProtectedRoute() {
    const [getUserDetails, { isLoading, isError }] =
        useGetUserDetailsMutation();

    useEffect(() => {
        getUserDetails();
    }, []);

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Spinner />
            </Box>
        );
    }

    if (isError) {
        return <Navigate to="/" />;
    }

    // returns child route elements
    return <Outlet />;
}

export default ProtectedRoute;
