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
	Drawer,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import PopupState, {
	bindTrigger,
	bindMenu,
	bindHover,
} from "material-ui-popup-state";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCardIcon from "@mui/icons-material/AddCard";
import PaymentIcon from "@mui/icons-material/Payment";
import PaidIcon from "@mui/icons-material/Paid";

import { useLogoutUserMutation } from "../features/auth/authApi";

function AppBar() {
	const { userId: loggedIn, email } = useSelector((state) => state.userState);

	return (
		<MuiAppBar
			position="static"
			elevation={0}
			sx={{ color: "black", bgcolor: "#FFFFFF", py: 1 }}
		>
			<Container maxWidth="xxl">
				{loggedIn ? <LoggedIn userEmail={email} /> : <NotLoggedIn />}
			</Container>
		</MuiAppBar>
	);
}

function LoggedIn({ userEmail }) {
	const [open, setOpen] = React.useState(false);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	const navigate = useNavigate();
	const [logoutUser] = useLogoutUserMutation();

	const handleLogout = async () => {
		await logoutUser();
		navigate("/");
	};

	const handleDashboard = () => navigate("/u/dashboard");
	const handleWallets = () => navigate("/u/wallets");
	const handleAddWallet = () => navigate("/u/wallets/add-wallet");
	const handleCryptoPrices = () => navigate("/price");

	return (
		<Toolbar disableGutters>
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
				CoinDash
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
								onClick={handleWallets}
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
								<ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
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
								<MenuItem onClick={handleWallets}>
									<Typography>Wallets</Typography>
								</MenuItem>
								<MenuItem onClick={handleAddWallet}>
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
				<Box
					sx={{
						display: "flex",
						flexGrow: 1,
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
								<IconButton {...bindTrigger(popupState)} sx={{ p: 0 }}>
									<Avatar />
								</IconButton>
								<Menu {...bindMenu(popupState)} disableScrollLock>
									<MenuItem onClick={handleLogout}>
										<Typography textAlign="center">Logout</Typography>
									</MenuItem>
								</Menu>
							</React.Fragment>
						)}
					</PopupState>
				</Box>
			</Box>

			<IconButton
				edge="end"
				aria-label="open drawer"
				onClick={toggleDrawer}
				sx={{
					...(open && { display: "none" }),
				}}
			>
				<MenuIcon />
			</IconButton>
			<Drawer anchor="right" open={open} onClose={toggleDrawer} sx={{ px: 5 }}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						px: [1],
					}}
				>
					<IconButton onClick={toggleDrawer}>
						<ChevronRightIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<List component="nav">
					<ListItemButton sx={{ px: 5 }}>
						<ListItemIcon sx={{ pr: 5 }}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
					<Divider sx={{ my: 1 }} />
					<ListItemButton sx={{ px: 5 }}>
						<ListItemIcon sx={{ pr: 5 }}>
							<PaymentIcon />
						</ListItemIcon>
						<ListItemText primary="Wallets" />
					</ListItemButton>
					<Divider sx={{ my: 1 }} />
					<ListItemButton sx={{ px: 5 }}>
						<ListItemIcon sx={{ pr: 5 }}>
							<AddCardIcon />
						</ListItemIcon>
						<ListItemText primary="Add Wallet" />
					</ListItemButton>
					<Divider sx={{ my: 1 }} />
					<ListItemButton sx={{ px: 5 }}>
						<ListItemIcon sx={{ pr: 5 }}>
							<PaidIcon />
						</ListItemIcon>
						<ListItemText primary="Crypto Prices" />
					</ListItemButton>
				</List>
			</Drawer>
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
