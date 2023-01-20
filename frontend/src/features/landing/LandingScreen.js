import { Box } from "@mui/material";
import React from "react";
import AppBar from "../../components/AppBar";
import withRoot from "../../theme/withRoot";
import LandingHero from "./components/LandingHero";

function LandingScreen() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<AppBar />
			<LandingHero />
		</Box>
	);
}

export default withRoot(LandingScreen);
