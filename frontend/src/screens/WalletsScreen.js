import React from "react";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import withRoot from "../theme/withRoot";
import TransactionList from "../sections/wallets/TransactionList";
import WalletList from "../sections/wallets/WalletList";
import Header from "../sections/wallets/Header";

function WalletsScreen({ addWallet = false }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<AppBar />
			<Container sx={{ px: { sm: 12, md: "auto" }, py: 2 }}>
				<Header />
				<Grid
					container
					justifyContent="space-between"
					spacing={4}
					pt={2}
					my={2}
				>
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
