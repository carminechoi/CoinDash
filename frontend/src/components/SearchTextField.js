import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchTextField({ placeholder, data, setData }) {
	const [searchText, setSearchText] = useState("");

	const handleSearchChange = (event) => {
		const { value } = event.target;
		setSearchText(value);

		// Filter data based on the search input
		const filteredData = data.filter((item) =>
			item.name.toLowerCase().includes(value.toLowerCase())
		);
		setData(filteredData);
	};

	return (
		<TextField
			fullWidth
			type="search"
			placeholder={placeholder}
			value={searchText}
			onChange={handleSearchChange}
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
