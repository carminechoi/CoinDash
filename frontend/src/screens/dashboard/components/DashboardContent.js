import React from "react";
import { Card, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function AddWalletCard({ wallets }) {
	const portfolioBalances = wallets.reduce((accumulator, wallet) => {
		const {
			type: { name },
			balance,
		} = wallet;
		if (name in accumulator) {
			accumulator[name] += balance;
		} else {
			accumulator[name] = balance;
		}
		return accumulator;
	}, {});

	return (
		<Container sx={{ px: { sm: 12, md: "auto" }, pt: 2, py: 6 }}>
			<Typography fontSize={48} fontWeight="bold">
				Dashboard
			</Typography>
			<Card sx={{ px: 4, py: 4 }}>
				<Typography fontSize={18} fontWeight="medium">
					Portfolio value
				</Typography>
				{Object.keys(portfolioBalances).map((asset) => (
					<Typography>{asset + " " + portfolioBalances[asset]}</Typography>
				))}
			</Card>
		</Container>
	);
}

export default AddWalletCard;
