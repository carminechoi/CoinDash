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

import { useSelector } from "react-redux";

const walletCategories = [
	"Exchanges",
	"Crypto Wallets",
	// "Imported Wallets",
	// "Other Transactions",
];

function WalletList() {
	const { wallets } = useSelector((state) => state.walletState);

	return (
		<TableContainer component={Paper} variant="outlined">
			<Table>
				<TableBody>
					{walletCategories.map((category) => (
						<>
							<TableRow
								key={category}
								sx={{ backgroundColor: "#F7F7F7" }}
							>
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
							{wallets.map((wallet) => {
								if (
									wallet.type &&
									wallet.type.category &&
									category
										.toUpperCase()
										.includes(wallet.type.category)
								) {
									const type = wallet.type.name ?? "";
									const addressEnd = wallet.address.slice(-5);
									return (
										<TableRow>
											<TableCell>
												<Typography>
													{type} Wallet ...
													{addressEnd}
												</Typography>
											</TableCell>
										</TableRow>
									);
								} else {
									return (
										<TableRow>
											<TableCell>
												<Typography>
													None added
												</Typography>
											</TableCell>
										</TableRow>
									);
								}
							})}
						</>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default WalletList;
