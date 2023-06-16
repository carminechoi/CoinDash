import React from "react";
import { Card, CardContent, CardActionArea, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function WalletCard({ type, address, balance, isSquare }) {
	return (
		<CardActionArea component="a" href="#">
			<Card
				square={isSquare}
				sx={{
					display: "flex",
					boxShadow: "none",
				}}
			>
				<CardContent
					sx={{
						flex: 1,
						overflow: "hidden",
						"&:last-child": { paddingBottom: 2 },
					}}
				>
					<Grid container padding={0}>
						<Grid xs={8}>
							<Typography fontWeight="medium">
								{type} Wallet
							</Typography>
							<Typography
								fontSize={14}
								sx={{
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{address}
							</Typography>
						</Grid>
						<Grid
							xs={4}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "right",
							}}
						>
							<Typography
								sx={{
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{type === "Ethereum"
									? `${balance.toFixed(2)} eth`
									: `${balance}`}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</CardActionArea>
	);
}

export default WalletCard;
