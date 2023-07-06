const { prisma, Prisma } = require("../../prisma/prisma.client");
const { EtherscanService } = require("./etherscan.service");

const createTransactions = async (
	user,
	walletId,
	walletType,
	walletAddress
) => {
	try {
		switch (walletType) {
			case "Ethereum":
				const transactions = await EtherscanService.fetchTransactions(
					walletAddress
				);

				transactions.map(async (transaction) => {
					await prisma.Transaction.create({
						data: {
							hash: transaction.hash,
							value: transaction.value,
							gas: transaction.gas,
							gasPrice: transaction.gasPrice,
							to: transaction.to,
							from: transaction.from,
							walletId: walletId,
							userId: user.id,
						},
					});
				});
			default:
		}
	} catch (e) {
		throw e;
	}
};

const deleteTransactions = async (userId, walletId) => {
	try {
		await prisma.Transaction.deleteMany({
			where: {
				userId: userId,
				walletId: walletId,
			},
		});
	} catch (e) {
		throw e;
	}
};

module.exports = { createTransactions, deleteTransactions };
