import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function AddWalletCard() {
	const navigate = useNavigate();

	const handleAddWallet = () => navigate("/u/wallets/add-wallet");

	return (
		<Container maxWidth="sm">
			<Box
				mt={{ xs: 1, sm: 8 }}
				mb={{ xs: 6, sm: 14 }}
				px={{ xs: 1, sm: 5 }}
				py={{ xs: 5, sm: 8 }}
				sx={{ boxShadow: { xs: 0, sm: 2 } }}
			>
				<Grid container spacing={6}>
					<Grid xs={12}>
						<Typography
							align="center"
							color="primary"
							sx={{
								fontSize: { xs: 42, md: 52 },
								fontWeight: "bold",
								lineHeight: { xs: 1.2, md: "normal" },
							}}
						>
							Welcome to CoinDash
						</Typography>
					</Grid>
					<Grid xs={12}>
						<Typography variant="body1">
							Connect all your wallets and exchanges to view your personalized
							crypto dashboard.
						</Typography>
					</Grid>
					<Grid xs={12}>
						<Grid container rowSpacing={2} padding={0}>
							<Grid xs={12}>
								<Button variant="contained" fullWidth onClick={handleAddWallet}>
									+ Add wallet
								</Button>
							</Grid>
							<Grid xs={12}>
								<Typography variant="body1" color="text.secondary">
									Psst! You can also manually add your transactions.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default AddWalletCard;
