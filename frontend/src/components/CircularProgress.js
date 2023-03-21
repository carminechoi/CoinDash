import { Grid, CircularProgress as Progress } from "@mui/material";
import React from "react";

function CircularProgress() {
    return (
        <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
        >
            <Progress />
        </Grid>
    );
}

export default CircularProgress;
