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
    Divider,
} from "@mui/material";
import PopupState, {
    bindTrigger,
    bindMenu,
    bindHover,
} from "material-ui-popup-state";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
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
                    justifyContent: "center",
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    marginLeft: 12,
                    marginRight: "auto",
                    alignItems: "center",
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
                <PopupState variant="popover" popupId="walletMenu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button
                                // onClick={handleCloseNavMenu}
                                {...bindHover(popupState)}
                                sx={{
                                    my: 2,
                                    px: 2,
                                    color: "black",
                                    display: "block",
                                    textTransform: "none",
                                }}
                            >
                                Wallets{" "}
                                <ArrowDropDownIcon
                                    style={{ verticalAlign: "middle" }}
                                />
                            </Button>

                            <HoverMenu
                                {...bindMenu(popupState)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                disableScrollLock
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                            >
                                <MenuItem>
                                    <Typography>Wallets</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography>Transactions</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <Typography>+ Add Wallet</Typography>
                                </MenuItem>
                            </HoverMenu>
                        </React.Fragment>
                    )}
                </PopupState>

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
                <PopupState variant="popover">
                    {(popupState) => (
                        <React.Fragment>
                            <IconButton
                                {...bindTrigger(popupState)}
                                sx={{ p: 0 }}
                            >
                                <Avatar />
                            </IconButton>
                            <Menu {...bindMenu(popupState)} disableScrollLock>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
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
