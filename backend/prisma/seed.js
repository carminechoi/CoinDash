const { PrismaClient, WalletCategoryEnum } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedWalletType() {
    const ethereumWalletType = await prisma.walletType.upsert({
        where: { name: "Ethereum" },
        update: {
            image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        },
        create: {
            name: "Ethereum",
            category: WalletCategoryEnum.CRYPTO,
            image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        },
    });

    const coinbaseWalletType = await prisma.walletType.upsert({
        where: { name: "Coinbase" },
        update: {
            image: "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875",
        },
        create: {
            name: "Coinbase",
            category: WalletCategoryEnum.EXCHANGE,
            image: "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875",
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
