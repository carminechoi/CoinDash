const { prisma } = require("../../prisma/prisma.client");

const fetchAllCoins = async () => {
    try {
        const response = await fetch(
            `${process.env.COIN_GECKO_URL}/coins/markets?vs_currency=usd`
        );

        const coins = await response.json();

        coins.map(async (coin) => {
            await prisma.coin.upsert({
                where: {
                    coinId: coin.id,
                },
                update: {
                    currentPrice: coin.current_price,
                    marketCap: coin.market_cap,
                    marketCapRank: coin.market_cap_rank,
                    priceChange24h: coin.price_change_24h,
                    priceChangePercentage24h: coin.price_change_percentage_24h,
                    marketCapChange24h: coin.market_cap_change_24h,
                    marketCapChangePercentage24h:
                        coin.market_cap_change_percentage_24h,
                    lastUpdated: coin.last_updated,
                },
                create: {
                    coinId: coin.id,
                    symbol: coin.symbol,
                    name: coin.name,
                    image: coin.image,
                    currentPrice: coin.current_price,
                    marketCap: coin.market_cap,
                    marketCapRank: coin.market_cap_rank,
                    priceChange24h: coin.price_change_24h,
                    priceChangePercentage24h: coin.price_change_percentage_24h,
                    marketCapChange24h: coin.market_cap_change_24h,
                    marketCapChangePercentage24h:
                        coin.market_cap_change_percentage_24h,
                    lastUpdated: coin.last_updated,
                },
            });
        });
        console.log("saved coins");
    } catch (error) {
        console.log(`error: ${error}`);
        // prisma.$disconnect();
    }
};

module.exports = {
    fetchAllCoins,
};
