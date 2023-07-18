import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useNavigate } from "react-router-dom";

function Hero() {
	const navigate = useNavigate();

	return (
		<Grid
			container
			justifyContent="center"
			sx={{
				pt: 20,
				pb: 25,
				px: { xs: 3, sm: 5, md: 10, lg: 20 },
			}}
		>
			<Grid xs={12}>
				<Typography
					variant="h1"
					align="center"
					sx={{
						fontSize: { xs: 40, sm: 55, md: 75 },
						fontWeight: "bold",
						letterSpacing: 2,
						maxWidth: "800px",
						mx: "auto",
					}}
				>
					Create your Crypto Dashboard Now
				</Typography>
			</Grid>
			<Grid xs={12}>
				<Typography
					variant="body1"
					align="center"
					color="text.secondary"
					sx={{ fontSize: { xs: 16, md: 18 }, mt: 2 }}
				>
					Easily sync wallets and generate your crypto dashboard
				</Typography>
				<Typography
					variant="body1"
					align="center"
					color="text.secondary"
					sx={{ fontSize: { xs: 16, md: 18 } }}
				>
					Trusted by 1 user &lt;3
				</Typography>
			</Grid>
			<Grid xs={12}>
				<Box display="flex" justifyContent="center" mt={2}>
					<Button
						fullWidth
						variant="contained"
						size="large"
						onClick={() => navigate("/u/signup")}
						sx={{
							py: 1.4,
							px: 5,
							textTransform: "none",
							maxWidth: "650px",
						}}
					>
						Get started
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}

export default Hero;
