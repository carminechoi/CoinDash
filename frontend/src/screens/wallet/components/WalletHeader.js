import React, { useState } from "react";
import { Button, Typography, Toolbar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SyncIcon from "@mui/icons-material/Sync";
import WalletDialog from "./WalletDialog";

function WalletHeader({ addWallet }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
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
						<WalletDialog open={open} setOpen={setOpen} />
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
}

export default WalletHeader;
