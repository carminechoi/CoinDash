import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import AppBar from "../components/AppBar";
import CryptoPriceTable from "../components/CryptoPriceTable";
import TabsGroup from "../components/tabs/TabsGroup";

import { useGetAllCoinsMutation } from "../features/coin/coinApi";

const cryptoTableTabs = ["All", "Portfolio", "Watchlist"];

function CryptoPriceScreen() {
    const [getAllCoins, { isLoading, isError }] = useGetAllCoinsMutation();

    useEffect(() => {
        getAllCoins();
    }, [getAllCoins]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar />
            <Container>
                <Typography variant="h6" sx={{ py: 2 }}>
                    Top 100 cryptocurrency prices, live charts, and market caps
                </Typography>
            </Container>

            <TabsGroup tabs={cryptoTableTabs}>
                <CryptoPriceTable />
            </TabsGroup>
        </Box>
    );
}

export default CryptoPriceScreen;
