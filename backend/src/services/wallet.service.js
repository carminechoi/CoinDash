const { prisma } = require("../../prisma/prisma.client");

const getWalletTypes = async () => {
    const walletTypes = await prisma.walletType.findMany();
    return walletTypes;
};

module.exports = { getWalletTypes };
