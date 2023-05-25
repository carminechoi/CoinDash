import React from "react";
import {
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@mui/material";

function TransactionList() {
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

export default TransactionList;
