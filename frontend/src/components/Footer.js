import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Copyright() {
    return (
        <Typography color="#8695AA">
            {"© DogeWisdom "} {new Date().getFullYear()}
        </Typography>
    );
}

function Footer() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Box
                component="footer"
                color="#8695AA"
                sx={{
                    py: 3,
                    px: 2,
                    mt: "auto",
                    backgroundColor: "#05122E",
                }}
            >
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Grid container spacing={4}>
                        <Grid xs={12} sm={4}>
                            <Grid container spacing={2} padding={0}>
                                <Grid xs={12}>
                                    <Typography
                                        variant="h5"
                                        color="white"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        DogeWisdom
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography>
                                        Connect your cryptocurrency wallets and
                                        exchanges. Get your crypto taxes done in
                                        minutes
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={2} mdOffset="auto">
                            <Grid container spacing={2} padding={0}>
                                <Grid xs={12}>
                                    <Typography
                                        color="white"
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Platform
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography>Crypto Prices</Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography>Terms of Use</Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography>Privacy Policy</Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography>Disclaimer</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={2}>
                            <Grid container spacing={2} padding={0}>
                                <Grid xs={12}>
                                    <Typography
                                        color="white"
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Company
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography>About</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={3}>
                            <Grid container spacing={2} padding={0}>
                                <Grid xs={12}>
                                    <Typography
                                        color="white"
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Newsletter
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="filled"
                                        size="small"
                                        sx={{ background: "white" }}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <Button
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                    >
                                        Subscribe
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12}>
                            <Copyright />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Footer;
