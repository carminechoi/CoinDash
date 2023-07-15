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
			if (Object.keys(state.wallet).length === 0) {
				state.wallet = state.wallets[0];
			}
		},
		setWalletWithId: (state, { payload: id }) => {
			state.wallet = state.wallets.find((wallet) => wallet.id === id);
		},
		deleteWallet: (state) => {
			state.wallet = {};
		},
	},
});

export default walletSlice.reducer;

export const { setWallets, setWalletWithId, deleteWallet } =
	walletSlice.actions;
