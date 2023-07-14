const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cron = require("node-cron");

const app = express();
const routes = require("./src/routes/routes");
const { GeckoService } = require("./src/services/gecko.service");
const { EtherscanService } = require("./src/services/etherscan.service");

//             Cron setup
//             ┌────────────── second (optional)
//             │ ┌──────────── minute
//             │ │ ┌────────── hour
//             │ │ │ ┌──────── day of month
//             │ │ │ │ ┌────── month
//             │ │ │ │ │ ┌──── day of week
//             │ │ │ │ │ │
//             │ │ │ │ │ │
//             * * * * * *
cron.schedule("0 0 * * *", function () {
	GeckoService.fetchAllCoins();
});

// Enable CORS for specific origins only
let corsOptions = {
	origin: [
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:3002",
		"https://dogewisdom.com",
		"https://www.dogewisdom.com",
		"https://d32jey2ehxi8yg.cloudfront.net",
		"https://coindash.dev",
		"https://www.coindash.dev",
	],
	credentials: true,
};

// App Conficuration
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

module.exports = app;
