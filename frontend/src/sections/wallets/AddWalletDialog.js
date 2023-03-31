import React from "react";
import {
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import SearchTextField from "../../components/SearchTextField";
import { useGetWalletTypesQuery } from "../../features/wallet/walletApi";
import Progress from "../../components/Progress";

function AddWalletDialog(props) {
    const { onClose, selectedValue, open } = props;
    const { data: walletTypes, error, isLoading } = useGetWalletTypesQuery();

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
                {error ? (
                    <Alert severity="error">Unable to reach server</Alert>
                ) : isLoading ? (
                    <Progress />
                ) : (
                    <Grid container spacing={2}>
                        {walletTypes.map((type) => (
                            <Grid sm={4}>
                                <Card
                                    variant="outlined"
                                    sx={{ display: "flex", px: 2, py: 2 }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 35 }}
                                        image={type.image}
                                        alt={type.name}
                                    />
                                    <Typography>{type.name}</Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default AddWalletDialog;
