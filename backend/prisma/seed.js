const { PrismaClient, WalletCategoryEnum } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedWalletType() {
	const ethereumWalletType = await prisma.walletType.upsert({
		where: { name: "Ethereum" },
		update: {
			image: "https://coin-tracker-public.s3-us-west-1.amazonaws.com/crypto-icons/cmc/64x64/1027.png",
		},
		create: {
			name: "Ethereum",
			category: WalletCategoryEnum.CRYPTO,
			image: "https://coin-tracker-public.s3-us-west-1.amazonaws.com/crypto-icons/cmc/64x64/1027.png",
		},
	});

	const coinbaseWalletType = await prisma.walletType.upsert({
		where: { name: "Coinbase" },
		update: {
			image: "https://coin-tracker-public.s3.us-west-1.amazonaws.com/crypto-icons/icons/coinbase.svg",
		},
		create: {
			name: "Coinbase",
			category: WalletCategoryEnum.EXCHANGE,
			image: "https://coin-tracker-public.s3.us-west-1.amazonaws.com/crypto-icons/icons/coinbase.svg",
		},
	});
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
