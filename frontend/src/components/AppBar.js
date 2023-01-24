import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../features/auth/authService";
import { setCredentials, logout } from "../features/auth/authSlice";

import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";

function AppBar() {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
        pollingInterval: 900000,
    });

    useEffect(() => {
        if (data) dispatch(setCredentials(data));
    }, [data, dispatch]);

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
                            {userInfo ? (
                                <Button
                                    variant="contained"
                                    size="medium"
                                    onClick={() => dispatch(logout())}
                                    sx={{
                                        mx: 1,
                                        py: 1,
                                        textTransform: "none",
                                    }}
                                >
                                    Log out
                                </Button>
                            ) : (
                                <div>
                                    <Button
                                        variant="outlined"
                                        size="medium"
                                        onClick={() => navigate("/u/login")}
                                        sx={{
                                            mx: 1,
                                            py: 1,
                                            textTransform: "none",
                                        }}
                                    >
                                        Sign in
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        onClick={() => navigate("/u/signup")}
                                        sx={{
                                            mx: 1,
                                            py: 1,
                                            textTransform: "none",
                                        }}
                                    >
                                        Try it free
                                    </Button>
                                </div>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
            <Toolbar />
        </div>
    );
}

export default AppBar;
