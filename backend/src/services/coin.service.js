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

module.exports = {
	getAllCoins,
};
