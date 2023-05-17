const { prisma } = require("../../prisma/prisma.client");
const {
    abbreviateCurrency,
    formatCurrency,
    formatPercentage,
} = require("../utils/currency.util");

class GeckoService {
    static fetchAllCoins = async () => {
        try {
            const response = await fetch(
                `${process.env.COIN_GECKO_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
            );

            const coins = await response.json();

            // Delete all coins not in the new coin list
            await prisma.coin.deleteMany({
                where: {
                    coinId: {
                        notIn: coins.map(({ id }) => id),
                    },
                },
            });

            // Update existing coins or create new ones if it does not exist
            coins.map(async (coin) => {
                await prisma.coin.upsert({
                    where: {
                        coinId: coin.id,
                    },
                    update: {
                        currentPrice: formatCurrency(coin.current_price),
                        volume24h: formatCurrency(coin.total_volume, true),
                        marketCap: formatCurrency(coin.market_cap),
                        marketCapRank: coin.market_cap_rank,
                        priceChangePercentage1h: formatPercentage(
                            coin.price_change_percentage_1h_in_currency
                        ),
                        priceChangePercentage24h: formatPercentage(
                            coin.price_change_percentage_24h_in_currency
                        ),
                        priceChangePercentage7d: formatPercentage(
                            coin.price_change_percentage_7d_in_currency
                        ),
                        circulatingSupply: abbreviateCurrency(
                            coin.circulating_supply
                        ),
                        lastUpdated: coin.last_updated,
                    },
                    create: {
                        coinId: coin.id,
                        symbol: coin.symbol.toUpperCase(),
                        name: coin.name,
                        image: coin.image,
                        currentPrice: formatCurrency(coin.current_price),
                        volume24h: formatCurrency(coin.total_volume, true),
                        marketCap: formatCurrency(coin.market_cap, true),
                        marketCapRank: coin.market_cap_rank,
                        priceChangePercentage1h: formatPercentage(
                            coin.price_change_percentage_1h_in_currency
                        ),
                        priceChangePercentage24h: formatPercentage(
                            coin.price_change_percentage_24h_in_currency
                        ),
                        priceChangePercentage7d: formatPercentage(
                            coin.price_change_percentage_7d_in_currency
                        ),
                        circulatingSupply: abbreviateCurrency(
                            coin.circulating_supply
                        ),
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
}

module.exports = {
    GeckoService,
};
