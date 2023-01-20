import React from "react";
import {
	AppBar as MuiAppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";

function AppBar() {
	return (
		<div>
			<MuiAppBar
				position="sticky"
				elevation={0}
				sx={{ color: "black", bgcolor: "white", py: 1 }}
			>
				<Container maxWidth="xxl">
					<Toolbar>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								marginRight: "auto",
								textDecoration: "none",
								color: "inherit",
							}}
						>
							Better Koinly
						</Typography>
						<Box display="flex" justifyContent="flex-end">
							<Button
								variant="outlined"
								color="inherit"
								size="medium"
								sx={{ mx: 1, py: 1, textTransform: "none" }}
							>
								Sign in
							</Button>
							<Button
								variant="contained"
								size="medium"
								sx={{ mx: 1, py: 1, textTransform: "none" }}
							>
								Try it free
							</Button>
						</Box>
					</Toolbar>
				</Container>
			</MuiAppBar>
			<Toolbar />
		</div>
	);
}

export default AppBar;
