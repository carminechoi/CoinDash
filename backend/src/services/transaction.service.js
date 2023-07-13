const { prisma, Prisma } = require("../../prisma/prisma.client");
const { EtherscanService } = require("./etherscan.service");
const {
	convertWeiToEth,
	convertGasToGwei,
	convertTimeStampToDateString,
} = require("../utils/currency.util");

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

				const transactionData = transactions.map((transaction) => ({
					hash: transaction.hash,
					value: convertWeiToEth(transaction.value),
					gas: transaction.gas,
					gasPrice: convertGasToGwei(transaction.gasPrice),
					to: transaction.to,
					from: transaction.from,
					timeStamp: convertTimeStampToDateString(transaction.timeStamp),
					walletId: walletId,
					userId: user.id,
				}));

				await prisma.Transaction.createMany({
					data: transactionData,
					skipDuplicates: true,
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
