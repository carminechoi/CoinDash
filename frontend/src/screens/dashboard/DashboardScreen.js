import React from "react";
// import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import AppBar from "../../components/AppBar";
import withRoot from "../../theme/withRoot";
import Footer from "../../components/Footer";
import AddWalletCard from "./components/AddWalletCard";

function DashboardScreen() {
	// const { userId } = useSelector((state) => state.userState);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<AppBar />
			<AddWalletCard />
			<Footer />
		</Box>
	);
}

export default withRoot(DashboardScreen);
