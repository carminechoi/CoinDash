import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(coin, price, change, marketcap, volume) {
    return { coin, price, change, marketcap, volume };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function CryptoPriceTable({ type }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Coin</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">24h change</TableCell>
                        <TableCell align="right">Market cap</TableCell>
                        <TableCell align="right">24h volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.coin}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.change}</TableCell>
                            <TableCell align="right">{row.marketcap}</TableCell>
                            <TableCell align="right">{row.volume}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CryptoPriceTable;
