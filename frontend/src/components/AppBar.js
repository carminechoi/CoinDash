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
    IconButton,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";
import { useLogoutUserMutation } from "../features/auth/authApi";

function AppBar() {
    const { userId: loggedIn, email } = useSelector((state) => state.userState);

    return (
        <div>
            <MuiAppBar
                position="absolute"
                elevation={0}
                sx={{ color: "black", bgcolor: "#FFFFFF", py: 1 }}
            >
                <Container maxWidth="xxl">
                    {loggedIn ? (
                        <LoggedIn userEmail={email} />
                    ) : (
                        <NotLoggedIn />
                    )}
                </Container>
            </MuiAppBar>
            <Toolbar />
        </div>
    );
}

function LoggedIn({ userEmail }) {
    const navigate = useNavigate();
    const [logoutUser] = useLogoutUserMutation();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCryptoPrices = () => navigate("/price");
    const handleDashboard = () => navigate("/u/dashboard");

    return (
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
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    flexGrow: 1,
                    marginLeft: 10,
                    marginRight: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    onClick={handleDashboard}
                    sx={{
                        my: 2,
                        px: 2,
                        color: "black",
                        display: "block",
                        textTransform: "none",
                    }}
                >
                    Dashboard
                </Button>
                <Button
                    // onClick={handleCloseNavMenu}
                    sx={{
                        my: 2,
                        px: 2,
                        color: "black",
                        display: "block",
                        textTransform: "none",
                    }}
                >
                    Wallets
                </Button>
                <Button
                    onClick={handleCryptoPrices}
                    sx={{
                        my: 2,
                        px: 2,
                        color: "black",
                        display: "block",
                        textTransform: "none",
                    }}
                >
                    Crypto Prices
                </Button>
                <Button
                    // onClick={handleCloseNavMenu}
                    sx={{
                        my: 2,
                        px: 2,
                        color: "black",
                        display: "block",
                        textTransform: "none",
                    }}
                >
                    Taxes
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 0,
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <Typography textAlign="center" sx={{ pr: 2 }}>
                    {userEmail}
                </Typography>

                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar />
                </IconButton>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Toolbar>
    );
}

function NotLoggedIn() {
    const navigate = useNavigate();

    const handleSignup = () => navigate("/u/signup");
    const handleLogin = () => navigate("/u/login");

    return (
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
                    onClick={handleLogin}
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
                    onClick={handleSignup}
                    sx={{
                        mx: 1,
                        py: 1,
                        textTransform: "none",
                    }}
                >
                    Try it free
                </Button>
            </Box>{" "}
        </Toolbar>
    );
}

export default AppBar;
