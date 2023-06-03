import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchTextField({ placeholder }) {
	return (
		<TextField
			fullWidth
			type="search"
			placeholder={placeholder}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	);
}

export default SearchTextField;
