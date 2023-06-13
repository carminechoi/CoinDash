import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	wallets: [],
};

const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		setWallets: (state, { payload }) => {
			state.wallets = payload;
		},
	},
});

export default walletSlice.reducer;

export const { setWallets } = walletSlice.actions;
