/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetUserDetailsMutation } from "../features/user/userApi";
import { Box } from "@mui/material";
import Spinner from "../components/Spinner";
import AppBar from "../components/AppBar";

function ProtectedRoute() {
    const [getUserDetails, { isLoading, isError }] =
        useGetUserDetailsMutation();

    useEffect(() => {
        getUserDetails();
    }, []);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <AppBar />
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Spinner />
                </Box>
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
