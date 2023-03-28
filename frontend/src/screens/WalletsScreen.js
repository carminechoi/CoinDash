import React from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    Toolbar,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Dialog,
    DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SyncIcon from "@mui/icons-material/Sync";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import withRoot from "../theme/withRoot";

const walletCategories = [
    "Exchanges",
    "Crypto Wallets",
    "Imported Wallets",
    "Other Transactions",
];

function AddWalletDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add wallet</DialogTitle>
        </Dialog>
    );
}

function Header() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <Toolbar disableGutters>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                xs={12}
            >
                <Grid xs={12} sm="auto">
                    <Typography sx={{ fontSize: 48, fontWeight: "bold" }}>
                        Wallets
                    </Typography>
                </Grid>
                <Grid container xs={12} sm="auto" spacing={2}>
                    <Grid xs={6} sm="auto">
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<SyncIcon />}
                            size="large"
                            sx={{ textTransform: "none" }}
                        >
                            Sync Wallets
                        </Button>
                    </Grid>
                    <Grid xs={6} sm="auto">
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={handleClickOpen}
                            sx={{ textTransform: "none" }}
                        >
                            Add Wallet
                        </Button>
                        <AddWalletDialog
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    );
}

function WalletSection() {
    return (
        <TableContainer component={Paper} variant="outlined">
            <Table>
                <TableBody>
                    {walletCategories.map((category) => (
                        <>
                            <TableRow sx={{ backgroundColor: "#F7F7F7" }}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontWeight: "medium",
                                        }}
                                    >
                                        {category}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography>None added</Typography>
                                </TableCell>
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function TransactionSection() {
    return (
        <TableContainer component={Paper} variant="outlined">
            <Table>
                <TableBody>
                    <TableRow sx={{ backgroundColor: "#F7F7F7" }}>
                        <TableCell>
                            <Typography
                                sx={{
                                    fontWeight: "medium",
                                }}
                            >
                                {" "}
                                Other Transactions
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography>None added</Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function WalletsScreen({ addWallet = false }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar />
            <Container sx={{ px: { sm: 12, md: "auto" }, py: 2 }}>
                <Header />
                <Grid
                    container
                    justifyContent="space-between"
                    spacing={4}
                    pt={2}
                    my={2}
                >
                    <Grid xs={12} md={5}>
                        <WalletSection />
                    </Grid>
                    <Grid xs={12} md={7}>
                        <TransactionSection />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}

export default withRoot(WalletsScreen);
