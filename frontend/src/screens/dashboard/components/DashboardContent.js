import React, { useState, useEffect } from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useSelector } from "react-redux";
import { useGetCryptoNewsMutation } from "../../../features/news/newsApi";

function DashboardContent({ wallets }) {
	const { news } = useSelector((state) => state.newsState);
	const [newsLoaded, setNewsLoaded] = useState(news.length !== 0);

	const [getCryptoNews] = useGetCryptoNewsMutation();

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
	}, [getCryptoNews, newsLoaded]);

	return (
		<Container sx={{ px: { sm: 12, md: "auto" }, pt: 2, py: 6 }}>
			<Typography fontSize={48} fontWeight="bold">
				Dashboard
			</Typography>
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
			<Grid container spacing={4}>
				{news.map((data) => (
					<Grid key={data.title} xs={12} sm={6} md={4}>
						<Card
							sx={{ height: "100%", display: "flex", flexDirection: "column" }}
						>
							<CardActionArea
								component="a"
								onClick={() => handleCardClick(data.link)}
							>
								<CardMedia
									component="div"
									image={data.image_url}
									sx={{ pt: "56.25%" }}
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography
										gutterBottom
										fontSize={20}
										fontWeight="medium"
										component="h2"
									>
										{data.title}
									</Typography>
									<Typography>{data.description}</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

export default DashboardContent;
