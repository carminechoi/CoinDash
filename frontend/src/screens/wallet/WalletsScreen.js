import React, { useState, useEffect } from "react";
import { Alert, Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import withRoot from "../../theme/withRoot";
import TransactionList from "./components/TransactionList";
import WalletList from "./components/WalletList";
import WalletHeader from "./components/WalletHeader";

import { useSelector } from "react-redux";
import { useGetUserWalletsMutation } from "../../features/wallet/walletApi";

function WalletsScreen({ addWallet = false }) {
	const { wallets } = useSelector((state) => state.walletState);

	const [addWalletSuccess, setAddWalletSuccess] = useState(false);
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
			<Container sx={{ px: { sm: 12, md: "auto" }, pt: 2, py: 6 }}>
				<WalletHeader
					addWallet={addWallet}
					setAddWalletSuccess={setAddWalletSuccess}
				/>

				{/* Show success message if add wallet succeeds */}
				{addWalletSuccess && (
					<Alert severity="success">New wallet added successfully!</Alert>
				)}

				<Grid container justifyContent="space-between" spacing={4} pt={2}>
					<Grid xs={12} md={5}>
						<WalletList />
					</Grid>
					<Grid xs={12} md={7}>
						<TransactionList />
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</Box>
	);
}

export default withRoot(WalletsScreen);
