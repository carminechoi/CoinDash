import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import AppBar from "../components/AppBar";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Footer from "../components/Footer";

function WalletsScreen({ addWallet = false }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar />
            {/* <Typography>Wallets Screen</Typography>
            {addWallet && <Typography>Add Wallet</Typography>} */}
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Grid container>
                    <Grid>
                        <Typography sx={{ fontSize: 48, fontWeight: "bold" }}>
                            Wallets
                        </Typography>
                    </Grid>
                    <Grid mdOffset="auto">
                        <Button>Sync Wallets</Button>
                        <Button>Add Wallet</Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}

export default WalletsScreen;
