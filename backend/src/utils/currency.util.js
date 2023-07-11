// Format floats to currency value
const abbreviations = [
	{ value: 1e12, symbol: "T" },
	{ value: 1e9, symbol: "B" },
	{ value: 1e6, symbol: "M" },
	{ value: 1e3, symbol: "K" },
	{ value: 1, symbol: "" },
];

const abbreviateCurrency = (value) => {
	const abbreviation = abbreviations.find((abbr) => {
		return value >= abbr.value;
	});

	const roundedValue = Math.round((value / abbreviation.value) * 10) / 10;
	const formattedValue = roundedValue.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: roundedValue >= 100 ? 0 : 1,
		maximumFractionDigits: roundedValue >= 100 ? 0 : 1,
	});

	return formattedValue + abbreviation.symbol;
};

const formatCurrency = (value, removeCents = false) => {
	if (removeCents) {
		return value.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});
	}
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

const formatPercentage = (value) => {
	return value != null ? value.toFixed(1) : undefined;
};

function convertWeiToEth(value) {
	const wei = BigInt(value);
	const eth = wei / BigInt(10 ** 18);
	return eth.toString();
}

function convertGasToGwei(gas) {
	const gwei = parseInt(gas) / 10 ** 9;
	return gwei.toFixed(2);
}

function convertTimeStampToDateString(timeStamp) {
	const date = new Date(timeStamp * 1000); // Convert timeStamp to milliseconds

	const options = {
		month: "long",
		day: "numeric",
		year: "numeric",
	};

	return date.toLocaleDateString("en-US", options);
}

module.exports = {
	abbreviateCurrency,
	formatCurrency,
	formatPercentage,
	convertWeiToEth,
	convertGasToGwei,
	convertTimeStampToDateString,
};
