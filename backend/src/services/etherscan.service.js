const { prisma } = require("../../prisma/prisma.client");

class EtherscanService {
	static fetchTransactions = async (address) => {
		const etherscanURL = process.env.ETHERSCAN_URL;
		const etherscanApiKey = process.env.ETHERSCAN_KEY;
		const apiUrl = `${etherscanURL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&apikey=${etherscanApiKey}`;

		try {
			const response = await fetch(apiUrl);
			const transactions = await response.json();

			if (transactions.status === "1") {
				// transactions.result.map(async (transaction) => {
				// 	await prisma.upsert({
				// 		where: {
				// 			hash: transaction.hash,
				// 		},
				// 		update: {},
				// 		create: {
				// 			hash: transaction.hash,
				// 			value: transaction.value,
				// 			gas: transaction.gas,
				// 			gasPrice: transaction.gasPrice,
				// 			to: transaction.to,
				// 			from: transaction.from,
				// 			wallet: { connect: { id: walletId } },
				// 			user: { connect: { id: userId } },
				// 		},
				// 	});
				// });
				return transactions.result;
			} else {
				next();
			}
		} catch (error) {
			console.error(`error: ${error}`);
		}
	};

	static getAddressBalance = async (address) => {
		const etherscanURL = process.env.ETHERSCAN_URL;
		const etherscanApiKey = process.env.ETHERSCAN_KEY;
		const apiUrl = `${etherscanURL}?module=account&action=balance&address=${address}&apikey=${etherscanApiKey}`;

		try {
			const response = await fetch(apiUrl);
			const data = await response.json();

			if (data.status === "1") {
				const balanceWei = data.result;
				const balanceEth = balanceWei / 10 ** 18;
				return balanceEth;
			} else {
				throw new Error("Address is invalid. Please enter a valid address.");
			}
		} catch (error) {
			throw error;
		}
	};
}

module.exports = {
	EtherscanService,
};
