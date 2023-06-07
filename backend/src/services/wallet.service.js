const { prisma } = require("../../prisma/prisma.client");

const getWalletTypes = async () => {
	const walletTypes = await prisma.walletType.findMany();
	return walletTypes;
};

const createWallet = async (user, walletData) => {
	let wallet = {};

	switch (walletData.type) {
		case "Ethereum":
			const walletType = await prisma.walletType.findUnique({
				where: { name: "Ethereum" },
			});
			const walletTypeId = walletType.id;

			wallet = {
				address: walletData.address,
				userId: user.id,
				walletTypeId: walletTypeId,
			};

		default:
	}
	await prisma.Wallet.create({ data: wallet });
};

module.exports = { getWalletTypes, createWallet };
