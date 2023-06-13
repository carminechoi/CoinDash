const { PrismaClient, Prisma, WalletCategoryEnum } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = { prisma, Prisma, WalletCategoryEnum };
