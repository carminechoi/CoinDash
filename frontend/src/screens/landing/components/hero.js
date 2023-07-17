import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useNavigate } from "react-router-dom";

function Hero() {
	const navigate = useNavigate();

	return (
		<div>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<Grid item>
					<Typography
						variant="h1"
						align="center"
						sx={{
							fontSize: { xs: 40, sm: 55, md: 75 },
							fontWeight: "bold",
							letterSpacing: 2,
						}}
					>
						Create your Crypto Dashboard Now
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						variant="body1"
						align="center"
						color="text.secondary"
						sx={{ fontSize: { xs: 16, md: 18 } }}
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
			</Grid>
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
		</div>
	);
}

export default Hero;
