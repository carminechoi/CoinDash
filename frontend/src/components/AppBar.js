import React from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";

function AppBar() {
    const navigate = useNavigate();

    return (
        <div>
            <MuiAppBar
                position="sticky"
                elevation={0}
                sx={{ color: "black", bgcolor: "#FFFFFF", py: 1 }}
            >
                <Container maxWidth="xxl">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                marginRight: "auto",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Better Koinly
                        </Typography>
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                size="medium"
                                onClick={() => navigate("/u/login")}
                                sx={{ mx: 1, py: 1, textTransform: "none" }}
                            >
                                Sign in
                            </Button>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => navigate("/u/signup")}
                                sx={{ mx: 1, py: 1, textTransform: "none" }}
                            >
                                Try it free
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
            <Toolbar />
        </div>
    );
}

export default AppBar;
