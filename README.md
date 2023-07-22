# CoinDash - Crypto Dashboard

CoinDash is a crypto dashboard that provides users with a centralized platform to manage and track their cryptocurrency assets. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Dashboard](#dashboard)
- [Wallets](#wallets)
- [Cryptocurrency Information](#cryptocurrency-information)
- [Contributing](#contributing)
- [License](#license)

## Introduction

It's essential for investors and enthusiasts to have a reliable platform to manage their crypto assets and stay informed about market trends. CoinDash offers a comprehensive solution, allowing users to connect their crypto wallets, track transactions, view total assets, access the latest crypto news, and explore valuable insights on the top 100 cryptocurrencies by market cap.

## Features

- User authentication and registration system.
- Crypto wallet management and transaction history compilation.
- Aggregated cryptocurrency information for the top 100 coins.
- Latest crypto news updates.
- User-friendly and responsive design.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/carminechoi/CoinDash.git
```

2. Set up the backend and install the required dependencies:

```bash
cd CoinDash/backend
npm install
npm start
```

3. Run the backend server:

```bash
npm start
```

4. Run Docker to initialize local postgre database

```bash
docker-compose up -d
```

5. Set up the frontend and install the required dependencies:

```bash
cd ../frontend
npm install
```

6. Update the API endpoint in the frontend code to point to your local backend.

7. Run the frontend server:

```bash
npm start
```

Now you should be able to access the CoinDash application locally in your web browser.

## Usage

### Dashboard

Upon accessing the CoinDash application, users are presented with a landing page where they can log in or register. Once logged in, users are redirected to the dashboard, where they can view their total assets, the top 4 cryptocurrencies by market cap, and the latest crypto news.

### Wallets

In the wallets section, users can manage their crypto wallets by adding or removing them. The server compiles transaction history and wallet values to provide users with an accurate representation of their holdings.

### Prices

The price page offers valuable insights into the top 100 cryptocurrencies by market cap. Users can access essential data such as market cap, value, volume, percentage change, and more.

## License

The CoinDash project is open-source and is licensed under the [MIT License](LICENSE).

---

If you have any questions or encounter issues, don't hesitate to open an issue on the GitHub repository. Happy crypto tracking! 🚀
