import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { Box, Container, Button, Typography } from "@mui/material";
import withRoot from "../theme/withRoot";

function ErrorScreen() {
    const navigate = useNavigate();
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
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h1">Oops!</Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                    {message}
                </Typography>
                <Typography variant="h6" align="center" sx={{ my: 5 }}>
                    <i>{error.statusText || error.message}</i>
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/")}
                >
                    Return to homepage
                </Button>
            </Container>
        </Box>
    );
}

export default withRoot(ErrorScreen);
