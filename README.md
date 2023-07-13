# CoinDash

Welcome to CoinDash, your one-stop-shop for viewing your crypto finances. With CoinDash, you can sync your private and exchange wallets to get a clear overview of your overall performance. Our intuitive dashboard makes it easy to view your portfolio assets, view the latest crypto news, and monitor market trends. Whether you're a seasoned crypto trader or a beginner, CoinDash gives you the tools you need to stay informed and make informed investment decisions. 


## Prerequisites

Install Docker

## Setup Dev Environment

Run Docker to initialize local postgre database

```bash
docker-compose up -d
```

Install dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```

## Usage

To start React app

```bash
cd frontend
npm start
```

To start Express server

```bash
cd ../backend
npm start
```

Prisma migrations

```bash
npx prisma migrate dev --name "init" --preview-feature
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
