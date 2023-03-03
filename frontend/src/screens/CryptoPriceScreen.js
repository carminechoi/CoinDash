import React from "react";
import { Box } from "@mui/material";
import AppBar from "../components/AppBar";
import CryptoPriceTable from "../components/CryptoPriceTable";
import TabsGroup from "../components/TabsGroup";

const cryptoTableTabs = ["All", "Portfolio", "Watchlist"];

function CryptoPriceScreen() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar />
            <TabsGroup tabs={cryptoTableTabs}>
                <CryptoPriceTable />
            </TabsGroup>
        </Box>
    );
}

export default CryptoPriceScreen;
