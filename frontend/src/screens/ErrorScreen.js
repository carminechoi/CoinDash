import React from "react";
import { useRouteError } from "react-router-dom";
import { Box, Container, Button, Typography } from "@mui/material";
import withRoot from "../theme/withRoot";
import AppBar from "../components/AppBar";

function ErrorScreen() {
    const error = useRouteError();
    let message;

    switch (error.status) {
        case 404:
            message = "Sorry, an unexpected error has occurred.";
            break;
        case 500:
            message = "There was a problem fetching the data for this page.";
            break;
        default:
            message = "An unexpected error occurred.";
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar />

            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    mt: 8,
                }}
            >
                <Typography variant="h1">Oops!</Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                    {message}
                </Typography>
                <Typography variant="h5" sx={{ my: 5 }}>
                    <i>{error.statusText || error.message}</i>
                </Typography>
                <Button variant="contained" size="large" href="/">
                    Return to homepage
                </Button>
            </Container>
        </Box>
    );
}

export default withRoot(ErrorScreen);
