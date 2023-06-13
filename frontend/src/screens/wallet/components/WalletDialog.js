import React, { useState, useEffect } from "react";
import {
	Alert,
	LinearProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
	Button,
	Divider,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	TextField,
	IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SearchTextField from "../../../components/SearchTextField";
import {
	useGetWalletTypesQuery,
	useAddNewWalletMutation,
} from "../../../features/wallet/walletApi";
import Progress from "../../../components/Progress";

function CoinbaseMenu() {
	return <DialogContent></DialogContent>;
}

function EthereumMenu({ handleClose, setOpen, setAddWalletSuccess }) {
	const [addNewWallet, response] = useAddNewWalletMutation();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.target.form);
		addNewWallet({ type: "Ethereum", address: data.get("address") });
	};

	useEffect(() => {
		if (response.isSuccess) {
			setAddWalletSuccess(true);
			handleClose();
		}
	}, [handleClose, response.isSuccess, setAddWalletSuccess]);

	return (
		<DialogContent>
			<Typography
				paddingBottom={2}
				sx={{
					color: (theme) => theme.palette.grey[600],
				}}
			>
				We are only requesting view permissions. This does not give us
				access to your private keys nor the ability move your funds.
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				paddingBottom={4}
			>
				{/* Show loading state */}
				{response.isLoading && <LinearProgress />}

				{/* Show error message if the mutation fails */}
				{response.isError && (
					<Alert severity="error">
						{response.error.data.message}
					</Alert>
				)}

				<Box paddingTop={1} paddingBottom={3}>
					<Typography sx={{ fontWeight: "medium" }}>
						Public address
					</Typography>
					<TextField
						placeholder="Paste a public address"
						variant="outlined"
						fullWidth
						id="address"
						name="address"
						autoFocus
					/>
				</Box>

				<Button
					type="submit"
					variant="contained"
					size="large"
					onClick={handleSubmit}
					fullWidth
				>
					Add Ethereum
				</Button>
			</Box>
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

function WalletDialog({ open, setOpen, setAddWalletSuccess }) {
	const [selectedOption, setSelectedOption] = useState("Wallet");

	const handleClose = () => {
		resetWalletDialog();
		setOpen(false);
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
					<EthereumMenu
						handleClose={handleClose}
						setOpen={setOpen}
						setAddWalletSuccess={setAddWalletSuccess}
					/>
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
