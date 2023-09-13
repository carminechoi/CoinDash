const fetchCryptoNews = async () => {
	const newsDataURL = process.env.NEWSDATA_URL;
	const newsDataApiKey = process.env.NEWSDATA_KEY;
	const apiUrl = `${newsDataURL}?apikey=${newsDataApiKey}&q=crypto&language=en&domain=bitcoinsistemi`;

	try {
		const response = await fetch(apiUrl);
		const responseJson = await response.json();

		if (responseJson.status === "success") {
			return responseJson.results.slice(0, 9);
		} else {
			throw responseJson.message;
		}
	} catch (error) {
		throw error;
	}
};

module.exports = {
	fetchCryptoNews,
};
