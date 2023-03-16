// Format floats to currency value
const formatCurrency = (value) => {
    if (value >= 1000000000000) {
        // Trillion T
        return "$" + (value / 1000000000000).toFixed(1) + "T";
    } else if (value >= 1000000000) {
        // Billion B
        return "$" + (value / 1000000000).toFixed(1) + "B";
    } else if (value >= 1000000) {
        // Million M
        return "$" + (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
        // Thousand K
        return "$" + (value / 1000).toFixed(1) + "K";
    } else {
        return "$" + value.toFixed(1);
    }
};

module.exports = { formatCurrency };
