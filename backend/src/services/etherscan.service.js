const { prisma } = require("../../prisma/prisma.client");

class EtherscanService {
	static fetchTransactions = async (address) => {
		try {
			const response = await fetch(
				`${process.env.ETHERSCAN_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&apikey=${process.env.ETHERSCAN_KEY}`
			);

			const transactions = await response.json();
			if (transactions.status == "1") {
				transactions.result.map(async (transaction) => {
					await prisma.upsert({
						where: {
							hash: transaction.hash,
						},
						update: {},
						create: {
							hash: transaction.hash,
							value: transaction.value,
							gas: transaction.gas,
							gasPrice: transaction.gasPrice,
							to: transaction.to,
							from: transaction.from,
							wallet: { connect: { id: walletId } },
							user: { connect: { id: userId } },
						},
					});
				});
			} else {
				next();
			}
		} catch (error) {
			console.error(`error: ${error}`);
		}
	};

	static addressIsValid = async (walletAddress) => {
		const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&apikey=${process.env.ETHERSCAN_KEY}`;

		try {
			const response = await fetch(apiUrl);
			const data = await response.json();

			// Check if the API response indicates a valid wallet address
			if (data.status === "1") {
				return true;
			} else if (data.status === "0") {
				return false;
			} else {
				// Handle other error cases
				throw new Error(data.message);
			}
		} catch (error) {
			// Handle fetch or API errors
			console.error(`error: ${error}`);
			return false;
		}
	};
}

module.exports = {
	EtherscanService,
};
