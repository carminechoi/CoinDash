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
            console.log("done");
        } catch (error) {
            console.log(`error: ${error}`);
        }
    };
}

module.exports = {
    EtherscanService,
};
