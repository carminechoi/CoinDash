import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function TransactionCard({ transaction, isSquare }) {
	return (
		<Card square={isSquare} sx={{ display: "flex", boxShadow: "none" }}>
			<CardContent
				sx={{
					flex: 1,
					overflow: "hidden",
					"&:last-child": { paddingBottom: 2 },
				}}
			>
				<Grid container padding={0} spacing={3}>
					<Grid xs={5}>
						<Typography
							fontWeight="medium"
							sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
						>
							{transaction.hash}
						</Typography>
						<Typography
							fontSize={14}
							sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
						>
							{transaction.createdAt}
						</Typography>
					</Grid>
					<Grid xs={5}>
						<Typography
							sx={{
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							From: {transaction.from}
						</Typography>
						<Typography
							sx={{
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							To: {transaction.to}
						</Typography>
					</Grid>
					<Grid
						xs={2}
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
							{transaction.value}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default TransactionCard;
