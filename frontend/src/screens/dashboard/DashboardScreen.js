import React, { useState, useEffect } from "react";

import { Box, CircularProgress } from "@mui/material";
import AppBar from "../../components/AppBar";
import withRoot from "../../theme/withRoot";
import Footer from "../../components/Footer";
import AddWalletCard from "./components/AddWalletCard";
import DashboardContent from "./components/DashboardContent";

import { useSelector } from "react-redux";
import { useGetUserWalletsMutation } from "../../features/wallet/walletApi";

function DashboardScreen() {
	const { wallets } = useSelector((state) => state.walletState);
	const [walletsLoaded, setWalletsLoaded] = useState(wallets.length !== 0);

	const [getUserWallets, { isLoading }] = useGetUserWalletsMutation();

	useEffect(() => {
		if (!walletsLoaded) {
			getUserWallets();
			setWalletsLoaded(true);
		}
	}, [getUserWallets, walletsLoaded]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<AppBar />
			{!isLoading ? (
				wallets.length !== 0 ? (
					<DashboardContent wallets={wallets} />
				) : (
					<AddWalletCard />
				)
			) : (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					padding={20}
				>
					<CircularProgress />
				</Box>
			)}
			<Footer />
		</Box>
	);
}

export default withRoot(DashboardScreen);
