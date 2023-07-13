import React, { useState, useEffect } from "react";
import {
	Card,
	CardActionArea,
	CardHeader,
	CardContent,
	CardMedia,
	Avatar,
	Container,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSelector } from "react-redux";
import { useGetCryptoNewsMutation } from "../../../features/news/newsApi";
import { useGetDashboardCoinsMutation } from "../../../features/coin/coinApi";

function DashboardContent({ wallets }) {
	const { news } = useSelector((state) => state.newsState);
	const { dashboardCoins } = useSelector((state) => state.coinState);

	const [newsLoaded, setNewsLoaded] = useState(news.length !== 0);
	const [coinsLoaded, setCoinsLoaded] = useState(dashboardCoins.length !== 0);

	const [getCryptoNews] = useGetCryptoNewsMutation();
	const [getDashboardCoins] = useGetDashboardCoinsMutation();

	const portfolioBalances = wallets.reduce((accumulator, wallet) => {
		const {
			type: { name },
			balance,
		} = wallet;
		if (name in accumulator) {
			accumulator[name] += balance;
		} else {
			accumulator[name] = balance;
		}
		return accumulator;
	}, {});

	const handleCardClick = (url) => {
		window.open(url, "_blank", "noreferrer");
	};

	useEffect(() => {
		if (!newsLoaded) {
			getCryptoNews();
			setNewsLoaded(true);
		}

		if (!coinsLoaded) {
			getDashboardCoins();
			setCoinsLoaded(true);
		}
	}, [getCryptoNews, getDashboardCoins, newsLoaded, coinsLoaded]);

	return (
		<Container sx={{ px: { sm: 12, md: "auto" }, pt: 2, py: 6 }}>
			<Grid container spacing={4}>
				<Grid xs={12}>
					<Typography fontSize={48} fontWeight="bold">
						Dashboard
					</Typography>
				</Grid>
				<Grid xs={12}>
					<Card sx={{ px: 4, py: 4 }}>
						<Typography fontSize={18} fontWeight="medium">
							Portfolio value
						</Typography>
						{Object.keys(portfolioBalances).map((asset) => (
							<Typography key={asset} fontSize={28} fontWeight="bold">
								{asset + " " + portfolioBalances[asset]}
							</Typography>
						))}
					</Card>
				</Grid>
				<Grid xs={12}>
					<Typography fontSize={18} fontWeight="medium">
						Prices
					</Typography>
					<Grid container spacing={1} sx={{ px: 0 }}>
						{dashboardCoins.map((coin, index) => (
							<Grid key={index} xs={12} md={6} lg={3}>
								<Card sx={{ px: 2, py: 2 }}>
									<Grid container alignItems="center" sx={{ p: 0 }}>
										<Grid xs={7}>
											<CardHeader
												avatar={<Avatar alt="CoinLogo" src={coin.image} />}
												title={coin.symbol}
												subheader={coin.name}
												sx={{ padding: 0 }}
											/>
										</Grid>
										<Grid xs={5} sx={{ justifyContent: "flex-end" }}>
											<Typography sx={{ textAlign: "right" }}>
												{coin.currentPrice}
											</Typography>
											<Typography
												color={
													coin.priceChangePercentage24h < 0 ||
													coin.priceChangePercentage24h.includes("-")
														? "red"
														: "green"
												}
												sx={{ textAlign: "right" }}
											>
												{coin.priceChangePercentage24h}%
											</Typography>
										</Grid>
									</Grid>
								</Card>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid xs={12}>
					<Grid container spacing={4} sx={{ px: 0 }}>
						{news.map((item) => (
							<Grid key={item.title} xs={12} sm={6} md={4}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardActionArea
										component="a"
										onClick={() => handleCardClick(item.link)}
									>
										<CardMedia
											component="div"
											image={item.image_url}
											sx={{ pt: "56.25%" }}
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography
												gutterBottom
												fontSize={20}
												fontWeight="medium"
												component="h2"
											>
												{item.title}
											</Typography>
											<Typography>{item.description}</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default DashboardContent;
