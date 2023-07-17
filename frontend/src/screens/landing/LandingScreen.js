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
			<Grid container justifyContent="center" mt={14} mb={18} px={5}>
				<Grid xs={12} sm={12} md={10} lg={7} xl={6}>
					<Hero />
				</Grid>
				<Grid xs={12} sm={12} md={10} lg={9} xl={8} sx={{ marginTop: 20 }}>
					<Features />
				</Grid>
			</Grid>
			<CallToAction />
			<Footer />
		</Box>
	);
}

export default withRoot(LandingScreen);
