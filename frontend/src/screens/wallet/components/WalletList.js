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

function WalletAccordian({ category, wallets }) {
	const [isExpanded, setExpandedAccordions] = useState(wallets.length > 0);

	const handleAccordionChange = () => {
		setExpandedAccordions(!isExpanded);
	};

	useEffect(() => {
		setExpandedAccordions(wallets.length > 0);
	}, [wallets.length]);

	return (
		<Accordion
			expanded={isExpanded}
			onChange={() => handleAccordionChange()}
			sx={{ margin: "12 0" }}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`panel-content`}
				sx={{
					backgroundColor: "#F7F7F7",
				}}
			>
				<Typography fontWeight="medium">{category}</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ padding: 0 }}>
				{wallets.map((wallet, index) => (
					<div key={index}>
						<WalletCard
							id={wallet.id}
							type={wallet.type.name ?? ""}
							address={wallet.address}
							balance={wallet.balance}
							isSquare={index !== wallets.length - 1}
						/>
						{index < wallets.length - 1 && <Divider />}
					</div>
				))}
			</AccordionDetails>
		</Accordion>
	);
}

function WalletList() {
	const { wallets } = useSelector((state) => state.walletState);

	const [exchangeWallets, setExchangeWallets] = useState([]);
	const [cryptoWallets, setCryptoWallets] = useState([]);

	useEffect(() => {
		setExchangeWallets(
			wallets.filter((wallet) =>
				walletCategories[0].toUpperCase().includes(wallet.type.category)
			)
		);
		setCryptoWallets(
			wallets.filter((wallet) =>
				walletCategories[1].toUpperCase().includes(wallet.type.category)
			)
		);
	}, [wallets]);

	return (
		<div>
			<WalletAccordian
				category={walletCategories[0]}
				wallets={exchangeWallets}
			/>
			<WalletAccordian
				category={walletCategories[1]}
				wallets={cryptoWallets}
			/>
		</div>
	);
}

export default WalletList;
