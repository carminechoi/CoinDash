import React, { useState } from "react";
import { Button, Typography, Toolbar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import WalletDialog from "./WalletDialog";

function WalletHeader({ addWallet, setAddWalletSuccess }) {
	const [open, setOpen] = useState(addWallet);

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Toolbar disableGutters sx={{ mb: 2 }}>
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
					<Grid xs={12} sm="auto">
						<Button
							fullWidth
							variant="contained"
							size="large"
							onClick={handleOpen}
							sx={{ textTransform: "none" }}
						>
							Add Wallet
						</Button>
						<WalletDialog
							open={open}
							setOpen={setOpen}
							setAddWalletSuccess={setAddWalletSuccess}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
}

export default WalletHeader;
