import React from "react";
import { Button, Box, Container, Grid, Typography } from "@mui/material";

function LandingHero() {
	return (
		<Grid
			container
			alignItems={"center"}
			justify={"center"}
			direction="column"
			spacing={2}
		>
			<Grid item>
				<Container maxWidth="md" sx={{ mt: 5 }}>
					<Typography
						variant="h1"
						align="center"
						sx={{
							fontSize: { xs: 40, md: 75 },
							fontWeight: "bold",
							letterSpacing: 2,
						}}
					>
						Crypto & NFT Taxes done fast
					</Typography>
				</Container>
			</Grid>
			<Grid item>
				<Container maxWidth="sm" sx={{ my: 2 }}>
					<Typography
						variant="body1"
						align="center"
						sx={{ fontSize: { xs: 16, md: 18 } }}
					>
						Easily sync wallets and generate tax forms
					</Typography>
					<Typography
						variant="body1"
						align="center"
						sx={{ fontSize: { xs: 16, md: 18 } }}
					>
						Trusted by 1 user &lt;3
					</Typography>
				</Container>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<Button variant="contained" sx={{ py: 2, px: 5 }}>
					Try it free
				</Button>
			</Grid>
		</Grid>
	);
}

export default LandingHero;
