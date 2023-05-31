import React, { useState } from "react";
import { Button, Typography, Toolbar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SyncIcon from "@mui/icons-material/Sync";
import AddWalletDialog from "./AddWalletDialog";

function WalletHeader({ addWallet }) {
	const [open, setOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
	const [inputValue, setInputValue] = useState("");

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedOption("");
		setInputValue("");
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
		<Toolbar disableGutters>
			<Grid
				container
				alignItems="center"
				justifyContent="space-between"
				xs={12}
			>
				<Grid xs={12} sm="auto">
					<Typography sx={{ fontSize: 48, fontWeight: "bold" }}>
						Wallets
					</Typography>
				</Grid>
				<Grid container xs={12} sm="auto" spacing={2}>
					<Grid xs={6} sm="auto">
						<Button
							fullWidth
							variant="outlined"
							startIcon={<SyncIcon />}
							size="large"
							sx={{ textTransform: "none" }}
						>
							Sync Wallets
						</Button>
					</Grid>
					<Grid xs={6} sm="auto">
						<Button
							fullWidth
							variant="contained"
							size="large"
							onClick={handleOpen}
							sx={{ textTransform: "none" }}
						>
							Add Wallet
						</Button>
						<AddWalletDialog
							selectedValue={selectedValue}
							open={open}
							onClose={handleClose}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
}

export default WalletHeader;
