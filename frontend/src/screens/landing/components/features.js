import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Features() {
	return (
		<Grid container spacing={8}>
			{/* Dashboard */}
			<Grid xs={12}>
				<Grid
					container
					alignItems="center"
					sx={{ flexDirection: { xs: "column", md: "row" } }}
				>
					<Grid xs={12} md={6}>
						{/* Dashboard Text */}
						<Typography variant="h4">Dashboard Features</Typography>
						<Typography variant="body1">
							The dashboard page provides the following features:
						</Typography>
						<ul>
							<li>View current assets in wallets</li>
							<li>
								Display current prices of top 4 cryptocurrencies by marketcap
							</li>
							<li>Show latest crypto news</li>
						</ul>
					</Grid>
					<Grid xs={12} md={6}>
						{/* Dashboard Pic */}
						<img
							src="/imgs/dashboard.jpeg"
							alt="Dashboard"
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
					</Grid>
				</Grid>
			</Grid>

			{/* Wallets */}
			<Grid xs={12}>
				<Grid
					container
					alignItems="center"
					sx={{
						flexDirection: { xs: "column-reverse", md: "row" },
					}}
				>
					<Grid xs={12} md={6}>
						{/* Wallet Pic */}
						<img
							src="/imgs/wallets.jpeg"
							alt="Wallets"
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
					</Grid>
					<Grid xs={12} md={6}>
						{/* Wallet Text */}
						<Typography variant="h4">Dashboard Features</Typography>
						<Typography variant="body1">
							The dashboard page provides the following features:
						</Typography>
						<ul>
							<li>View current assets in wallets</li>
							<li>
								Display current prices of top 4 cryptocurrencies by marketcap
							</li>
							<li>Show latest crypto news</li>
						</ul>
					</Grid>
				</Grid>
			</Grid>

			{/* Prices */}
			<Grid xs={12}>
				<Grid
					container
					alignItems="center"
					sx={{ flexDirection: { xs: "column", md: "row" } }}
				>
					<Grid xs={12} md={6}>
						{/* Prices Text */}
						<Typography variant="h4">Dashboard Features</Typography>
						<Typography variant="body1">
							The dashboard page provides the following features:
						</Typography>
						<ul>
							<li>View current assets in wallets</li>
							<li>
								Display current prices of top 4 cryptocurrencies by marketcap
							</li>
							<li>Show latest crypto news</li>
						</ul>
					</Grid>
					<Grid xs={12} md={6}>
						{/* Prices Pic */}
						<img
							src="/imgs/prices.jpeg"
							alt="Prices"
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Features;
