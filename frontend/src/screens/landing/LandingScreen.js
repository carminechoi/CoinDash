import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import Hero from "./components/hero";
import Features from "./components/features";
import withRoot from "../../theme/withRoot";
import CallToAction from "./components/callToAction";

function LandingScreen() {
	const accessToken = useSelector((state) => state.authState.accessToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (accessToken) navigate("/u/dashboard");
	}, [accessToken, navigate]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<AppBar />
			<Hero />
			<Features />
			<CallToAction />
			<Footer />
		</Box>
	);
}

export default withRoot(LandingScreen);
