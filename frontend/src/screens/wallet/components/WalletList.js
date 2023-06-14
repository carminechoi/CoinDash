import React from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import WalletCard from "./WalletCard";

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
		<div>
			{walletCategories.map((category, index) => {
				const filteredWallets = wallets.filter(
					(wallet) =>
						wallet.type &&
						wallet.type.category &&
						category.toUpperCase().includes(wallet.type.category)
				);

				return (
					<Accordion
						key={index}
						defaultExpanded={
							filteredWallets.length === 0 ? false : true
						}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`panel-content-${index}`}
							id={`panel-id-${index}`}
							sx={{
								backgroundColor: "#F7F7F7",
							}}
						>
							<Typography fontWeight="medium">
								{category}
							</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ padding: 0 }}>
							{filteredWallets.map((wallet) => (
								<WalletCard
									key={wallet.id}
									type={wallet.type.name ?? ""}
									address={wallet.address}
								/>
							))}
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
}

export default WalletList;
