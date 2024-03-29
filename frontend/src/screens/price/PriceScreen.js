import React, { useEffect } from "react";
import { Box, Container, Typography, Alert } from "@mui/material";
import AppBar from "../../components/AppBar";
import PriceTable from "./components/PriceTable";
import CircularProgress from "../../components/CircularProgress";

import { useGetAllCoinsMutation } from "../../features/coin/coinApi";
import Footer from "../../components/Footer";
import withRoot from "../../theme/withRoot";

function PriceScreen() {
	const [getAllCoins, { isError, isSuccess }] = useGetAllCoinsMutation();

	useEffect(() => {
		getAllCoins();
	}, [getAllCoins]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<AppBar />
			<Container>
				<Typography variant="h6" sx={{ py: 2 }}>
					Top 100 cryptocurrency prices, live charts, and market caps
				</Typography>
				{isError ? (
					<Alert severity="error">Failed to fetch table data</Alert>
				) : isSuccess ? (
					<PriceTable />
				) : (
					<CircularProgress />
				)}
			</Container>

			<Footer />
		</Box>
	);
}

export default withRoot(PriceScreen);
