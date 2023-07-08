import React, { useState, useEffect } from "react";
import {
	Typography,
	// TableContainer,
	// Table,
	// TableBody,
	// TableRow,
	// TableCell,
	// Paper,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";
import TransactionCard from "./TransactionCard";

function TransactionAccordian({ transactions }) {
	const [isExpanded, setExpandedAccordions] = useState(transactions.length > 0);

	const handleAccordionChange = () => {
		setExpandedAccordions(!isExpanded);
	};

	useEffect(() => {
		setExpandedAccordions(transactions.length > 0);
	}, [transactions.length]);

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
				<Typography fontWeight="medium">Transactions</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ padding: 0 }}>
				{transactions.map((transaction, index) => (
					<div key={index}>
						<TransactionCard
							value={transaction.value}
							toAddress={transaction.to}
							isSquare={index !== transactions.length - 1}
						/>
						{index < transactions.length - 1 && <Divider />}
					</div>
				))}
			</AccordionDetails>
		</Accordion>
	);
}

function TransactionList() {
	const { wallet } = useSelector((state) => state.walletState);

	return (
		<div>
			<TransactionAccordian transactions={wallet.transactions ?? []} />
			{/* <Table>
				<TableBody>
					<TableRow sx={{ backgroundColor: "#F7F7F7" }}>
						<TableCell>
							<Typography
								sx={{
									fontWeight: "medium",
								}}
							>
								Transactions
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						
						{wallet.transactions.map((transaction) => (
							<TableCell>
								<Typography>None added</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table> */}
		</div>
	);
}

export default TransactionList;
