import React from "react";
// import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import AppBar from "../components/AppBar";

function DashboardScreen() {
    // const { userId } = useSelector((state) => state.userState);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar />
        </Box>
    );
}

export default DashboardScreen;
