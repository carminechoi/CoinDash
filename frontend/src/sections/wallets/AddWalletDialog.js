import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import SearchTextField from "../../components/SearchTextField";

function AddWalletDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
            <DialogTitle>Add wallet</DialogTitle>
            <DialogContent>
                <SearchTextField />
            </DialogContent>
        </Dialog>
    );
}

export default AddWalletDialog;
