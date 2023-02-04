import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "../components/AppBar";
import withRoot from "../theme/withRoot";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

function LandingScreen() {
    const accessToken = useSelector((state) => state.authState.accessToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) navigate("/u/dashboard");
    }, [accessToken, navigate]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar />
            <Container maxWidth="md" sx={{ px: 5 }}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography
                            variant="h1"
                            align="center"
                            sx={{
                                fontSize: { xs: 40, md: 75 },
                                fontWeight: "bold",
                                letterSpacing: 2,
                            }}
                        >
                            Crypto & NFT Taxes done fast
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                            sx={{ fontSize: { xs: 16, md: 18 } }}
                        >
                            Easily sync wallets and generate tax forms
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                            sx={{ fontSize: { xs: 16, md: 18 } }}
                        >
                            Trusted by 1 user &lt;3
                        </Typography>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate("/u/signup")}
                    sx={{ mt: 2, py: 1.4, px: 5, textTransform: "none" }}
                >
                    Try it free
                </Button>
            </Container>
        </Box>
    );
}

export default withRoot(LandingScreen);
