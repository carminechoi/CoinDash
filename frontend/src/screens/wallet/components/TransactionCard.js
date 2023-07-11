import React from "react";
import { Card, CardContent, Typography, Tooltip } from "@mui/material";
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
				<Grid container padding={0} spacing={8}>
					<Grid xs={5}>
						<Tooltip title={transaction.to} placement="top-start">
							<Typography
								fontWeight="medium"
								fontSize={14}
								sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
							>
								{transaction.hash}
							</Typography>
						</Tooltip>
						<Typography
							fontSize={12}
							sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
						>
							{transaction.timeStamp}
						</Typography>
					</Grid>
					<Grid xs={4}>
						<Tooltip title={transaction.from} placement="top-start">
							<Typography
								fontSize={14}
								sx={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								From: {transaction.from}
							</Typography>
						</Tooltip>
						<Tooltip title={transaction.to} placement="top-start">
							<Typography
								fontSize={14}
								sx={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								To: {transaction.to}
							</Typography>
						</Tooltip>
					</Grid>
					<Grid xs={3}>
						<Typography
							fontSize={14}
							sx={{
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{transaction.value} Eth
						</Typography>
						<Typography
							fontSize={12}
							sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
						>
							{transaction.gasPrice} gwei
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default TransactionCard;
