import React from "react";
import {
	Card,
	CardContent,
	CardActionArea,
	Typography,
	IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ClearIcon from "@mui/icons-material/Clear";

import { useDeleteUserWalletMutation } from "../../../features/wallet/walletApi";
import {
	setWalletWithId,
	deleteWallet,
} from "../../../features/wallet/walletSlice";
import { useDispatch } from "react-redux";

function WalletCard({ id, type, address, balance, isSquare, isSelected }) {
	const [deleteUserWallet] = useDeleteUserWalletMutation();

	const dispatch = useDispatch();

	const handleCardClick = () => {
		if (isSelected) {
			dispatch(deleteWallet());
		} else {
			dispatch(setWalletWithId(id));
		}
	};

	const handleDeleteClick = (event) => {
		event.stopPropagation();
		event.preventDefault();
		deleteUserWallet({ id: id });
	};

	return (
		<Card
			square={isSquare}
			sx={{
				display: "flex",
				boxShadow: "none",
				backgroundColor: isSelected ? "#1976d2" : "inherit",
			}}
		>
			<CardActionArea component="a" onClick={handleCardClick}>
				<CardContent
					sx={{
						flex: 1,
						overflow: "hidden",
						"&:last-child": { paddingBottom: 2 },
					}}
				>
					<Grid container padding={0}>
						<Grid xs={6}>
							<Typography
								fontWeight="medium"
								color={isSelected ? "#ffffff" : "inherit"}
							>
								{type} Wallet
							</Typography>
							<Typography
								fontSize={14}
								color={isSelected ? "#ffffff" : "inherit"}
								sx={{
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{address}
							</Typography>
						</Grid>
						<Grid
							xs={4}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "right",
							}}
						>
							<Typography
								color={isSelected ? "#ffffff" : "inherit"}
								sx={{
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{type === "Ethereum"
									? `${balance.toFixed(2)} eth`
									: `${balance}`}
							</Typography>
						</Grid>
						<Grid
							xs={2}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "right",
							}}
						>
							<IconButton
								aria-label="delete"
								onMouseDown={(event) => event.stopPropagation()}
								onClick={handleDeleteClick}
							>
								<ClearIcon />
							</IconButton>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default WalletCard;
