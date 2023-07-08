import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function TransactionCard({ value, toAddress, isSquare }) {
	return (
		<Card square={isSquare} sx={{ display: "flex", boxShadow: "none" }}>
			<CardContent
				sx={{
					flex: 1,
					overflow: "hidden",
					"&:last-child": { paddingBottom: 2 },
				}}
			>
				<Grid container padding={0}>
					<Grid xs={8}>
						<Typography fontWeight="medium">{value}</Typography>
						<Typography
							fontSize={14}
							sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
						>
							{toAddress}
						</Typography>
					</Grid>
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
						test
					</Typography>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default TransactionCard;
