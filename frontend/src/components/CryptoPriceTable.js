import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

import Paper from "@mui/material/Paper";

import { useGetAllCoinsMutation } from "../features/coin/coinApi";

function CryptoPriceTable({ type }) {
    const { coins } = useSelector((state) => state.coinState);
    const [getAllCoins, { isLoading, isError }] = useGetAllCoinsMutation();

    useEffect(() => {
        switch (type) {
            default:
                getAllCoins();
        }
    }, [getAllCoins, type]);

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
                    {coins.map((coin) => (
                        <TableRow
                            key={coin.marketCapRank}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{coin.marketCapRank}</TableCell>
                            <TableCell>{coin.name}</TableCell>
                            <TableCell align="right">
                                {coin.currentPrice}
                            </TableCell>
                            <TableCell align="right">
                                {coin.priceChange24h}
                            </TableCell>
                            <TableCell align="right">
                                {coin.marketCap}
                            </TableCell>
                            <TableCell align="right">
                                {coin.marketCapChange24h}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CryptoPriceTable;
