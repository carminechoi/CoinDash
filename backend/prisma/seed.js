const { PrismaClient, WalletCategoryEnum } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const ethereum = await prisma.walletType.upsert({
        where: { name: "Ethereum" },
        update: {},
        create: {
            name: "Ethereum",
            category: WalletCategoryEnum.CRYPTO,
        },
    });

    const coinbase = await prisma.walletType.upsert({
        where: { name: "Coinbase" },
        update: {},
        create: {
            name: "Coinbase",
            category: WalletCategoryEnum.EXCHANGE,
        },
    });

    console.log({ ethereum, coinbase });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
