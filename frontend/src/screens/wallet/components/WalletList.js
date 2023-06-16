import React, { useState, useEffect } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Divider,
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
	const [expandedAccordions, setExpandedAccordions] = useState([]);

	useEffect(() => {
		if (wallets.length > 0) {
			const expandedAccordions = walletCategories.map((_, index) => {
				const filteredWallets = wallets.filter(
					(wallet) =>
						wallet.type &&
						wallet.type.category &&
						walletCategories[index]
							.toUpperCase()
							.includes(wallet.type.category)
				);
				return filteredWallets.length > 0;
			});
			setExpandedAccordions(expandedAccordions);
		}
	}, [wallets]);

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
						defaultExpanded={expandedAccordions[index]}
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
							{filteredWallets.map((wallet, index) => (
								<div key={index}>
									<WalletCard
										type={wallet.type.name ?? ""}
										address={wallet.address}
										balance={wallet.balance}
										isSquare={
											index !== filteredWallets.length - 1
										}
									/>
									{index < filteredWallets.length - 1 && (
										<Divider />
									)}
								</div>
							))}
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
}

export default WalletList;
