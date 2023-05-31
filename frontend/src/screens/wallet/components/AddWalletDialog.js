import React, { useState } from "react";
import {
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	DialogActions,
	Input,
	InputLabel,
	FormControl,
	IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SearchTextField from "../../../components/SearchTextField";
import { useGetWalletTypesQuery } from "../../../features/wallet/walletApi";
import Progress from "../../../components/Progress";

// function WalletTypeSelection({ setCurrentType }) {
// 	const { data: walletTypes, error, isLoading } = useGetWalletTypesQuery();

// 	const handleCardClick = (value) => {
// 		setCurrentType(value);
// 	};

// 	return (
// 		<DialogContent>
// 			<WalletTypeSelection />
// 			{error ? (
// 				<Alert severity="error">Unable to reach server</Alert>
// 			) : isLoading ? (
// 				<Progress />
// 			) : (
// 				<Grid container spacing={2} paddingTop={2} paddingBottom={2}>
// 					<SearchTextField />
// 					{walletTypes.map((type) => (
// 						<Grid sm={4} key={type.name}>
// 							<Card variant="outlined">
// 								<CardActionArea
// 									onClick={() => handleCardClick(type.name)}
// 									sx={{ display: "flex", px: 2 }}
// 								>
// 									<CardMedia
// 										component="img"
// 										height="40"
// 										width="40"
// 										image={type.image}
// 										alt={type.name}
// 										sx={{
// 											objectFit: "contain",
// 										}}
// 									/>
// 									<CardContent>
// 										<Typography>{type.name}</Typography>
// 									</CardContent>
// 								</CardActionArea>
// 							</Card>
// 						</Grid>
// 					))}
// 				</Grid>
// 			)}
// 		</DialogContent>
// 	);
// }

function AddWalletDialog( ) {
	const [open, setOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
	const [inputValue, setInputValue] = useState("");

	const handleOpen = () => {
		setOpen(true);
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSubmit = () => {
		if (selectedOption === "coinbase") {
			// Handle Coinbase API key input
			console.log("Coinbase API key:", inputValue);
		} else if (selectedOption === "ethereum") {
			// Handle Ethereum wallet address input
			console.log("Ethereum wallet address:", inputValue);
		}

		setSelectedOption("");
		setInputValue("");
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Select an option</DialogTitle>
			<DialogContent>
				{!selectedOption ? (
					<>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setSelectedOption("coinbase")}
						>
							Coinbase
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setSelectedOption("ethereum")}
						>
							Ethereum
						</Button>
					</>
				) : (
					<>
						<IconButton onClick={() => setSelectedOption("")}>
							<ArrowBackIcon />
						</IconButton>
						<FormControl>
							<InputLabel>
								{selectedOption === "coinbase"
									? "Coinbase API Key"
									: "Ethereum Wallet Address"}
							</InputLabel>
							<Input
								value={inputValue}
								onChange={handleInputChange}
							/>
						</FormControl>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={handleSubmit} color="primary">
								Submit
							</Button>
						</DialogActions>
					</>
				)}
			</DialogContent>
		</Dialog>
		// <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
		// 	<DialogTitle>Add wallet</DialogTitle>
		// 	{currentType == "" ? (
		// 		<WalletTypeSelection setCurrentType={setCurrentType} />
		// 	) : (
		// 		<Typography>Hello World</Typography>
		// 	)}
		// </Dialog>
	);
}

export default AddWalletDialog;
