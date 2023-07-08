import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	wallets: [],
	wallet: {},
};

const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		setWallets: (state, { payload }) => {
			state.wallets = payload;
		},
		setWalletWithId: (state, { payload: id }) => {
			state.wallet = state.wallets.find((wallet) => wallet.id === id);
		},
	},
});

export default walletSlice.reducer;

export const { setWallets, setWalletWithId } = walletSlice.actions;
