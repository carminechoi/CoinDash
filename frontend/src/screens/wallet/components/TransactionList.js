import React, { useState, useEffect } from "react";
import {
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Divider,
	TablePagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";
import TransactionCard from "./TransactionCard";

function TransactionAccordian({ transactions }) {
	const [isExpanded, setExpandedAccordions] = useState(transactions.length > 0);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const startIndex = page * rowsPerPage;
	const endIndex = (page + 1) * rowsPerPage;
	const currentTransactions = transactions.slice(startIndex, endIndex);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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
				{currentTransactions.map((transaction, index) => (
					<div key={index}>
						<TransactionCard
							transaction={transaction}
							isSquare={index !== currentTransactions.length - 1}
						/>
						{index < currentTransactions.length - 1 && <Divider />}
					</div>
				))}
				<TablePagination
					count={transactions.length}
					page={page}
					onChange={handleChangePage}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</AccordionDetails>
		</Accordion>
	);
}

function TransactionList() {
	const { wallet } = useSelector((state) => state.walletState);

	return (
		<div>
			<TransactionAccordian transactions={wallet.transactions ?? []} />
		</div>
	);
}

export default TransactionList;
