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
	TextField,
	IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SearchTextField from "../../../components/SearchTextField";
import { useGetWalletTypesQuery } from "../../../features/wallet/walletApi";
import Progress from "../../../components/Progress";

function CoinbaseMenu() {
	return <DialogContent></DialogContent>;
}

function EthereumMenu({ setSelectedOption }) {
	const handleSubmit = () => {
		setSelectedOption("Wallet");
	};

	return (
		<DialogContent>
			{/* <FormControl>
				<InputLabel>Paste a public address</InputLabel>
				<Input value={inputValue} onChange={handleInputChange} />
			</FormControl> */}
			<Typography>
				We are only requesting view permissions. This does not give us
				access to your private keys nor the ability move your funds.
			</Typography>
			<Typography>Public address</Typography>
			<TextField
				placeholder="Paste a public address"
				variant="outlined"
				fullWidth
			/>
			<DialogActions>
				<Button variant="contained" onClick={handleSubmit} fullWidth>
					Add Ethereum
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
		resetWalletDialog();
	};

	const resetWalletDialog = () => {
		setSelectedOption("Wallet");
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={{ display: "flex", alignItems: "center" }}>
				{selectedOption !== "Wallet" && (
					<IconButton
						aria-label="close"
						onClick={resetWalletDialog}
						sx={{
							py: 0,
							pl: 0,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<ArrowBackIcon />
					</IconButton>
					
				)}
				Add {selectedOption}
				<IconButton
					edge="end"
					aria-label="close"
					onClick={handleClose}
					sx={{
						marginLeft: "auto",
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
