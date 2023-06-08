const EthereumWalletIsValid = async (walletAddress) => {
	const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&apikey=${process.env.ETHERSCAN_KEY}`;

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data);
		// Check if the API response indicates a valid wallet address
		if (data.status === "1") {
			return true;
		} else if (data.status === "0") {
			console.log("faaalse");
			return false;
		} else {
			// Handle other error cases
			throw new Error(data.message);
		}
	} catch (error) {
		// Handle fetch or API errors
		console.error("Error checking wallet address:", error);
		return false;
	}
};

module.exports = { EthereumWalletIsValid };
