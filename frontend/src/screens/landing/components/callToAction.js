import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";

import { useNavigate } from "react-router-dom";

function CallToAction() {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Box
			color="white"
			justifyContent="center"
			sx={{
				py: 10,
				px: 2,
				mt: "auto",
				backgroundColor: theme.palette.primary.main,
			}}
		>
			<Typography fontSize={16} textAlign="center">
				Join CoinDash
			</Typography>
			<Typography fontWeight="bold" fontSize={36} textAlign="center">
				Ready to start your crypto dashboard?
			</Typography>
			<Typography fontSize={16} textAlign="center" color="#F7F7F7" mt={2}>
				CoinDash makes it simple to track your crypto Journey
			</Typography>
			<Box display="flex" justifyContent="center" mt={5}>
				<Button
					variant="contained"
					size="large"
					onClick={() => navigate("/u/signup")}
					sx={{
						py: 1.4,
						color: theme.palette.primary.main,
						backgroundColor: "#FFFFFF",
						"&:hover": {
							color: "black",
							backgroundColor: "#FFFFFF",
						},
					}}
				>
					Try it free
				</Button>
			</Box>
		</Box>
	);
}

export default CallToAction;
