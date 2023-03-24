const { prisma } = require("../../prisma/prisma.client");

const fetchTransactions = async (address) => {
    try {
        const response = await fetch(
            `${process.env.ETHERSCAN_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&apikey=${process.env.ETHERSCAN_KEY}`
        );

        const transactions = await response.json();

        transactions.map(async (transaction) => {
            console.log(transaction);
        });
    } catch (error) {}
};

module.exports = {
    fetchTransactions,
};
