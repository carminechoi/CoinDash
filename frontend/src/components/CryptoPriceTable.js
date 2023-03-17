import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

import Paper from "@mui/material/Paper";

const PercentageTableCell = styled(TableCell)(({ percent }) => {
    const color = percent < 0 || percent.includes("-") ? "red" : "green";

    return {
        color: color,
        textAlign: "right",
    };
});

function CryptoPriceTable({ type }) {
    const { coins } = useSelector((state) => state.coinState);

    useEffect(() => {
        switch (type) {
            default:
        }
    }, [type]);

    return (
        <TableContainer component={Paper} sx={{ pt: 2 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Coin</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">1h</TableCell>
                        <TableCell align="right">24h</TableCell>
                        <TableCell align="right">7d</TableCell>
                        <TableCell align="right">24h Volume</TableCell>
                        <TableCell align="right">Market Cap</TableCell>
                        <TableCell align="right">Circulating Supply</TableCell>
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
                            <TableCell>
                                <Card elevation={0}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                alt="CoinLogo"
                                                src={coin.image}
                                                sx={{ pr: 2 }}
                                            />
                                        }
                                        title={coin.symbol}
                                        subheader={coin.name}
                                        sx={{ padding: 0 }}
                                    />
                                </Card>
                            </TableCell>
                            <TableCell align="right">
                                {coin.currentPrice}
                            </TableCell>

                            <PercentageTableCell
                                percent={coin.priceChangePercentage1h}
                            >
                                {coin.priceChangePercentage1h}%
                            </PercentageTableCell>
                            <PercentageTableCell
                                percent={coin.priceChangePercentage24h}
                            >
                                {coin.priceChangePercentage24h}%
                            </PercentageTableCell>
                            <PercentageTableCell
                                percent={coin.priceChangePercentage7d}
                            >
                                {coin.priceChangePercentage7d}%
                            </PercentageTableCell>

                            <TableCell align="right">
                                {coin.volume24h}
                            </TableCell>
                            <TableCell align="right">
                                {coin.marketCap}
                            </TableCell>
                            <TableCell align="right">
                                {coin.circulatingSupply}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CryptoPriceTable;
