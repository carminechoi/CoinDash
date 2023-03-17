const { prisma } = require("../../prisma/prisma.client");

const getAllCoins = async () => {
    try {
        const coins = await prisma.coin.findMany({
            orderBy: {
                marketCapRank: "asc",
            },
        });
        return coins;
    } catch (e) {
        console.log(`error: ${error}`);
    }
};

module.exports = {
    getAllCoins,
};
