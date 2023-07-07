import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	wallets: [],
	transactions: [],
};

const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		setWallets: (state, { payload }) => {
			state.wallets = payload;
		},
		setTransactions: (state, { payload }) => {
			state.Transactions = payload;
		},
	},
});

export default walletSlice.reducer;

export const { setWallets, setTransactions } = walletSlice.actions;
