import React from "react";
import {
	Typography,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@mui/material";

const walletCategories = [
	"Exchanges",
	"Crypto Wallets",
	"Imported Wallets",
	"Other Transactions",
];

function WalletList() {
	return (
		<TableContainer component={Paper} variant="outlined">
			<Table>
				<TableBody>
					{walletCategories.map((category) => (
						<TableRow key={category} sx={{ backgroundColor: "#F7F7F7" }}>
							<TableCell>
								<Typography
									sx={{
										fontWeight: "medium",
									}}
								>
									{category}
								</Typography>
							</TableCell>
						</TableRow>
						/* <TableRow>
								<TableCell>
									<Typography>None added</Typography>
								</TableCell>
							</TableRow> */
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default WalletList;
