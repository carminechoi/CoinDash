const { PrismaClient, prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchAllCoins = async () => {
    try {
        const response = await fetch(
            `${env(COIN_GECKO_URL)}/coins/markets?vs_currency=usd`
        );
        const coins = await response.json().map((coin) => {
            name: coin.id;
        });
        await prisma.coins.createMany({ data: coins });
    } catch (error) {
        prisma.$disconnect();
    }
};

module.exports = {
    fetchAllCoins,
};
