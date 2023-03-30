const { PrismaClient, WalletCategoryEnum } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedWalletType() {
    const ethereumWalletType = await prisma.walletType.upsert({
        where: { name: "Ethereum" },
        update: {},
        create: {
            name: "Ethereum",
            category: WalletCategoryEnum.CRYPTO,
        },
    });

    const coinbaseWalletType = await prisma.walletType.upsert({
        where: { name: "Coinbase" },
        update: {},
        create: {
            name: "Coinbase",
            category: WalletCategoryEnum.EXCHANGE,
        },
    });

    console.log({ ethereumWalletType, coinbaseWalletType });
}

async function main() {
    await seedWalletType();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    });
