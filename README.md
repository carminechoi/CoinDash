# Better Koinly

A free crypto tax application that compiles tax forms from trades and transactions.

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
