import React, { useState } from "react";
import {
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
	Divider,
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
import CloseIcon from "@mui/icons-material/Close";

import SearchTextField from "../../../components/SearchTextField";
import { useGetWalletTypesQuery } from "../../../features/wallet/walletApi";
import Progress from "../../../components/Progress";

function CoinbaseMenu() {
	return <></>;
}

function EthereumMenu({ setSelectedOption }) {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSubmit = () => {
		console.log("Ethereum wallet address:", inputValue);

		setSelectedOption("Wallet");
	};

	return (
		<DialogContent>
			<FormControl>
				<InputLabel>Ethereum Wallet Address</InputLabel>
				<Input value={inputValue} onChange={handleInputChange} />
			</FormControl>
			<DialogActions>
				<Button variant="contained" onClick={handleSubmit} fullWidth>
					Submit
				</Button>
			</DialogActions>
		</DialogContent>
	);
}

function WalletTypeMenu({ setSelectedOption }) {
	const { data: walletTypes, error, isLoading } = useGetWalletTypesQuery();
	return (
		<DialogContent>
			{error ? (
				<Alert severity="error">Unable to reach server</Alert>
			) : isLoading ? (
				<Progress />
			) : (
				<Grid container spacing={2}>
					<Grid xs={12}>
						<SearchTextField placeholder="Search for your integration" />
					</Grid>
					{walletTypes.map((type) => (
						<Grid sm={4} key={type.name}>
							<Card variant="outlined">
								<CardActionArea
									onClick={() => setSelectedOption(type.name)}
									sx={{ display: "flex", px: 2 }}
								>
									<CardMedia
										component="img"
										height="40"
										width="40"
										image={type.image}
										alt={type.name}
										sx={{
											objectFit: "contain",
										}}
									/>
									<CardContent>
										<Typography>{type.name}</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
		</DialogContent>
	);
}

function WalletDialog({ open, setOpen }) {
	const [selectedOption, setSelectedOption] = useState("Wallet");

	const handleClose = () => {
		setOpen(false);
		setSelectedOption("Wallet");
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				Add {selectedOption}
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 10,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<Divider />

			{{
				Ethereum: (
					<EthereumMenu setSelectedOption={setSelectedOption} />
				),
				Coinbase: (
					<CoinbaseMenu setSelectedOption={setSelectedOption} />
				),
				Wallet: (
					<WalletTypeMenu setSelectedOption={setSelectedOption} />
				),
			}[selectedOption] || (
				<WalletTypeMenu setSelectedOption={setSelectedOption} />
			)}
		</Dialog>
	);
}

export default WalletDialog;
