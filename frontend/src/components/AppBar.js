import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";
import { useLogoutUserMutation } from "../features/auth/authApi";

function AppBar() {
    const navigate = useNavigate();
    const { userId } = useSelector((state) => state.authState);
    const [logoutUser] = useLogoutUserMutation();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
    };

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
                            {userId ? (
                                <Button
                                    variant="contained"
                                    size="medium"
                                    onClick={handleLogout}
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
