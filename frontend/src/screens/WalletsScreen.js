import React from "react";
import { Box, Typography } from "@mui/material";
import AppBar from "../components/AppBar";

function WalletsScreen({ addWallet = false }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar />
            <Typography>Wallets Screen</Typography>
            {addWallet && <Typography>Add Wallet</Typography>}
        </Box>
    );
}

export default WalletsScreen;
