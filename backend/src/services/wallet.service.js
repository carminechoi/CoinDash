const { prisma, Prisma } = require("../../prisma/prisma.client");
const { EtherscanService } = require("./etherscan.service");

const getWalletTypes = async () => {
	const walletTypes = await prisma.walletType.findMany();
	return walletTypes;
};

const getUserWallets = async (user) => {
	const userWallets = await prisma.wallet.findMany({
		where: { userId: user.id },
		select: {
			address: true,
			type: {
				select: { name: true, category: true },
			},
		},
	});

	return userWallets;
};

const createWallet = async (user, walletData) => {
	let wallet = {};
	try {
		switch (walletData.type) {
			case "Ethereum":
				const balance = await EtherscanService.getAddressBalance(
					walletData.address
				);

				const walletType = await prisma.walletType.findUnique({
					where: { name: "Ethereum" },
				});
				const walletTypeId = walletType.id;

				wallet = {
					address: walletData.address,
					userId: user.id,
					walletTypeId: walletTypeId,
					balance: balance,
				};

			default:
		}

		await prisma.Wallet.create({ data: wallet });
	} catch (e) {
		console.log(e);
		if (e.message === "Address is invalid. Please enter a valid address.") {
			throw e;
		} else if (
			e instanceof Prisma.PrismaClientKnownRequestError &&
			e.code === "P2002"
		) {
			throw new Error("Address is already added");
		} else {
			throw new Error("An error occured, please try again.");
		}
	}
};

module.exports = { getWalletTypes, getUserWallets, createWallet };
