import React, { useState } from "react";
import {
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import SearchTextField from "../../../components/SearchTextField";
import { useGetWalletTypesQuery } from "../../../features/wallet/walletApi";
import Progress from "../../../components/Progress";

function WalletTypeSelection({ setCurrentType }) {
	const { data: walletTypes, error, isLoading } = useGetWalletTypesQuery();

	const handleCardClick = (value) => {
		setCurrentType(value);
	};

	return (
		<DialogContent>
			<WalletTypeSelection />
			{error ? (
				<Alert severity="error">Unable to reach server</Alert>
			) : isLoading ? (
				<Progress />
			) : (
				<Grid container spacing={2} paddingTop={2} paddingBottom={2}>
					<SearchTextField />
					{walletTypes.map((type) => (
						<Grid sm={4} key={type.name}>
							<Card variant="outlined">
								<CardActionArea
									onClick={() => handleCardClick(type.name)}
									sx={{ display: "flex", px: 2 }}
								>
									<CardMedia
										component="img"
										height="40"
										width="40"
										image={type.image}
										alt={type.name}
										sx={{
											objectFit: "contain",
										}}
									/>
									<CardContent>
										<Typography>{type.name}</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
		</DialogContent>
	);
}

function AddWalletDialog(props) {
	const { onClose, selectedValue, open } = props;
	const { currentType, setCurrentType } = useState("");

	const handleWallet = () => {
		onClose(selectedValue);
	};

	const handleClose = () => {
		onClose(selectedValue);
	  };

	return (
		<Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
			<DialogTitle>Add wallet</DialogTitle>
			{currentType == "" ? (
				<WalletTypeSelection setCurrentType={setCurrentType} />
			) : (
				<Typography>Hello World</Typography>
			)}
		</Dialog>
	);
}
 
export default AddWalletDialog;
