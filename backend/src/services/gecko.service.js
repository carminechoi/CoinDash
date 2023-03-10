const { prisma } = require("../../prisma/prisma.client");

const fetchAllCoins = async () => {
    try {
        const response = await fetch(
            `${process.env.COIN_GECKO_URL}/coins/markets?vs_currency=usd`
        );

        const coins = await response.json();
        // await prisma.coins.createMany({ data: coins });
    } catch (error) {
        console.log(`error: ${error}`);
        // prisma.$disconnect();
    }
};

module.exports = {
    fetchAllCoins,
};
