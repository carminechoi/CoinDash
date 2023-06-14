import React from "react";
import { Card, CardContent } from "@mui/material";

function WalletCard({ type, address }) {
	return (
		<Card square sx={{ borderTop: "0.1px solid #ccc" }}>
			<CardContent>
				{type} Wallet {address}
			</CardContent>
		</Card>
	);
}

export default WalletCard;
