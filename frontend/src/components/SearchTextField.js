import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchTextField() {
    return (
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
                fullWidth
                type="search"
                placeholder="Search for your integration"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default SearchTextField;
