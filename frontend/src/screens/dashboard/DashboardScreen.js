import React, { useState, useEffect } from "react";

import { Box } from "@mui/material";
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

	const [getUserWallets] = useGetUserWalletsMutation();

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
			{walletsLoaded ? (
				<DashboardContent wallets={wallets} />
			) : (
				<AddWalletCard />
			)}
			<Footer />
		</Box>
	);
}

export default withRoot(DashboardScreen);
