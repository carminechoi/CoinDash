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
		throw e;
	}
};

const getDashboardCoins = async () => {
	try {
		const topFiveRows = await prisma.$queryRaw`
			SELECT *
			FROM "Coin"
			ORDER BY "marketCapRank"
			LIMIT 4;
		`;
		return topFiveRows;
	} catch (e) {
		throw e;
	}
};

module.exports = {
	getAllCoins,
	getDashboardCoins,
};
